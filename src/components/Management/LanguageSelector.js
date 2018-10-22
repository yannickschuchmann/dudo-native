import React, {Component} from 'react'
import {Constants} from 'expo'
import {
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Button,
  View,
  TouchableOpacity
} from 'react-native'
import {Grid, Row, Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'
import deviceStorage from '../../services/deviceStorage'

export class LanguageSelector extends Component {
  onPress = lng => () => {
    this.props.i18n.changeLanguage(lng)
    deviceStorage.saveItem('lng', lng)
  }

  render() {
    const {t} = this.props

    return (
      <Row style={styles.centerButtons}>
        <Col>
          <TouchableOpacity
            style={styles.LangButtonSpanish}
            onPress={this.onPress('es')}
          >
            <Text style={styles.languageButtonText}>
              {t('common:actions.toggleToSpanish')}
            </Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            style={styles.LangButtonGerman}
            onPress={this.onPress('de')}
          >
            <Text style={styles.languageButtonText}>
              {t('common:actions.toggleToGerman')}
            </Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            style={styles.LangButtonEnglish}
            onPress={this.onPress('en')}
          >
            <Text style={styles.languageButtonText}>
              {t('common:actions.toggleToEnglish')}
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(LanguageSelector)

const styles = StyleSheet.create({
  LangButtonSpanish: {
    height: scaleFontSize(50),
    backgroundColor: 'blue',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  LangButtonGerman: {
    height: scaleFontSize(50),
    backgroundColor: 'green',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  LangButtonEnglish: {
    height: scaleFontSize(50),
    backgroundColor: 'purple',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  languageButtonText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    textAlign: 'center'
  },
  centerButtons: {
    paddingLeft: '5%'
  }
})
