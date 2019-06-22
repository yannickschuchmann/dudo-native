import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
  Text,
  ImageBackground
} from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Container, Button } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'
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
    const backgroundImage = '../assets/screen-background.jpg'

    return (
      <ImageBackground
        source={require(backgroundImage)}
        style={styles.root}
      >
        <Container style={styles.container}>
          <StatusBar hidden />
          <Grid>
            <Row size={50} style={styles.dudoLogoContainer}>
              <Image
                source={require('../assets/dudoLogo.png')}
                style={styles.dudoLogo}
                resizeMode='contain'
              />
            </Row>
            <Row size={10} style={styles.facebookButtonContainer}>
              {this.state.loading ? (
                <Button style={styles.facebookButton}>
                  <ActivityIndicator size='small' color='#F58B27' />
                </Button>
              ) : (
                <Button
                  onPress={this.onLogin}
                  style={styles.facebookButton}
                >
                  <Image
                    source={require('../assets/flogo.png')}
                    style={styles.facebookLogo}
                    resizeMode='contain'
                  />
                  <Text style={styles.facebookButtonText}>
                    {t('common:login.continueWithFacebook')}
                  </Text>
                </Button>
              )}
            </Row>
            <Row size={20} style={styles.textContainer}>
              <Text style={styles.screenTextFB}>
                {t('common:login.weDontPost')}
              </Text>
            </Row>
            <Row size={20} style={styles.textContainer}>
              <Text style={styles.screenTextFriends}>
                {t('common:login.loginFriends')}
              </Text>
            </Row>
          </Grid>
        </Container>
      </ImageBackground>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(Login)

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
  dudoLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dudoLogo: {
    height: scaleFontSize(150)
  },
  facebookButtonContainer: {
    justifyContent: 'center'
  },
  facebookButton: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    width: scaleFontSize(300),
    backgroundColor: '#4267B2',
    borderColor: 'rgba(255,255,255,1)'
  },
  facebookLogo: {
    height: scaleFontSize(40)
  },
  facebookButtonText: {
    color: 'white',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(20)
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenTextFB: {
    color: 'white',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(20)
  },
  screenTextFriends: {
    color: '#F58B27',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(20),
    textAlign: 'center'
  }
})
