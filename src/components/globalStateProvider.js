import React from 'react'
import { compose, length, pathEq, reject, values } from 'ramda'
import { withNamespaces } from 'react-i18next'
import { Notifications } from 'expo'

export const GlobalStateContext = React.createContext({})

class GlobalStateProvider extends React.Component {
  state = {
    tables: {}
  }

  setTables = tables => {
    const setNotificationBadgeNumber = () => {
      unseenTableCount = compose(
        length,
        reject(pathEq(['meta', 'has_seen'], true)),
        values
      )(this.state.tables)

      Notifications.setBadgeNumberAsync(unseenTableCount)
    }

    const afterHook = (resolve) => () => {
      setNotificationBadgeNumber()
      resolve()
    }

    return new Promise(resolve => {
      this.setState(
        {
          tables: tables.reduce((acc, current, index) => {
            acc[current.id] = { ...current, order: index }
            return acc
          }, {})
        },
        afterHook(resolve)
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

  setIsLoadingTables = isLoadingTables => (
    new Promise(resolve => (
      this.setState({ isLoadingTables }, resolve)
    ))
  )

  render () {
    const value = {
      globalState: this.state,
      actions: {
        setTables: this.setTables,
        setTable: this.setTable,
        setIsLoadingTables: this.setIsLoadingTables
      }
    }
    return (
      <GlobalStateContext.Provider value={value}>
        {this.props.children}
      </GlobalStateContext.Provider>
    )
  }
}

export default compose(withNamespaces(['common'], { wait: true }))(
  GlobalStateProvider
)

export const withGlobalState = Component => props => (
  <GlobalStateContext.Consumer>
    {context => <Component {...props} {...context} />}
  </GlobalStateContext.Consumer>
)
