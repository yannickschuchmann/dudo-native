import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, StatusBar, ImageBackground } from 'react-native'
import { Container } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'

import AuthService from '../services/auth'
import { cacheImages } from '../helpers/caching'
import { withUser } from '../components/userProvider'

import PersonalBattleButtons from '../components/PlayerProfile/PersonalBattleButtons'
import FriendlyProfile from '../components/PlayerProfile/FriendlyProfile'
import BattleProfile from '../components/PlayerProfile/BattleProfile'
import SettingsProfile from '../components/PlayerProfile/SettingsProfile'
import ProfileBottomBar from '../components/PlayerProfile/ProfileBottomBar'

import api from '../services/api'

class NewPlayerProfile extends Component {
  state = {
    isLoading: true,
    isFriendProfile: true,
    isSettings: false,
    statistics: {
      table: {}
    }
  }

  componentDidMount () {
    this.fetchInformation()
  }

  fetchInformation = async () => {
    await this.prefetchImage()
    const res = await this.fetchStats()
    this.setState({
      isLoading: false,
      statistics: res.data
    })
  }

  prefetchImage = () => cacheImages([this.props.user.pic])
  fetchStats = () => api.get(`/api/statistics`)

  profileLogout = async () => {
    await AuthService.logout()
    this.props.navigation.push('Login')
  }

  onFriendPress = () => {
    this.setState({ isFriendProfile: true, isSettings: false })
  }

  onBattlePress = () => {
    this.setState({ isFriendProfile: false, isSettings: false })
  }

  onSettingsPress = () => {
    this.setState({ isFriendProfile: false, isSettings: true })
  }

  render () {
    const { name, pic } = this.props.user
    const backgroundImage = '../assets/screen-background.png'
    return (
      <ImageBackground
        source={require(backgroundImage)}
        style={styles.root}
      >
        <Container style={styles.container}>
          <StatusBar hidden />
          <Grid>
            <Row size={15}>
              <PersonalBattleButtons
                isFriendProfile={this.state.isFriendProfile}
                isSettings={this.state.isSettings}
                onFriendPress={this.onFriendPress}
                onBattlePress={this.onBattlePress}
                onSettingsPress={this.onSettingsPress}
              />
            </Row>
            <Row size={70}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  size='small'
                  color='#c8b273'
                  style={styles.activityMonitor}
                />
              ) : this.state.isFriendProfile && !this.state.isSettings ? (
                <FriendlyProfile
                  name={name}
                  pic={pic}
                  statistics={this.state.statistics.table}
                />
              ) : !this.state.isFriendProfile && !this.state.isSettings ? (
                <BattleProfile />
              ) : !this.state.isFriendProfile && this.state.isSettings ? (
                <SettingsProfile />
              ) : null}
            </Row>
            <Row size={15}>
              <ProfileBottomBar
                profileLogout={this.profileLogout}
                navigation={this.props.navigation}
              />
            </Row>
          </Grid>
        </Container>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  activityMonitor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withUser(NewPlayerProfile)
