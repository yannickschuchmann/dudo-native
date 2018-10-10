import './src/reactotronConfig'
import React from 'react'
import {YellowBox} from 'react-native'
import {Font} from 'expo'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'
import 'es6-symbol/implement'
import axios from 'axios'
axios.defaults.baseURL = 'https://dudo-backend.furfm.de'

import UserProvider from './src/components/user_provider'

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import PlayerProfile from './src/screens/PlayerProfile'
import CreateTable from './src/screens/CreateTable'
import GameTable from './src/screens/GameTable'
import AddToTable from './src/screens/AddToTable'
import GameEnd from './src/screens/GameEnd'

const DrawerNavigation = createDrawerNavigator({
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
})

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },

    AddToTable: {
      screen: AddToTable
    },
    CreateTable: {
      screen: CreateTable
    },
    GameTable: {
      screen: GameTable
    },
    Home: {
      screen: Home
    },
    Login: {
      screen: Login
    },
    PlayerProfile: {
      screen: PlayerProfile
    }
  },
  {
    headerMode: 'none'
  }
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
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
      <UserProvider>
        {this.state.fontLoaded ? <StackNavigation /> : <Expo.AppLoading />}
      </UserProvider>
    )
  }
}
