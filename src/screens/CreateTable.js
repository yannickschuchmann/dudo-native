import React, { Component } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Container } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'

import BackHeader from '../components/Headers/BackHeader'
import TableSetupSection from '../components/Management/TableSetupSection'
import FriendsList from '../components/Management/FriendsList'
import api from '../services/api'

export default class CreateTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isCreating: false,
      name: '',
      user_ids: [],
      errors: {
        name: false,
        user_ids: false
      }
    }
  }

  onSubmit = async () => {
    const { name, user_ids } = this.state

    await this.validate()
    if (this.isValid()) {
      this.setState({ isCreating: true })
      await api.post('/api/tables', { table: { name, user_ids } })
      this.props.navigation.goBack()
    }
  }

  isValid = () => {
    return !Object.values(this.state.errors).reduce((prev, curr) => {
      return prev || curr
    })
  }

  validate = () =>
    new Promise(resolve => {
      const errors = {
        name: !this.state.name,
        user_ids: !this.state.user_ids.length === 0
      }
      this.setState({ errors }, resolve)
    })

  onNameChange = name =>
    this.setState({
      name,
      errors: { ...this.state.errors, name: false }
    })

  onUserIdsChange = user_ids =>
    this.setState({
      user_ids,
      errors: { ...this.state.errors, user_ids: false }
    })

  render () {
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <BackHeader navigation={this.props.navigation} />
        <Grid>
          <Row size={30}>
            <TableSetupSection
              error={this.state.errors.name}
              name={this.state.name}
              onStart={this.onSubmit}
              onNameChange={this.onNameChange}
              navigation={this.props.navigation}
              isCreating={this.state.isCreating}
            />
          </Row>
          <Row size={70}>
            <FriendsList onChange={user_ids => this.setState({ user_ids })} />
          </Row>
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
