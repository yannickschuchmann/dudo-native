import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import DecisionMade from '../components/Game/EndOfRound/DecisionMade'
import ResultContinue from '../components/Game/EndOfRound/ResultContinue'
import TableDiceList from '../components/Game/EndOfRound/TableDiceList'

export default class GameEnd extends Component {
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <Grid>
          <Row>
            <DecisionMade />
          </Row>
          <Row>
            <TableDiceList />
          </Row>
          <Row>
            <ResultContinue />
          </Row>
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black'
  }
})
