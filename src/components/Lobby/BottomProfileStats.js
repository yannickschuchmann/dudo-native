import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Col, Row} from 'react-native-easy-grid'
import VibrateButton from '../vibrateButton'
import {Icon} from 'native-base'
import {scaleFontSize} from '../../helpers/responsive'

import {withNamespaces} from 'react-i18next'

class BottomProfileStats extends Component {
  render() {
    const {t, i18n, playedBattles, percWin} = this.props
    return (
      <Row>
        <VibrateButton
          style={styles.profileButton}
          transparent
          onPress={() => {
            this.props.navigation.push('PlayerProfile')
          }}
        >
          <Icon style={styles.icon} name="user" type="EvilIcons" />
        </VibrateButton>
        <Col style={styles.columnStyle}>
          <Text style={styles.freeText}>
            {t('common:lobby.battlesPlayed')}
            {playedBattles}
          </Text>
          <Text style={styles.freeText}>
            {t('common:lobby.winRatio')}
            {percWin}
          </Text>
        </Col>
      </Row>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(BottomProfileStats)

const styles = StyleSheet.create({
  columnStyle: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  freeText: {
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    fontSize: scaleFontSize(25)
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
