import React, {Component} from 'react'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {CheckBox} from 'react-native-elements'
import {Container} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'
import VibrateButton from '../components/vibrateButton'
import {scaleFontSize} from '../helpers/responsive'

import {withNamespaces} from 'react-i18next'

import BattleButtons from '../components/Lobby/BattleButtons'
import InBattleLobby from '../components/Lobby/InBattleLobby'

class Lobby extends Component {
  state = {
    inBattle: false
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
          <Row size={70}>
            {this.state.inBattle ? (
              <BattleButtons navigation={navigation} />
            ) : (
              <InBattleLobby navigation={navigation} />
            )}
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
  }
})
