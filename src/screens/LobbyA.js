import React, {Component} from 'react'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {Container} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'
import VibrateButton from '../components/vibrateButton'
import {scaleFontSize} from '../helpers/responsive'

import {withNamespaces} from 'react-i18next'

import BattleButtons from '../components/Lobby/BattleButtons'
import InBattleLobby from '../components/Lobby/InBattleLobby'
import BottomProfileStats from '../components/Lobby/BottomProfileStats'

class Lobby extends Component {
  state = {
    inBattle: false,
    diceLeft: 3,
    playedBattles: '15',
    percWin: '55%',
    until: 5
  }

  onCountDownFinish = () => {
    this.setState({diceLeft: this.state.diceLeft - 1, until: this.state.until})
  }

  render() {
    const {navigation, t, i18n} = this.props
    return (
      <Container style={{backgroundColor: 'black'}}>
        <StatusBar hidden />
        <Grid>
          <Row size={30}>
            <Col style={styles.columnStyle}>
              <Text style={styles.freeText}>
                {t('common:lobby.welcomeText')}
              </Text>
              <VibrateButton
                style={styles.buttonAlignment}
                onPress={() => this.props.navigation.push('Home')}
              >
                <Text style={styles.buttonText}>
                  {t('common:lobby.goToTables')}
                </Text>
              </VibrateButton>
            </Col>
          </Row>
          <Row size={55}>
            {this.state.inBattle ? (
              <InBattleLobby
                navigation={navigation}
                diceLeft={this.state.diceLeft}
                onCountDownFinish={this.onCountDownFinish}
                until={this.state.until}
              />
            ) : (
              <BattleButtons navigation={navigation} />
            )}
          </Row>
          <Row size={15} style={styles.profileRowStyle}>
            <BottomProfileStats
              playedBattles={this.state.playedBattles}
              percWin={this.state.percWin}
              navigation={navigation}
            />
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(Lobby)

const styles = StyleSheet.create({
  columnStyle: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#c8b273',
    height: scaleFontSize(70),
    width: scaleFontSize(200),
    borderWidth: 5,
    borderColor: '#95792A'
  },
  freeText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    fontSize: scaleFontSize(30)
  },
  buttonText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'black',
    fontSize: scaleFontSize(30)
  },
  profileRowStyle: {
    borderTopColor: '#95792A',
    borderWidth: 5
  },
  profileButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: scaleFontSize(150)
  },
  icon: {
    fontSize: scaleFontSize(100),
    color: '#c8b273'
  }
})
