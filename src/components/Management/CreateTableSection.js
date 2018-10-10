import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, Dimensions} from 'react-native'
import {Button} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

export default class CreateTableSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tables: 'Mesas',
      create: 'Crear +'
    }
  }

  render() {
    return (
      <Row>
        <Col style={styles.topRowContainer}>
          <Text style={styles.textTables}>{this.state.tables}</Text>
        </Col>
        <Col style={styles.topRowContainer}>
          <Button
            primary
            style={styles.createTableButton}
            onPress={() => {
              this.props.navigation.push('CreateTable')
            }}
          >
            <Text style={styles.createButtonText}>{this.state.create}</Text>
          </Button>
        </Col>
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
  topRowContainer: {
    padding: '3%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createTableButton: {
    backgroundColor: 'rgba(149,121,42,1)',
    borderRadius: 10,
    margin: '5%',
    width: '70%'
  },
  createButtonText: {
    flex: 1,
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'white'
  },
  textTables: {
    backgroundColor: 'transparent',
    color: 'rgba(149,121,42,1)',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(40)
  }
})
