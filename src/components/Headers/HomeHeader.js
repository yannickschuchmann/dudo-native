import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Header, Title, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import { scaleFontSize } from '../../helpers/responsive'

export default class HomeHeader extends Component {
  render () {
    return (
      <SafeAreaView>
        <Header style={styles.homeHeader}>
          <Grid>
            <Row style={styles.headerContainer}>
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
                  <Icon
                    style={styles.icon}
                    name='kebab-vertical'
                    type='Octicons'
                  />
                </Button>
              </Col>
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
    flexDirection: 'column',
    justifyContent: 'center'
  },
  columnButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: 'white'
  }
})
