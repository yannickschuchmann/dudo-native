import React, {Component} from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'
import {Grid, Col} from 'react-native-easy-grid'
import {path} from 'ramda'

import AddToTableHeader from '../components/Headers/AddToTableHeader'
import FriendsList from '../components/Management/FriendsList'
import api from '../services/api'

export default class AddToTable extends Component {
  state = {
    user_ids: []
  }

  getTable = () => path(['navigation', 'state', 'params', 'table'])(this.props)

  onSubmit = async () => {
    const {user_ids} = this.state
    try {
      const res = await api.patch(
        `/api/tables/${this.getTable().id}/add_users`,
        {
          table: {user_ids}
        }
      )
      this.props.navigation.state.params.updateTable(res.data)
      this.props.navigation.goBack()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const table = this.getTable()
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <AddToTableHeader
          selectedUsers={this.state.user_ids}
          table={table}
          onAdd={this.onSubmit}
          navigation={this.props.navigation}
        />
        <Grid>
          <Col>
            <FriendsList
              onChange={user_ids => this.setState({user_ids})}
              players={table.players}
            />
          </Col>
        </Grid>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black'
  }
})
