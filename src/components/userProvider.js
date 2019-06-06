import React from 'react'
import AuthService from '../services/auth'

export const UserContext = React.createContext({})

export default class UserProvider extends React.Component {
  state = {
    auth: null
  }

  componentDidMount () {
    AuthService.subscribe(this.onAuthChange)
  }

  onAuthChange = auth => {
    this.setState({ auth })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.auth}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export const withUser = Component => props => (
  <UserContext.Consumer>
    {user => <Component {...props} user={user} />}
  </UserContext.Consumer>
)
