import React, {Component} from 'react'
import {StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'

export default class CupButton extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col size={33} />
          <TouchableOpacity onPress={this.props.onPress}>
            <Col size={34} style={styles.cupIconContainer}>
              <Image
                style={styles.cupIcon}
                resizeMode="contain"
                source={require('../../assets/cup.png')}
              />
            </Col>
          </TouchableOpacity>
          <Col size={33} />
        </Row>
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
  cupIcon: {
    height: scaleFontSize(70),
    width: scaleFontSize(70)
  },
  cupIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
