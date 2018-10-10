import React, {Component} from 'react'
import {Constants} from 'expo'
import {Text, StyleSheet, Image, StatusBar, Dimensions} from 'react-native'
import {Container, Button, Footer} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'

export default class LanguageSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lang_spanish: 'Español',
      lang_german: 'Deutsch',
      lang_english: 'English',
      logout_button: 'Salir'
    }
  }
  render() {
    return (
      <Row style={styles.centerButtons}>
        <Col>
          <Button
            primary
            style={styles.LangButtonSpanish}
            onPress={() => {
              this.props.navigation.push('Home')
            }}
          >
            <Text style={styles.languageButtonText}>
              {this.state.lang_spanish}
            </Text>
          </Button>
        </Col>
        <Col>
          <Button
            primary
            style={styles.LangButtonGerman}
            onPress={() => {
              this.props.navigation.push('Home')
            }}
          >
            <Text style={styles.languageButtonText}>
              {this.state.lang_german}
            </Text>
          </Button>
        </Col>
        <Col>
          <Button
            primary
            style={styles.LangButtonEnglish}
            onPress={() => {
              this.props.navigation.push('Home')
            }}
          >
            <Text style={styles.languageButtonText}>
              {this.state.lang_english}
            </Text>
          </Button>
        </Col>
      </Row>
    )
  }
}
SCREEN_WIDTH = Dimensions.get('window').width // get current width
SCALE = 375 // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH)
  return newSize
}
const styles = StyleSheet.create({
  LangButtonSpanish: {
    backgroundColor: 'blue',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  LangButtonGerman: {
    backgroundColor: 'green',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  LangButtonEnglish: {
    backgroundColor: 'purple',
    width: '85%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  languageButtonText: {
    color: 'white',
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond'
  },
  centerButtons: {
    paddingLeft: '5%'
  }
})
