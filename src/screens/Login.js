import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
  Text
} from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Container, Button } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import AuthService from '../services/auth'
import deviceStorage from '../services/deviceStorage'
import { registerPushNotifications } from '../services/pushNotifications'

import { scaleFontSize } from '../helpers/responsive'

class Login extends Component {
  state = {
    loading: true
  }

  componentDidMount () {
    this.tryLogin()
  }

  tryLogin = async () => {
    try {
      const { isValid, token } = await AuthService.checkFacebook()
      if (isValid) {
        await this.onAuth(token)
      } else {
        await AuthService.logout()
        this.setState({ loading: false })
      }
    } catch (err) {
      console.error(err)
    }
  }

  onLogin = async () => {
    this.setState({ loading: true })
    const { type, token } = await AuthService.loginFacebook()

    if (type === 'success') {
      await this.onAuth(token)
    } else {
      this.setState({ loading: false })
    }
  }

  onAuth = async token => {
    await AuthService.authenticate(token)
    await registerPushNotifications()
    const messageRead = await deviceStorage.getItem('message2')
    if (messageRead) {
      this.props.navigation.push('Home')
    } else {
      this.props.navigation.push('UserCom')
    }
  }

  render () {
    const { t } = this.props
    const loading = (
      <Button primary style={styles.facebookLoginButton}>
        <ActivityIndicator size='small' color='#c8b273' />
      </Button>
    )
    const loginButton = (
      <Button primary style={styles.facebookLoginButton} onPress={this.onLogin}>
        <Image
          source={require('../assets/flogo.png')}
          style={styles.buttonImage}
        />
        <Text style={styles.facebookLoginButtonText}>
          {t('common:login.continueWithFacebook')}
        </Text>
      </Button>
    )

    return (
      <Container style={{ backgroundColor: 'black' }}>
        <StatusBar hidden />
        <Grid>
          <Row size={10} />
          <Row size={30}>
            <Row style={styles.justifyAll}>
              <Image
                source={require('../assets/dudoLogo.png')}
                style={styles.image}
              />
            </Row>
          </Row>
          <Row size={50}>
            <Col style={styles.justifyAll}>
              <Row>{this.state.loading ? loading : loginButton}</Row>
              <Row>
                <Text style={styles.facebookLoginButtonText}>
                  {t('common:login.weDontPost')}
                </Text>
              </Row>
              <Row style={styles.friendsRow}>
                <Text style={styles.friendsText}>
                  {t('common:login.loginFriends')}
                </Text>
              </Row>
            </Col>
          </Row>
          <Row size={10} />
        </Grid>
      </Container>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(Login)

const styles = StyleSheet.create({
  justifyAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardItemContainer: {
    backgroundColor: 'blue'
  },
  image: {
    marginTop: 25,
    height: scaleFontSize(170),
    width: scaleFontSize(300)
  },
  buttonImage: {
    height: scaleFontSize(30),
    width: scaleFontSize(30)
  },
  facebookLoginButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    height: scaleFontSize(50),
    width: scaleFontSize(300),
    opacity: 1,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#4267B2',
    borderColor: 'rgba(255,255,255,1)'
  },
  facebookLoginButtonText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'Roboto-Bold',
    color: 'white',
    padding: scaleFontSize(8)
  },
  friendsText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    color: '#C8B273',
    paddingLeft: 15,
    paddingRight: 15
  }
})
