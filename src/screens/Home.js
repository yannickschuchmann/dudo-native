import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'

import HomeHeader from '../components/Headers/HomeHeader'
import CreateTableSection from '../components/Management/CreateTableSection'
import TableList from '../components/Management/TableList'

import api from '../services/api'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tables: []
    }
  }

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

  fetchTables = () => {
    api.get(`/api/tables`).then(res => {
      const tables = res.data
      this.setState({
        tables
      })
    })
  }

  render() {
    return (
      <Container style={styles.screenStyle}>
        <StatusBar hidden />
        <HomeHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={20}>
            <CreateTableSection navigation={this.props.navigation} />
          </Row>
          <Row Row size={80}>
            <TableList
              data={this.state.tables}
              navigation={this.props.navigation}
            />
          </Row>
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  }
})
