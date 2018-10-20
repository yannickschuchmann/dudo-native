import React, {Component} from 'react'
import {Contents} from 'expo'
import {Text, StyleSheet} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Icon} from 'native-base'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'

export class GameStatsComplete extends Component {
  render() {
    const {game, lastMove, t, i18n} = this.props

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
            <Text style={styles.statText}>{game.total_die}</Text>
            <Text style={styles.statText}>{game.rounds_count}</Text>
            <Text style={styles.statText}>{game.active_players_count}</Text>
          </Col>
        </Col>
        <Col style={styles.rightStatsContainer}>
          <Row size={40}>
            <Col style={styles.centerItems}>
              <Text style={styles.statText}>{lastMove.initiator.name}</Text>
            </Col>
            <Col style={styles.alignLeftItems}>
              <Text style={styles.statText}>
                {t('common:gameText.playerSays')}
              </Text>
            </Col>
          </Row>
          <Row size={60}>
            {lastMove.eyes && (
              <React.Fragment>
                <Col style={styles.centerItems}>
                  <Text style={styles.diceStyle}>{lastMove.die}</Text>
                </Col>
                <Col style={styles.alignLeftItems}>
                  <Icon
                    style={styles.diceStyle}
                    name={`dice-${lastMove.eyes}`}
                    type="MaterialCommunityIcons"
                  />
                </Col>
              </React.Fragment>
            )}
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
