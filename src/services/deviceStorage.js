import {AsyncStorage} from 'react-native'

export default {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  },
  async getItem(key) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key))
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  },
  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  }
}
