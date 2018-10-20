import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import DecisionMade from '../components/Game/EndOfRound/DecisionMade'
import ResultContinue from '../components/Game/EndOfRound/ResultContinue'
import TableDiceList from '../components/Game/EndOfRound/TableDiceList'

export default class RoundEnd extends Component {
  render() {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <Grid>
          <Row size={15}>
            <DecisionMade />
          </Row>
          <Row size={55}>
            <TableDiceList />
          </Row>
          <Row size={30}>
            <ResultContinue navigation={this.props.navigation} />
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
