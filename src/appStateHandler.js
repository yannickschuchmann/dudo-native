import React from 'react'
import {AppState} from 'react-native'
import {compose} from 'ramda'
import {withGlobalState} from './components/globalStateProvider'
import {withUser} from './components/userProvider'
import api from './services/api'

class AppStateHandler extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (this.props.user) {
        await this.fetchTables()
      }
    }
    this.setState({appState: nextAppState});
  }

  fetchTables = async () => {
    try {
      this.props.actions.setIsLoadingTables(true)
      const res = await api.get(`/api/tables`)
      this.props.actions.setTables(res.data)
      this.props.actions.setIsLoadingTables(false)
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return this.props.children
  }
}

export default compose(withGlobalState, withUser)(AppStateHandler)
