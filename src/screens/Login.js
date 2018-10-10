import React, {Component} from 'react'
import {Constants} from 'expo'
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
  Text
} from 'react-native'
import {Container, Button} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'
import AuthService from '../services/auth'
import deviceStorage from '../services/deviceStorage'

export default class Login extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.tryLogin()
  }

  tryLogin = async () => {
    try {
      const {isValid, token} = await AuthService.checkFacebook()
      if (isValid) {
        await this.onAuth(token)
      } else {
        await AuthService.logout()
        this.setState({loading: false})
      }
    } catch (err) {
      console.log(err)
    }
  }

  onLogin = async () => {
    this.setState({loading: true})
    const {type, token} = await AuthService.loginFacebook()

    if (type === 'success') {
      await this.onAuth(token)
    } else {
      this.setState({loading: false})
    }
  }

  onAuth = async token => {
    const auth = await AuthService.authenticate(token)
    this.props.navigation.push('Home')
  }

  render() {
    const loading = <ActivityIndicator size="small" color="#c8b273" />
    const loginButton = (
      <Button primary style={styles.FacebookLoginButton} onPress={this.onLogin}>
        <Text style={styles.FacebookLoginButtonText}>Facebook Login</Text>
      </Button>
    )

    return (
      <Container style={{backgroundColor: 'black'}}>
        <StatusBar hidden />
        <Grid>
          <Row size={20} />
          <Row size={60} style={{}}>
            <Col style={styles.justifyAll}>
              <Row>
                <Image
                  source={require('../assets/dudoLogo.png')}
                  style={styles.image}
                />
              </Row>
              <Row>{this.state.loading ? loading : loginButton}</Row>
            </Col>
          </Row>
          <Row size={20} />
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  justifyAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  CardItemContainer: {
    backgroundColor: 'blue'
  },
  image: {
    height: 170,
    width: 300
  },
  FacebookLoginButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    opacity: 1,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(59,89,152,1)',
    borderColor: 'rgba(255,255,255,1)'
  },
  FacebookLoginButtonText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: 'white'
  }
})
