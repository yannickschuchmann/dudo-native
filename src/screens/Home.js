import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import HomeHeader from '../components/Headers/HomeHeader'
import CreateTableSection from '../components/Management/CreateTableSection'
import TableList from '../components/Management/TableList'
import {sortBy, prop} from 'ramda'

import api from '../services/api'
import {withAppState} from '../components/appStateProvider'

class Home extends Component {
  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchTables()
      }
    )
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }

  fetchTables = async () => {
    try {
      const res = await api.get(`/api/tables`)
      this.props.actions.setTables(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const tables = sortBy(
      prop('order'),
      Object.values(this.props.appState.tables)
    )
    return (
      <Container style={styles.screenStyle}>
        <StatusBar hidden />
        <HomeHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={20}>
            <CreateTableSection navigation={this.props.navigation} />
          </Row>
          <Row Row size={80}>
            <TableList data={tables} navigation={this.props.navigation} />
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default withAppState(Home)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  }
})
