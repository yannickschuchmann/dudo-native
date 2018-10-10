import React, {Component} from 'react'
import {Contents} from 'expo'
import {Text, StyleSheet, Dimensions} from 'react-native'
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
      <Grid>
        <Col style={styles.leftStatsContainer}>
          <Col style={styles.leftColStyle}>
            <Text style={styles.statText}>{this.state.lang_dice}</Text>
            <Text style={styles.statText}>{this.state.lang_round}</Text>
            <Text style={styles.statText}>{this.state.lang_players}</Text>
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
              <Text style={styles.statText}>{this.state.lang_says}</Text>
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
SCREEN_WIDTH = Dimensions.get('window').width // get current width
SCALE = 375 // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH)
  return newSize
}
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
