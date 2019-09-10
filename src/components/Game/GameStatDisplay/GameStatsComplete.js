import React, {Component} from 'react'
import {Contents} from 'expo'
import {Text, StyleSheet} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Icon} from 'native-base'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../../helpers/responsive'

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
          <Row size={40} style={styles.centerItems}>
            <Text style={styles.statText}>
              {lastMove.initiator.name} {t('common:gameText.playerSays')}
            </Text>
          </Row>
          <Row size={60}>
            {lastMove.eyes && (
              <React.Fragment>
                <Col>
                  <Text style={styles.diceStyle}>{lastMove.die}</Text>
                </Col>
                <Col>
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
    backgroundColor: '#F58B27',
    flex: 1,
    flexDirection: 'row',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2,
    width: '100%'
  },
  rightStatsContainer: {
    backgroundColor: '#F58B27',
    flex: 1,
    flexDirection: 'column',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2,
    width: '100%'
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
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center'
  },
  diceStyle: {
    textAlign: 'center',
    fontSize: scaleFontSize(50),
    fontFamily: 'Bangers-Regular',
    width: '100%',
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
