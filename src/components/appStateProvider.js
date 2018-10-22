import React from 'react'
import {compose} from 'ramda'
import {Platform} from 'react-native'
import {withNamespaces} from 'react-i18next'
import {withNavigation} from 'react-navigation'
import {Toast} from 'native-base'

export const AppStateContext = React.createContext({})

class AppStateProvider extends React.Component {
  state = {
    tables: {}
  }

  setTables = tables => {
    return new Promise(resolve => {
      this.setState(
        {
          tables: tables.reduce((acc, current, index) => {
            acc[current.id] = {...current, order: index}
            return acc
          }, {})
        },
        resolve
      )
    })
  }

  setTable = table => {
    return new Promise(resolve => {
      this.setState(
        {
          tables: {
            ...this.state.tables,
            [table.id]: table
          }
        },
        resolve
      )
    })
  }

  render() {
    const value = {
      appState: this.state,
      actions: {
        setTables: this.setTables,
        setTable: this.setTable
      }
    }
    return (
      <AppStateContext.Provider value={value}>
        {this.props.children}
      </AppStateContext.Provider>
    )
  }
}

export default compose(withNamespaces(['common'], {wait: true}))(
  AppStateProvider
)

export const withAppState = Component => props => (
  <AppStateContext.Consumer>
    {context => <Component {...props} {...context} />}
  </AppStateContext.Consumer>
)
