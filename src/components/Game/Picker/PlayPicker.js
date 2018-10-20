import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Button} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'

import DiceAmountPicker from './DiceAmountPicker'
import DiceTypePicker from './DiceTypePicker'

import {scaleFontSize} from '../../../helpers/responsive'

export class PlayPicker extends Component {
  state = {
    die: this.props.lastMove.die || 1,
    eyes: this.props.lastMove.eyes || 2
  }

  render() {
    const {game, lastMove, t, i18n} = this.props
    const {die, eyes} = this.state
    return (
      <Col style={styles.rootContainer}>
        <Row>
          <DiceAmountPicker
            die={die}
            onChange={die => this.setState({die})}
            totalDie={game.total_die}
          />
        </Row>
        <Row>
          <DiceTypePicker
            eyes={eyes}
            lastMove={lastMove}
            onChange={eyes => this.setState({eyes})}
          />
        </Row>
        <Row>
          <Button
            block
            primary
            style={styles.buttonContainer}
            onPress={() => this.props.onMove({type: 'raise', die, eyes})}
          >
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
