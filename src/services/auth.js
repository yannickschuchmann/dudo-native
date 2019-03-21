import deviceStorage from './deviceStorage'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import api from './api'
import {compose, equals, find, prop, propEq} from 'ramda';
import Sentry from 'sentry-expo';
const config = require('../../app.json')

const singleton = Symbol()
const singletonEnforcer = Symbol()

const PERMISSIONS = ['public_profile', 'email', 'user_friends']

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
          permissions: PERMISSIONS
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

  checkFacebookPermissions = async (token) => {
    const isPermissionGranted = (permission, data) => compose(
      equals('granted'),
      prop('status'),
      find(propEq('permission', permission))
    )(data)

    try {
      const response = await axios.get(`https://graph.facebook.com/me/permissions`, {
        params: {
          access_token: token
        }
      })
      const {data} = response.data

      if (response.status == 200 && data) {
        const allPermissionsGranted = PERMISSIONS.reduce((allGranted, permission) => {
          return allGranted && isPermissionGranted(permission, data)
        }, true)

        return allPermissionsGranted
      } else {
        return false
      }
    } catch(e) {
      Sentry.captureException(e)
      return false
    }
  }

  checkFacebook = async () => {
    const expiresAt = await deviceStorage.getItem('fb_expires_at')
    const token = await deviceStorage.getItem('fb_access_token')

    const expiresAtDate = new Date(expiresAt * 1000)
    const nowInOneHour = new Date(new Date().getTime() + 1000 * 60 * 60)
    
    const isValid = 
      expiresAt && 
      token && 
      expiresAtDate > nowInOneHour && 
      this.checkFacebookPermissions(token)

    return {
      token,
      isValid
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
