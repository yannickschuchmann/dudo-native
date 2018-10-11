import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text} from 'react-native'
import {Icon} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../../helpers/responsive'

export class DecisionMade extends Component {
  constructor(props) {
    super(props)

    this.state = {
      last_move: {
        die: 3,
        eyes: 5,
        player: 'Sergio',
        dudo: true
      },
      real_dice: {
        die: 5,
        eyes: 5
      },
      playedDudo: 'common:gameDecisions.doubtItText',
      playedSpotOn: 'common:gameDecisions.spotOnText'
    }
  }
  render() {
    const {t, i18n} = this.props
    let result = null

    {
      this.state.last_move.dudo
        ? (result = this.state.playedDudo)
        : (result = this.state.playedSpotOn)
    }
    return (
      <Row>
        <Col style={styles.playMade1}>
          <Text style={styles.decisionText}>{this.state.last_move.player}</Text>
        </Col>
        <Col style={styles.playMade2}>
          <Text style={styles.decisionText}>{t(result)}</Text>
        </Col>
        <Col style={styles.playMade1}>
          <Text style={styles.decisionText}>{this.state.last_move.die}</Text>
          <Icon
            style={styles.diceStyle}
            name={`dice-${this.state.last_move.eyes}`}
            type="MaterialCommunityIcons"
          />
        </Col>
      </Row>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(DecisionMade)

const styles = StyleSheet.create({
  playMade1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playMade2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  decisionText: {
    color: 'white',
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'rgba(200,178,115,1)'
  },
  diceStyle: {
    fontSize: scaleFontSize(30),
    color: 'rgba(200,178,115,1)'
  }
})
