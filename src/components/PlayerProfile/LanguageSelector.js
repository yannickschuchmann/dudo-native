import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'

import VibrateButton from '../vibrateButton'
import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'
import deviceStorage from '../../services/deviceStorage'

export class LanguageSelector extends Component {
  onPress = lng => () => {
    this.props.i18n.changeLanguage(lng)
    deviceStorage.saveItem('lng', lng)
  }

  render () {
    const { t } = this.props
    return (
      <Row style={styles.centerButtons}>
        <Col>
          <VibrateButton
            success
            style={styles.langButton}
            onPress={this.onPress('es')}
          >
            <Text style={styles.langText}>
              {t('common:actions.toggleToSpanish')}
            </Text>
          </VibrateButton>
        </Col>
        <Col>
          <VibrateButton
            warning
            style={styles.langButton}
            onPress={this.onPress('de')}
          >
            <Text style={styles.langText}>
              {t('common:actions.toggleToGerman')}
            </Text>
          </VibrateButton>
        </Col>
        <Col>
          <VibrateButton
            danger
            style={styles.langButton}
            onPress={this.onPress('en')}
          >
            <Text style={styles.langText}>
              {t('common:actions.toggleToEnglish')}
            </Text>
          </VibrateButton>
        </Col>
      </Row>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(LanguageSelector)

const styles = StyleSheet.create({
  centerButtons: {
    alignItems: 'center'
  },
  langButton: {
    width: scaleFontSize(100),
    height: scaleFontSize(50),
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5
  },
  langText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond'
  }
})
