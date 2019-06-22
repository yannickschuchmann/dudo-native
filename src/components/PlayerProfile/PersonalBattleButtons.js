import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'
import { Icon } from 'native-base'

import VibrateButton from '../vibrateButton'
import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

class PersonalBattleButtons extends Component {
  render () {
    const { t } = this.props
    return (
      <Row style={styles.profileButtonRow}>
        <Col size={35}>
          <VibrateButton
            style={[
              styles.profileButtons,
              this.props.isFriendProfile &&
                !this.props.isSettings &&
                styles.selectedButton
            ]}
            onPress={this.props.onFriendPress}
          >
            <Text style={styles.buttonText}>
              {t('common:profile.personalTab')}
            </Text>
          </VibrateButton>
        </Col>
        <Col size={35}>
          <VibrateButton
            style={[
              styles.profileButtons,
              !this.props.isFriendProfile &&
                !this.props.isSettings &&
                styles.selectedButton
            ]}
            onPress={this.props.onBattlePress}
          >
            <Text style={styles.buttonText}>
              {t('common:profile.battleTab')}
            </Text>
          </VibrateButton>
        </Col>
        <Col size={30}>
          <VibrateButton
            style={[
              styles.settingsButton,
              !this.props.isFriendProfile &&
                this.props.isSettings &&
                styles.settingsButtonSelected
            ]}
            onPress={this.props.onSettingsPress}
          >
            <Icon
              style={styles.settingsIcon}
              name='settings'
              type='MaterialCommunityIcons'
            />
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
    width: scaleFontSize(120),
    height: scaleFontSize(60),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#F58B27'
  },
  selectedButton: {
    width: scaleFontSize(120),
    height: scaleFontSize(60),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#F58B27',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'black',
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular'
  },
  settingsButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#F58B27',
    height: scaleFontSize(60),
    width: scaleFontSize(80)
  },
  settingsButtonSelected: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#F58B27',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    height: scaleFontSize(60),
    width: scaleFontSize(80),
    color: 'black'
  },
  settingsIcon: {
    color: 'black',
    fontSize: scaleFontSize(27)
  }
})

export default withNamespaces(['common'], { wait: true })(PersonalBattleButtons)
