import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet} from 'react-native'
import {Header, Button, Icon, Title} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'

import {scaleFontSize} from '../../helpers/responsive'

export default class GameTableHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        id: 50,
        name: "Yannick's Table",
        players: 2
      }
    }
  }
  render() {
    return (
      <Header style={styles.homeHeader}>
        <Grid>
          <Row>
            <Col size={20}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate('Home')
                }}
              >
                <Icon style={styles.icon} name="arrow-back" />
              </Button>
            </Col>
            <Col size={55}>
              <Title style={styles.headerTitle}>{this.state.data.name}</Title>
            </Col>
            <Col size={25}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.push('AddToTable')
                }}
              >
                <Icon
                  style={styles.icon}
                  name="account-plus-outline"
                  type="MaterialCommunityIcons"
                />
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
    fontSize: scaleFontSize(30)
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: '#c8b273'
  }
})
