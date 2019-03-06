import {Alert, Constants} from 'expo'
import deviceStorage from './deviceStorage'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import api from './api'
const config = require('../../app.json')

const singleton = Symbol()
const singletonEnforcer = Symbol()

class AuthService {
  subscriptions = []

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new AuthService(singletonEnforcer)
    }

    return this[singleton]
  }

  subscribe(callback) {
    if (!callback) {
      throw new Error('No callback provided')
    }

    this.subscriptions.push(callback)
  }

  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires
      } = await Expo.Facebook.logInWithReadPermissionsAsync(
        config.expo.facebookAppId,
        {
          permissions: ['public_profile', 'email', 'user_friends']
        }
      )

      if (type === 'success') {
        await deviceStorage.saveItem('fb_access_token', token)
        await deviceStorage.saveItem('fb_expires_at', expires)
      }

      return {type, token, expires}
    } catch (e) {
      console.log('Login Error', e)
    }
  }

  logout = async () => {
    await deviceStorage.deleteItem('fb_expires_at')
    await deviceStorage.deleteItem('fb_token')
    await deviceStorage.deleteItem('jwt')
  }

  checkFacebook = async () => {
    const expiresAt = await deviceStorage.getItem('fb_expires_at')
    const token = await deviceStorage.getItem('fb_access_token')

    const expiresAtDate = new Date(expiresAt * 1000)
    const nowInOneHour = new Date(new Date().getTime() + 1000 * 60 * 60)
    return {
      token,
      isValid: expiresAt && token && expiresAtDate > nowInOneHour
    }
  }

  authenticate = async token => {
    const res = await axios.post('/api/auth', {
      auth: {
        access_token: token
      }
    })
    const {jwt} = res.data
    deviceStorage.saveItem('jwt', jwt)
    const data = jwt_decode(jwt)
    api.setJWT(jwt)

    this.subscriptions.forEach(callback => {
      callback(data)
    })
    return data
  }
}

export default AuthService.instance
