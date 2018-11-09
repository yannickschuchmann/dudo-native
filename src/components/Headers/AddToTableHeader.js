import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, SafeAreaView} from 'react-native'
import {Header, Button, Icon, Title} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'

import {scaleFontSize} from '../../helpers/responsive'

export default class AddToTableHeader extends Component {
  render() {
    const {onAdd, navigation, selectedUsers, table} = this.props
    return (
      <SafeAreaView>
        <Header style={styles.homeHeader}>
          <Grid>
            <Row>
              <Col size={20}>
                <Button transparent onPress={() => navigation.goBack()}>
                  <Icon style={styles.icon} name="arrow-back" />
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
    color: '#c8b273',
    fontSize: scaleFontSize(30)
  },
  addText: {
    color: '#c8b273',
    fontSize: scaleFontSize(20)
  }
})
