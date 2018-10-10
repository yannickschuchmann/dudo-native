import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, TextInput, StatusBar} from 'react-native'
import {Header, Left, Body, Title, Right, Button, Icon} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'

export default class HomeHeader extends Component {
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Grid>
          <Row>
            <Col />
            <Col style={styles.columnStyle}>
              <Title style={styles.headerTitle}>DUDO</Title>
            </Col>
            <Col style={styles.columnButtonStyle}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.push('PlayerProfile')
                }}
              >
                <Icon style={styles.icon} name="user" type="EvilIcons" />
              </Button>
            </Col>
          </Row>
        </Grid>
      </Header>
    )
  }
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
    fontSize: 30
  },
  columnStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  columnButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: 40,
    color: '#c8b273'
  }
})
