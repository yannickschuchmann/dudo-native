import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'

import VibrateButton from '../vibrateButton'
import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

class ProfileBottomBar extends Component {
  render () {
    const { t } = this.props
    return (
      <Row style={styles.centerButtons}>
        <Col size={40}>
          <VibrateButton
            transparent
            style={styles.goBackButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>
              {t('common:gameText:goBackTables')}
            </Text>
          </VibrateButton>
        </Col>
        <Col size={60}>
          <VibrateButton transparent style={styles.logoutButton}>
            <Text
              onPress={this.props.profileLogout}
              style={styles.buttonText}
            >
              {t('common:logoutText')}
            </Text>
          </VibrateButton>
        </Col>
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  centerButtons: {
    alignItems: 'center'
  },
  goBackButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F58B27',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2,
    width: scaleFontSize(100),
    height: scaleFontSize(60)
  },
  logoutButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F58B27',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2,
    width: scaleFontSize(150),
    height: scaleFontSize(60)
  },
  buttonText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    color: 'black'
  }
})

export default withNamespaces(['common'], { wait: true })(ProfileBottomBar)
