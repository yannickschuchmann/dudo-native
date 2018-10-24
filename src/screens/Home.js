import React, {Component} from 'react'
import {Constants, Notifications} from 'expo'

import {Platform, StyleSheet, StatusBar} from 'react-native'
import {Container, Toast} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'
import {StackActions, NavigationActions} from 'react-navigation'
import {withNamespaces} from 'react-i18next'

import HomeHeader from '../components/Headers/HomeHeader'
import CreateTableSection from '../components/Management/CreateTableSection'
import TableList from '../components/Management/TableList'
import {compose, sortBy, prop} from 'ramda'

import api from '../services/api'
import {withAppState} from '../components/appStateProvider'

class Home extends Component {
  componentDidMount() {
    this.fetchTables()

    this._notificationSubscription = Notifications.addListener(
      this.handleNotification
    )
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchTables()
      }
    )
  }

  componentWillUnmount() {
    this._notificationSubscription.remove()
  }

  handleNotification = async ({data, origin, ...rest}) => {
    if (Platform.OS === 'ios') {
      Toast.show({
        text: this.props.t(`common:toast.${data.msg}`),
        buttonText: 'Ok',
        duration: 3000
      })
    }

    const action = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'Home'}),
        NavigationActions.navigate({
          routeName: 'GameTable',
          params: {tableId: data.table.id}
        })
      ]
    })

    await this.fetchTables()
    this.props.navigation.dispatch(action)
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

export default compose(
  withAppState,
  withNamespaces(['common'], {wait: true})
)(Home)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  }
})
