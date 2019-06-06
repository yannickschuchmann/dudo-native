import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'
import VibrateButton from '../vibrateButton'
import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

class PersonalBattleButtons extends Component {
  render () {
    const { t } = this.props
    return (
      <Row style={styles.profileButtonRow}>
        <Col>
          <VibrateButton
            style={[
              styles.profileButtons,
              this.props.isFriendProfile && styles.selectedButton
            ]}
            onPress={() => this.props.onFriendPress()}
          >
            <Text style={styles.buttonText}>
              {t('common:profile.personalTab')}
            </Text>
          </VibrateButton>
        </Col>
        <Col>
          <VibrateButton
            style={[
              styles.profileButtons,
              !this.props.isFriendProfile && styles.selectedButton
            ]}
            onPress={() => this.props.onBattlePress()}
          >
            <Text style={styles.buttonText}>
              {t('common:profile.battleTab')}
            </Text>
          </VibrateButton>
        </Col>
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  profileButtonRow: {
    alignItems: 'center'
  },
  profileButtons: {
    marginTop: '10%',
    width: scaleFontSize(150),
    height: scaleFontSize(60),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#c8b273',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#95792A'
  },
  selectedButton: {
    marginTop: '10%',
    width: scaleFontSize(150),
    height: scaleFontSize(60),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#95792A',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'black',
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond'
  }
})

export default withNamespaces(['common'], { wait: true })(PersonalBattleButtons)
