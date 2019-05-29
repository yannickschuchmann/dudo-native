import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import AuthService from '../services/auth'
import {cacheImages} from '../helpers/caching'
import {withUser} from '../components/userProvider'

import PersonalBattleButtons from '../components/PlayerProfile/PersonalBattleButtons'
import FriendlyProfile from '../components/PlayerProfile/friendlyProfile'
import BattleProfile from '../components/PlayerProfile/battleProfile'
import LanguageSelector from '../components/PlayerProfile/LanguageSelector'
import ProfileBottomBar from '../components/PlayerProfile/ProfileBottomBar'

class NewPlayerProfile extends Component {
  state = {
    isLoading: true,
    isFriendProfile: true,
    friendlyStats: {
      matchesWon: 55,
      totalMatches: 167,
      kills: 14,
      rightDudo: 16,
      wrongDudo: 67,
      diceRegain: 5,
      totalRegain: 20
    }
  }

  componentDidMount() {
    this.prefetchImage()
  }

  prefetchImage = async () => {
    await cacheImages([this.props.user.pic])

    this.setState({isLoading: false})
  }

  profileLogout = async () => {
    await AuthService.logout()
    this.props.navigation.push('Login')
  }

  onFriendPress = () => {
    this.setState({isFriendProfile: true})
  }

  onBattlePress = () => {
    this.setState({isFriendProfile: false})
  }

  render() {
    const {name, pic} = this.props.user
    return (
      <Container style={{backgroundColor: 'black'}}>
        <StatusBar hidden />
        <Grid>
          <Row size={15}>
            <PersonalBattleButtons
              isFriendProfile={this.state.isFriendProfile}
              onFriendPress={this.onFriendPress}
              onBattlePress={this.onBattlePress}
            />
          </Row>
          <Row size={60}>
            {this.state.isLoading ? (
              <ActivityIndicator
                size="small"
                color="#c8b273"
                style={styles.activityMonitor}
              />
            ) : this.state.isFriendProfile ? (
              <FriendlyProfile
                name={name}
                pic={pic}
                friendlyStats={this.state.friendlyStats}
              />
            ) : (
              <BattleProfile />
            )}
          </Row>
          <Row size={10}>
            <LanguageSelector />
          </Row>
          <Row size={15}>
            <ProfileBottomBar
              profileLogout={this.profileLogout}
              navigation={this.props.navigation}
            />
          </Row>
        </Grid>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  activityMonitor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withUser(NewPlayerProfile)
