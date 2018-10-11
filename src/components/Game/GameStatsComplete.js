import React, {Component} from 'react'
import {Contents} from 'expo'
import {Text, StyleSheet} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Icon} from 'native-base'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'

export class GameStatsComplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rounds_count: 1,
      active_players_count: 2,
      total_die: 10,
      winner: null,
      last_move: {
        initiator: {
          name: 'Sergio',
          is_current: false,
          is_active: true
        },
        die: 3,
        eyes: 5
      }
    }
  }

  render() {
    const {t, i18n} = this.props
    return (
      <Grid>
        <Col style={styles.leftStatsContainer}>
          <Col style={styles.leftColStyle}>
            <Text style={styles.statText}>
              {t('common:gameText.diceAmount')}
            </Text>
            <Text style={styles.statText}>
              {t('common:gameText.roundNumber')}
            </Text>
            <Text style={styles.statText}>
              {t('common:gameText.playerAmount')}
            </Text>
          </Col>
          <Col style={styles.rightColStyle}>
            <Text style={styles.statText}>{this.state.total_die}</Text>
            <Text style={styles.statText}>{this.state.rounds_count}</Text>
            <Text style={styles.statText}>
              {this.state.active_players_count}
            </Text>
          </Col>
        </Col>
        <Col style={styles.rightStatsContainer}>
          <Row size={40}>
            <Col style={styles.centerItems}>
              <Text style={styles.statText}>
                {this.state.last_move.initiator.name}
              </Text>
            </Col>
            <Col style={styles.alignLeftItems}>
              <Text style={styles.statText}>
                {t('common:gameText.playerSays')}
              </Text>
            </Col>
          </Row>
          <Row size={60}>
            <Col style={styles.centerItems}>
              <Text style={styles.diceStyle}>{this.state.last_move.die}</Text>
            </Col>
            <Col style={styles.alignLeftItems}>
              <Icon
                style={styles.diceStyle}
                name={`dice-${this.state.last_move.eyes}`}
                type="MaterialCommunityIcons"
              />
            </Col>
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(GameStatsComplete)

const styles = StyleSheet.create({
  leftStatsContainer: {
    backgroundColor: '#95792A',
    flex: 1,
    flexDirection: 'row'
  },
  rightStatsContainer: {
    backgroundColor: '#C8B273',
    flex: 1,
    flexDirection: 'column'
  },
  leftColStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    left: '10%'
  },
  rightColStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond'
  },
  diceStyle: {
    fontSize: scaleFontSize(60),
    fontFamily: 'MyriadPro-BoldCond',
    marginBottom: '4%'
  },
  centerItems: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignLeftItems: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})
