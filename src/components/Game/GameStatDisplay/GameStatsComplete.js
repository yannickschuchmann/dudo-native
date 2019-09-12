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
        <Row size={30}>
          <Col style={styles.statCol}>
            <Text style={styles.statText}>
              {t('common:gameText.diceAmount')} {game.total_die}
            </Text>
          </Col>
          <Col style={styles.statCol}>
            <Text style={styles.statText}>
              {t('common:gameText.roundNumber')} {game.rounds_count}
            </Text>
          </Col>
          <Col style={styles.statCol}>
            <Text style={styles.statText}>
              {t('common:gameText.playerAmount')} {game.active_players_count}
            </Text>
          </Col>
        </Row>
        <Row size={25} style={styles.nameRow}>
          <Text style={styles.statText}>
            {lastMove.initiator.name} {t('common:gameText.playerSays')}
          </Text>
        </Row>
        <Row size={45} style={styles.playRow}>
          <Col style={{alignItems:'flex-end'}}>
            <Text style={styles.numberStyle}>{lastMove.die}</Text>
          </Col>
          <Col>
            {lastMove.eyes && (
              <React.Fragment>
                <Icon
                  style={styles.diceStyle}
                  name={`dice-${lastMove.eyes}`}
                  type="MaterialCommunityIcons"
                />
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(GameStatsComplete)

const styles = StyleSheet.create({
  statCol: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d96004',
    borderColor: '#F58B27',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  nameRow: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d96004'
  },
  playRow: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d96004',
    borderColor: '#F58B27',
    borderBottomWidth: 2
  },
  statText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    width: '100%',
    color: 'white'
  },
  numberStyle: {
    fontSize: scaleFontSize(50),
    fontFamily: 'Bangers-Regular',
    color: 'white',
    width: '20%'
  },
  diceStyle: {
    fontSize: scaleFontSize(50),
    fontFamily: 'Bangers-Regular',
    color: 'white'
  }
})
