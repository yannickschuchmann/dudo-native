import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, View} from 'react-native'
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
        dudo: false
      },
      real_dice: {
        die: 5,
        eyes: 5,
        wins: true
      },
      winner: 'common:gameDecisions.winnerText',
      loser: 'common:gameDecisions.loserText'
    }
  }
  render() {
    const {t, i18n} = this.props
    let result = null

    {
      this.state.real_dice.wins
        ? (result = this.state.winner)
        : (result = this.state.loser)
    }

    return (
      <Col>
        <Row style={styles.playMade1}>
          <Text style={styles.decisionText}>
            {this.state.last_move.player} {t(result)}
          </Text>
        </Row>
        <Row>
          <Col style={styles.playMade1}>
            {this.state.last_move.dudo ? (
              <Col>
                <Row style={styles.playMade1}>
                  <Text style={styles.decisionText}>
                    {t('common:gameDecisions.doubtItText')}
                  </Text>
                </Row>
                <Row style={styles.playMade1}>
                  <Text style={styles.decisionText}>
                    {this.state.last_move.die}
                  </Text>
                  <Icon
                    style={styles.diceStyle}
                    name={`dice-${this.state.last_move.eyes}`}
                    type="MaterialCommunityIcons"
                  />
                </Row>
              </Col>
            ) : (
              <Col>
                <Row style={styles.playMade1}>
                  <Text style={styles.decisionText}>
                    {t('common:gameDecisions.spotOnText')}
                  </Text>
                </Row>
                <Row style={styles.playMade1}>
                  <Text style={styles.decisionText}>
                    {this.state.last_move.die}
                  </Text>
                  <Icon
                    style={styles.diceStyle}
                    name={`dice-${this.state.last_move.eyes}`}
                    type="MaterialCommunityIcons"
                  />
                </Row>
              </Col>
            )}
          </Col>
          <Col>
            <Row style={styles.playMade1}>
              <Text style={styles.decisionText}>
                {t('common:gameDecisions.totalText')}
              </Text>
            </Row>
            <Row style={styles.playMade1}>
              <Text style={styles.decisionText}>
                {this.state.real_dice.die}
              </Text>
              <Icon
                style={styles.diceStyle}
                name={`dice-${this.state.real_dice.eyes}`}
                type="MaterialCommunityIcons"
              />
            </Row>
          </Col>
        </Row>
      </Col>
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
  decisionText: {
    color: 'white',
    fontSize: scaleFontSize(40),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'rgba(200,178,115,1)'
  },
  diceStyle: {
    fontSize: scaleFontSize(40),
    color: 'rgba(200,178,115,1)'
  }
})
