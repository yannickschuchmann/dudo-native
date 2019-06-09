import React from 'react'
import { compose, length, pathEq, reject, values } from 'ramda'
import { withNamespaces } from 'react-i18next'
import { Notifications } from 'expo'
import firebase from '../services/firebase'
import firestore from '../services/firestore'

export const GlobalStateContext = React.createContext({})

class GlobalStateProvider extends React.Component {
  state = {
    tables: {},
    isLoading: true
  }

  componentWillMount () {
    this.subscribeFirebase()
  }

  componentWillUnmount () {
    if (this.removeFirebaseListener) {
      this.removeFirebaseListener()
    }
  }

  subscribeFirebase = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.removeFirebaseListener = firestore
          .collection(`users/${user.uid}/tables`)
          .orderBy('updated_at', 'desc')
          .onSnapshot({
            next: this.onTablesSnapshot,
            error: error => console.error(error)
          })
      }
    })
  }

  onTablesSnapshot = (snapshot) => {
    const tables = snapshot.docs.map(doc => doc.data())
    this.setTables(tables)
  }

  setTables = tables => {
    const setNotificationBadgeNumber = () => {
      const unseenTableCount = compose(
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
          isLoading: false,
          tables: tables.reduce((acc, current, index) => {
            acc[current.id] = { ...current, order: index }
            return acc
          }, {})
        },
        afterHook(resolve)
      )
    })
  }

  setTableMeta = (tableId, meta) => {
    if (this.user) {
      const ref = firestore.collection(`users/${this.user.uid}/tables`).doc(String(tableId))
      ref.set({ meta }, { merge: true })
    }
  }

  render () {
    const value = {
      globalState: this.state,
      actions: {
        setTables: this.setTables,
        setTable: this.setTable,
        setTableMeta: this.setTableMeta
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
