import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  View
} from 'react-native'
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
const styles = StyleSheet.create({
  cupIcon: {
    height: 70,
    width: 70
  },
  cupIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
