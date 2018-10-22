import React from 'react'
import {Map} from 'core-js'

export const AppStateContext = React.createContext({})

export default class AppStateProvider extends React.Component {
  state = {
    tables: {}
  }

  componentDidMount() {}

  setTables = tables => {
    this.setState({
      tables: tables.reduce((acc, current, index) => {
        acc[current.id] = {...current, order: index}
        return acc
      }, {})
    })
  }

  setTable = table => {
    this.setState({
      tables: {
        ...this.state.tables,
        [table.id]: table
      }
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

export const withAppState = Component => props => (
  <AppStateContext.Consumer>
    {context => <Component {...props} {...context} />}
  </AppStateContext.Consumer>
)
