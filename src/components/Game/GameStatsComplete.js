import React, {Component} from 'react'
import {Contents} from 'expo'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Icon} from 'native-base'

export default class GameStatsComplete extends Component {
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
      },
      lang_dice: 'Dados',
      lang_round: 'Ronda',
      lang_players: 'Jugando',
      lang_says: 'Dice:'
    }
  }

  render() {
    return (
      <Grid style={styles.statsContainer}>
        <Col style={styles.leftStatsContainer}>
          <Col style={styles.leftColStyle}>
            <Text style={styles.topStatText}>{this.state.lang_dice}</Text>
            <Text style={styles.topStatText}>{this.state.lang_round}</Text>
            <Text style={styles.topStatText}>{this.state.lang_players}</Text>
          </Col>
          <Col style={styles.rightColStyle}>
            <Text style={styles.topStatText}>{this.state.total_die}</Text>
            <Text style={styles.topStatText}>{this.state.rounds_count}</Text>
            <Text style={styles.topStatText}>
              {this.state.active_players_count}
            </Text>
          </Col>
        </Col>
        <Col style={styles.rightStatsContainer}>
          <Row size={40}>
            <Col>
              <Text style={styles.topStatText}>
                {this.state.last_move.initiator.name}
              </Text>
            </Col>
            <Col>
              <Text style={styles.topStatText}>{this.state.lang_says}</Text>
            </Col>
          </Row>
          <Row size={60}>
            <Col>
              <Text style={styles.topStatText}>{this.state.last_move.die}</Text>
            </Col>
            <Col>
              <Icon
                style={styles.topStatText}
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
SCREEN_WIDTH = Dimensions.get('window').width // get current width
SCALE = 375 // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH)
  return newSize
}
const styles = StyleSheet.create({
  statsContainer: {
    marginTop: '2%',
    minHeight: '25%',
    maxHeight: '25%'
  },
  leftStatsContainer: {
    backgroundColor: '#95792A',
    flex: 1,
    flexDirection: 'row'
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
  topStatText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond'
  },
  rightStatsContainer: {
    backgroundColor: '#C8B273',
    flex: 1,
    flexDirection: 'column'
  }
})
