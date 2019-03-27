import React, {Component} from 'react'
import {Notifications} from 'expo'

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native'
import {Container} from 'native-base'
import {withInAppNotification} from '../../lib/react-native-in-app-notification'
import {Grid, Row} from 'react-native-easy-grid'
import {StackActions, NavigationActions} from 'react-navigation'
import {withNamespaces} from 'react-i18next'
import {compose, sortBy, prop} from 'ramda'

import HomeHeader from '../components/Headers/HomeHeader'
import CreateTableSection from '../components/Management/CreateTableSection'
import TableList from '../components/Management/TableList'
import {scaleFontSize} from '../helpers/responsive'

import api from '../services/api'
import {withGlobalState} from '../components/globalStateProvider'

class Home extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.dismissAllNotificationsAsync()
    }
    this.fetchTables()
    this.setupListeners()
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => listener.remove())
  }

  setupListeners = () => {
    this.listeners = [
      Notifications.addListener(
        this.handleNotification
      ),
      this.props.navigation.addListener(
        'willFocus',
        async () => {
          await this.fetchTables()
        }
      )
    ]
  }

  handleNotification = async ({data, origin, ...rest}) => {
    await this.fetchTables()

    if (origin === 'received' && Platform.OS === 'ios') {
      this.props.showNotification({
        title: data.title,
        message: '',
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
    const {navigation, t} = this.props
    const tables = sortBy(
      prop('order'),
      Object.values(this.props.globalState.tables)
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
              <View style={styles.centeredContainer}>
                <ActivityIndicator size="small" color="#c8b273" />
              </View>
            ) : tables.length === 0 ? (
              <View style={styles.centeredContainer}>
                <Text style={styles.noTablesText}>
                  {t('common:noTablesText')}
                </Text>
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
  withGlobalState,
  withNamespaces(['common'], {wait: true}),
  withInAppNotification
)(Home)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noTablesText: {
    color: '#c8b273',
    fontSize: scaleFontSize(15),
    textAlign: 'center'
  }
})
