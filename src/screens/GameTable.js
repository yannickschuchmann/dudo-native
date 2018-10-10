import React, {Component} from 'react'
import {Constants} from 'expo'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native'
import {Icon, Container, Content, Footer} from 'native-base'
import {ListItem} from 'react-native-elements'

import {Col, Row, Grid} from 'react-native-easy-grid'
import Modal from 'react-native-modalbox'

import GameTableHeader from '../components/Headers/GameTableHeader'
import PlayerCarousel from '../components/Game/PlayerCarousel'
import GameStatsComplete from '../components/Game/GameStatsComplete'
import PlayDisplay from '../components/Game/PlayDisplay'
import CupButton from '../components/Game/CupButton'

export default class GameTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isDisabled: false,
      cup: {
        '1': 1,
        '3': 2,
        '4': 1,
        '6': 1
      }
    }
  }
  render() {
    const diceIcons = []

    for (let type in this.state.cup) {
      for (let i = 0; i < this.state.cup[type]; i++) {
        diceIcons.push(
          <Icon
            style={styles.diceInCup}
            name={`dice-${type}`}
            type="MaterialCommunityIcons"
            key={`${type}-${i}`}
          />
        )
      }
    }
    return (
      <Container>
        <Modal
          style={[styles.modal, styles.modal3]}
          position={'center'}
          ref={'modal3'}
          isDisabled={this.state.isDisabled}
        >
          {diceIcons}
        </Modal>
        <StatusBar hidden />
        <GameTableHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={27}>
            <PlayerCarousel />
          </Row>
          <Row size={25}>
            <GameStatsComplete />
          </Row>
          <Row size={48}>
            <PlayDisplay />
          </Row>
        </Grid>
        <Footer style={styles.CupViewButtonContainer}>
          <CupButton onPress={() => this.refs.modal3.open()} />
        </Footer>
      </Container>
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
  root: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  CupViewButtonContainer: {
    backgroundColor: 'black',
    borderTopColor: '#c8b273',
    borderTopWidth: 4,
    flex: 0.2
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  modal3: {
    height: '70%',
    width: '90%'
  },
  diceInCup: {
    color: 'rgba(200,178,115,1)',
    fontSize: scaleFontSize(65)
  }
})
