import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Button} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'

import DiceAmountPicker from './DiceAmountPicker'
import DiceTypePicker from './DiceTypePicker'

import {scaleFontSize} from '../../../helpers/responsive'

export class PlayPicker extends Component {
  render() {
    const {t, i18n} = this.props
    return (
      <Col style={styles.rootContainer}>
        <Row>
          <DiceAmountPicker />
        </Row>
        <Row>
          <DiceTypePicker />
        </Row>
        <Row>
          <Button block primary style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {t('common:playButtons.playButtonText')}
            </Text>
          </Button>
        </Row>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(PlayPicker)

const styles = StyleSheet.create({
  rootContainer: {
    padding: '3%'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '1%',
    height: '80%'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})
