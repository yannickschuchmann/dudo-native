import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Button, Icon} from 'native-base'
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
    const {game, lastMove, t, i18n, playIsLoading} = this.props
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
          <Col size={20}>
            <Button
              block
              danger
              disabled={!!playIsLoading}
              style={styles.backButtonContainer}
              onPress={this.props.closePicker}
            >
              <Icon style={styles.icon} name="arrow-back" />
            </Button>
          </Col>
          <Col size={80}>
            <Button
              block
              primary
              disabled={!!playIsLoading}
              style={styles.buttonContainer}
              onPress={() => this.props.onMove({type: 'raise', die, eyes})}
            >
              <Text style={styles.buttonText}>
                {playIsLoading == 'raise'
                  ? t('common:loadingGame')
                  : t('common:playButtons.playButtonText')}
              </Text>
            </Button>
          </Col>
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
    flex: 0.9,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: 'white',
    alignItems: 'center'
  },
  backButtonContainer: {
    flex: 0.9,
    alignItems: 'center',
    marginRight: '5%'
  }
})
