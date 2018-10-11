import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'
import {Row, Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../../helpers/responsive'

export class resultContinue extends Component {
  constructor(props) {
    super(props)

    this.state = {
      last_move: {
        die: 3,
        eyes: 5,
        player: 'Sergio'
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
      <Col style={{alignItems: 'center'}}>
        <Row>
          <Col style={styles.playMade1}>
            <Text style={styles.decisionText}>
              {t('common:gameDecisions.totalText')}
            </Text>
          </Col>
          <Col style={styles.playMade1}>
            <Text style={styles.decisionText}>{this.state.real_dice.die}</Text>
            <Icon
              style={styles.diceStyle}
              name={`dice-${this.state.real_dice.eyes}`}
              type="MaterialCommunityIcons"
            />
          </Col>
          <Col style={styles.playMade1}>
            <Text style={styles.decisionText}>
              {this.state.last_move.player}
            </Text>
          </Col>
          <Col style={styles.playMade1}>
            <Text style={styles.decisionText}>{t(result)}</Text>
          </Col>
        </Row>
        <Row>
          <TouchableOpacity
            style={styles.LangButtonSpanish}
            onPress={() => {
              i18n.changeLanguage('de')
            }}
          >
            <Text style={styles.languageButtonText}>
              {t('common:actions.toggleToGerman')}
            </Text>
          </TouchableOpacity>
        </Row>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(resultContinue)

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
  },
  LangButtonSpanish: {
    height: scaleFontSize(50),
    backgroundColor: 'blue',
    width: '50%',
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
  }
})
