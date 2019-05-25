import React, {Component} from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import {Header, Button, Icon, Title} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'
import {scaleFontSize} from '../../helpers/responsive'
export default class GameTableHeader extends Component {
  render() {
    const {onAddToTable, table} = this.props
    return (
      <SafeAreaView>
        <Header style={styles.homeHeader}>
          <Grid>
            <Row>
              <Col>
                <Title style={styles.headerTitle}>{table.name}</Title>
              </Col>
              <Col />
              <Col>
                <Button transparent onPress={onAddToTable}>
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
    fontSize: scaleFontSize(30),
    color: '#c8b273'
  }
})
