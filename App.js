import './src/reactotronConfig'
import React from 'react'
import {Platform, YellowBox} from 'react-native'
import {Font, Notifications} from 'expo'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'
import Sentry from 'sentry-expo'
import {InAppNotificationProvider} from './lib/react-native-in-app-notification'
import 'es6-symbol/implement'
import {cacheImages} from './src/helpers/caching'

import axios from 'axios'
axios.defaults.baseURL = 'https://dudo-backend.furfm.de'

import UserProvider from './src/components/userProvider'

import {withNamespaces} from 'react-i18next'
import i18n from './src/i18n/i18n'

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import PlayerProfile from './src/screens/PlayerProfile'
import CreateTable from './src/screens/CreateTable'
import GameTable from './src/screens/GameTable'
import AddToTable from './src/screens/AddToTable'
import AppStateProvider from './src/components/appStateProvider'

Sentry.config(
  'https://13d5174d9ee5459fa21e720fc53ff6ad@sentry.io/1312521'
).install()

const StackNavigation = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    GameTable: {
      screen: GameTable
    },
    Home: {
      screen: Home
    },
    CreateTable: {
      screen: CreateTable
    },
    AddToTable: {
      screen: AddToTable
    },
    PlayerProfile: {
      screen: PlayerProfile
    }
  },
  {
    headerMode: 'none'
  }
)

const WrappedStack = ({t}) => <StackNavigation screenProps={{t}} />
const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack)

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('table-updates', {
        name: 'Table updates',
        sound: true
      })
    }

    await cacheImages([require('./src/assets/dudoLogo.png')])
    await Font.loadAsync({
      'MyriadPro-BoldCond': require('./src/assets/fonts/Myriad-Pro-Bold-Condensed.ttf'),
      'RobotoCondensed-Light': require('./src/assets/fonts/RobotoCondensed-Light.ttf'),
      'RobotoCondensed-Regular': require('./src/assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-BoldItalic': require('./src/assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'RobotoCondensed-Italic': require('./src/assets/fonts/RobotoCondensed-Italic.ttf'),
      'RobotoCondensed-Bold': require('./src/assets/fonts/RobotoCondensed-Bold.ttf'),
      'Roboto-ThinItalic': require('./src/assets/fonts/Roboto-ThinItalic.ttf'),
      'Roboto-BlackItalic': require('./src/assets/fonts/Roboto-BlackItalic.ttf'),
      'Roboto-LightItalic': require('./src/assets/fonts/Roboto-LightItalic.ttf'),
      'Roboto-BoldItalic': require('./src/assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
      'Roboto-Italic': require('./src/assets/fonts/Roboto-Italic.ttf'),
      'Roboto-Thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
      'Roboto-MediumItalic': require('./src/assets/fonts/Roboto-MediumItalic.ttf'),
      'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
      'RobotoCondensed-LightItalic': require('./src/assets/fonts/RobotoCondensed-LightItalic.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({fontLoaded: true})
  }
  render() {
    return (
      <InAppNotificationProvider>
        <UserProvider>
          {this.state.fontLoaded ? (
            <AppStateProvider>
              <ReloadAppOnLanguageChange />
            </AppStateProvider>
          ) : (
            <Expo.AppLoading />
          )}
        </UserProvider>
      </InAppNotificationProvider>
    )
  }
}
