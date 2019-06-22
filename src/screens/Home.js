import React, { Component } from 'react'
import { Notifications } from 'expo'

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ImageBackground
} from 'react-native'
import { Container, Button } from 'native-base'
import { withInAppNotification } from '../../lib/react-native-in-app-notification'
import { Grid, Row } from 'react-native-easy-grid'
import { StackActions, NavigationActions } from 'react-navigation'
import { withNamespaces } from 'react-i18next'
import { compose, sortBy, prop } from 'ramda'
import HomeHeader from '../components/Headers/HomeHeader'
import TableList from '../components/Management/TableList'
import { scaleFontSize } from '../helpers/responsive'

import { withGlobalState } from '../components/globalStateProvider'

class Home extends Component {
  componentDidMount () {
    this.setupListeners()
  }

  componentWillUnmount () {
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
          if (Platform.OS === 'android') {
            Notifications.dismissAllNotificationsAsync()
          }
        }
      )
    ]
  }

  handleNotification = async ({ data, origin, ...rest }) => {
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
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'GameTable',
          params: { tableId }
        })
      ]
    })
    this.props.navigation.dispatch(action)
  }

  render () {
    const backgroundImage = '../assets/screen-background.jpg'
    const { navigation, t } = this.props
    const { isLoading } = this.props.globalState
    const tables = sortBy(
      prop('order'),
      Object.values(this.props.globalState.tables)
    )
    return (
      <ImageBackground
        source={require(backgroundImage)}
        style={styles.root}
      >
        <Container style={styles.container}>
          <StatusBar hidden />
          <HomeHeader navigation={navigation} />
          <Grid>
            <Row size={20} style={styles.titleRow}>
              <Text style={styles.titleText}>
                {t('common:tablesText')}
              </Text>
            </Row>
            <Row size={65}>
              {isLoading ? (
                <View style={styles.centeredContainer}>
                  <ActivityIndicator size='small' color='white' />
                </View>
              ) : tables.length === 0 ? (
                <View style={styles.centeredContainer}>
                  <Text style={styles.noTablesText}>
                    {t('common:noTablesText')}
                  </Text>
                </View>
              ) : (
                <TableList
                  onPress={id =>
                    navigation.push('GameTable', { tableId: id })
                  }
                  data={tables}
                />
              )}
            </Row>
            <Row size={15} style={styles.createButtonRow}>
              <Button
                style={styles.createTableButton}
                onPress={() => {
                  this.props.navigation.push('CreateTable')
                }}
              >
                <Text style={styles.createButtonText}>
                  {t('common:createText')}
                </Text>
              </Button>
            </Row>
          </Grid>
        </Container>
      </ImageBackground>
    )
  }
}

export default compose(
  withGlobalState,
  withNamespaces(['common'], { wait: true }),
  withInAppNotification
)(Home)

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
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleRow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(30)
  },
  createButtonRow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  createTableButton: {
    flex: 0.5,
    backgroundColor: '#F58B27',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2
  },
  createButtonText: {
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(30)
  }
})
