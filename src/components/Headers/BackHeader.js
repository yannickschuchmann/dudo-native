import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Header, Button, Title, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import { scaleFontSize } from '../../helpers/responsive'

export default class BackHeader extends Component {
  render () {
    return (
      <SafeAreaView>
        <Header style={styles.homeHeader}>
          <Grid>
            <Row style={styles.headerContainer}>
              <Col style={styles.columnStyle}>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}
                >
                  <Icon style={styles.icon} name='arrow-back' />
                </Button>
              </Col>
              <Col style={styles.columnTitleStyle}>
                <Title style={styles.headerTitle}>DUDO</Title>
              </Col>
              <Col />
            </Row>
          </Grid>
        </Header>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: 'transparent',
    borderBottomColor: '#F58B27',
    borderBottomWidth: 2
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'Bangers-Regular',
    color: 'white',
    fontSize: scaleFontSize(35)
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
    color: 'white'
  }
})
