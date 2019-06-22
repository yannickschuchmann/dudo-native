import React, { Component } from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Header, Button, Icon, Title } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import { scaleFontSize } from '../../helpers/responsive'

export default class AddToTableHeader extends Component {
  render () {
    const { onAdd, navigation, selectedUsers, table } = this.props
    return (
      <SafeAreaView>
        <Header style={styles.homeHeader}>
          <Grid>
            <Row style={styles.headerContainer}>
              <Col size={20}>
                <Button transparent onPress={() => navigation.goBack()}>
                  <Icon style={styles.icon} name='arrow-back' />
                </Button>
              </Col>
              <Col size={55}>
                <Title style={styles.headerTitle}>{table.name}</Title>
              </Col>
              <Col size={25}>
                <Button
                  disabled={selectedUsers.length === 0}
                  transparent
                  onPress={onAdd}
                >
                  <Text style={styles.addText}>
                    Add ({selectedUsers.length})
                  </Text>
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
    fontSize: scaleFontSize(30)
  },
  icon: {
    color: 'white',
    fontSize: scaleFontSize(30)
  },
  addText: {
    color: 'white',
    fontSize: scaleFontSize(20),
    fontFamily: 'Bangers-Regular'
  }
})
