import { Constants, Permissions, Notifications } from 'expo'
import { Platform } from 'react-native'
import i18n from '../i18n/i18n'

import api from '../services/api'

export async function registerPushNotifications () {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return
  }

  const token = await Notifications.getExpoPushTokenAsync()

  return api.post('/api/devices', {
    device: {
      expo_token: token,
      device_id: Constants.deviceId,
      device_name: Constants.deviceName,
      platform: Platform.OS,
      language: i18n.language
    }
  })
}
