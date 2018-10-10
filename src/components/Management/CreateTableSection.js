import React, {Component} from 'react'
import {Constants} from 'expo'
import {View, StyleSheet, Text} from 'react-native'
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
          <Text style={styles.text}>{this.state.tables}</Text>
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
    fontSize: 30,
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'white'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'rgba(149,121,42,1)',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: 40
  }
})
