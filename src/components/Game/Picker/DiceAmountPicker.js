import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  View,
  Dimensions
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'

export default class DiceAmountPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rounds_count: 1,
      active_players_count: 2,
      total_die: 10,
      winner: null,
      last_move: {
        initiator: {
          name: 'Yannick',
          is_current: false,
          is_active: true
        },
        die: 3,
        eyes: 5
      },
      picked_amount: null
    }
  }

  componentDidMount() {
    this.setState({picked_amount: this.state.last_move.die})
  }
  increaseAllowed = () => {
    return this.state.picked_amount < this.state.total_die
  }
  decreaseAllowed = () => {
    return this.state.picked_amount > 1
  }
  incrementAmount = () => {
    this.setState({picked_amount: this.state.picked_amount + 1})
  }
  decreaseAmount = () => {
    this.setState({picked_amount: this.state.picked_amount - 1})
  }
  render() {
    return (
      <Row>
        <Col size={11} />
        <Col size={25}>
          <TouchableOpacity
            onPress={this.decreaseAmount}
            disabled={!this.decreaseAllowed()}
          >
            <Image
              source={require('../../../assets/pickerArrow.png')}
              style={styles.pickerContainerLeft}
            />
          </TouchableOpacity>
        </Col>
        <Col size={25}>
          <ImageBackground
            source={require('../../../assets/pickerContainer.png')}
            style={styles.pickerContainerLeft}
          >
            <Text style={styles.picketAmountText}>
              {this.state.picked_amount}
            </Text>
          </ImageBackground>
        </Col>
        <Col size={25}>
          <TouchableOpacity
            onPress={this.incrementAmount}
            disabled={!this.increaseAllowed()}
          >
            <Image
              style={styles.pickerContainerRight}
              source={require('../../../assets/pickerArrow.png')}
            />
          </TouchableOpacity>
        </Col>
        <Col />
      </Row>
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
  pickerContainerLeft: {
    height: scaleFontSize(65),
    width: scaleFontSize(65),
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainerRight: {
    height: scaleFontSize(65),
    width: scaleFontSize(65),
    transform: [{rotateZ: '180deg'}]
  },
  picketAmountText: {
    fontSize: scaleFontSize(50),
    fontFamily: 'MyriadPro-BoldCond',
    color: '#95792A',
    top: '5%'
  }
})
