import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Dimensions} from 'react-native'
import {Header, Button, Title, Icon} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'

export default class BackHeader extends Component {
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Grid>
          <Row>
            <Col style={styles.columnStyle}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack()
                }}
              >
                <Icon style={styles.icon} name="arrow-back" />
              </Button>
            </Col>
            <Col style={styles.columnTitleStyle}>
              <Title style={styles.headerTitle}>DUDO</Title>
            </Col>
            <Col />
          </Row>
        </Grid>
      </Header>
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
  homeHeader: {
    backgroundColor: 'black',
    borderBottomColor: '#c8b273',
    borderBottomWidth: 2
  },
  headerTitle: {
    fontFamily: 'MyriadPro-BoldCond',
    color: '#c8b273',
    fontSize: scaleFontSize(30)
  },
  columnStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  columnTitleStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: '#c8b273'
  }
})
