import React, { Component } from 'react'
import { StyleSheet, StatusBar, ImageBackground } from 'react-native'
import { Container } from 'native-base'
import { Grid, Col } from 'react-native-easy-grid'
import { path } from 'ramda'

import AddToTableHeader from '../components/Headers/AddToTableHeader'
import FriendsList from '../components/Management/FriendsList'
import api from '../services/api'

export default class AddToTable extends Component {
  state = {
    user_ids: []
  }

  getTable = () => path(['navigation', 'state', 'params', 'table'])(this.props)

  onSubmit = async () => {
    const { user_ids } = this.state
    try {
      const res = await api.patch(
        `/api/tables/${this.getTable().id}/add_users`,
        {
          table: { user_ids }
        }
      )
      this.props.navigation.goBack()
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const table = this.getTable()
    const backgroundImage = '../assets/screen-background.jpg'
    return (
      <ImageBackground
        source={require(backgroundImage)}
        style={styles.root}
      >
        <Container style={styles.container}>
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
                onChange={user_ids => this.setState({ user_ids })}
                players={table.players}
              />
            </Col>
          </Grid>
        </Container>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  }
})
