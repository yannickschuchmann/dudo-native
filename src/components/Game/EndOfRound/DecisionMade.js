import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, View} from 'react-native'
import {Icon} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../../helpers/responsive'

export class DecisionMade extends Component {
  render() {
    const {
      last_raise,
      last_move_type,
      real_die,
      description,
      winner,
      t,
      i18n
    } = this.props

    return (
      <Col>
        <Row style={styles.playMade1}>
          <Text style={styles.headlineText}>
            {winner
              ? t('common:gameText.wonTheGame', {player: winner.name})
              : description}
          </Text>
          {winner && <Text style={styles.sublineText}>{description}</Text>}
        </Row>
        <Row>
          <Col style={styles.playMade1}>
            <Col>
              <Row style={styles.playMade1}>
                <Text style={styles.decisionText}>
                  {last_move_type === 'dudo'
                    ? t('common:gameDecisions.doubtItText')
                    : t('common:gameDecisions.spotOnText')}
                </Text>
              </Row>
              <Row style={styles.playMade1}>
                <Text style={styles.decisionText}>{last_raise.die}</Text>
                <Icon
                  style={styles.diceStyle}
                  name={`dice-${last_raise.eyes}`}
                  type="MaterialCommunityIcons"
                />
              </Row>
            </Col>
          </Col>
          <Col>
            <Row style={styles.playMade1}>
              <Text style={styles.decisionText}>
                {t('common:gameDecisions.totalText')}
              </Text>
            </Row>
            <Row style={styles.playMade1}>
              <Text style={styles.decisionText}>{real_die.die}</Text>
              <Icon
                style={styles.diceStyle}
                name={`dice-${real_die.eyes}`}
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
  headlineText: {
    color: 'white',
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'rgba(200,178,115,1)'
  },
  sublineText: {
    color: 'white',
    fontSize: scaleFontSize(15),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'rgba(200,178,115,1)'
  },
  diceStyle: {
    fontSize: scaleFontSize(40),
    color: 'rgba(200,178,115,1)'
  }
})
