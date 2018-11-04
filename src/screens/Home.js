import React, {Component} from 'react'
import {Constants, Notifications} from 'expo'

import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  StatusBar,
  View
} from 'react-native'
import {Container} from 'native-base'
import {withInAppNotification} from '../../lib/react-native-in-app-notification'
import {Grid, Row} from 'react-native-easy-grid'
import {StackActions, NavigationActions} from 'react-navigation'
import {withNamespaces} from 'react-i18next'

import HomeHeader from '../components/Headers/HomeHeader'
import CreateTableSection from '../components/Management/CreateTableSection'
import TableList from '../components/Management/TableList'
import {compose, pluck, sortBy, prop} from 'ramda'

import api from '../services/api'
import {withAppState} from '../components/appStateProvider'

class Home extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.fetchTables()
    this.setupListeners()
  }

  componentWillUnmount() {
    this._notificationSubscription.remove()
  }

  setupListeners = () => {
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

  handleNotification = async ({data, origin, ...rest}) => {
    await this.fetchTables()

    if (origin === 'received' && Platform.OS === 'ios') {
      this.props.showNotification({
        title: data.title,
        message: 'The notification has been triggered',
        onPress: () => this.resetToTable(data.table.id)
      })
    }

    if (origin === 'selected') {
      this.resetToTable(data.table.id)
    }
  }

  resetToTable = tableId => {
    const action = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'Home'}),
        NavigationActions.navigate({
          routeName: 'GameTable',
          params: {tableId}
        })
      ]
    })
    this.props.navigation.dispatch(action)
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }

  fetchTables = async () => {
    try {
      const res = await api.get(`/api/tables`)
      this.props.actions.setTables(res.data)
      this.setState({isLoading: false})
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const {navigation} = this.props
    const tables = sortBy(
      prop('order'),
      Object.values(this.props.appState.tables)
    )
    return (
      <Container style={styles.screenStyle}>
        <StatusBar hidden />
        <HomeHeader navigation={navigation} />
        <Grid>
          <Row size={20}>
            <CreateTableSection navigation={navigation} />
          </Row>
          <Row Row size={80}>
            {this.state.isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#c8b273" />
              </View>
            ) : (
              <TableList
                onPress={id => navigation.push('GameTable', {tableId: id})}
                data={tables}
              />
            )}
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default compose(
  withAppState,
  withNamespaces(['common'], {wait: true}),
  withInAppNotification
)(Home)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
