import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, ImageBackground } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { Container, Button } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { scaleFontSize } from '../helpers/responsive'

import { withNamespaces } from 'react-i18next'
import deviceStorage from '../services/deviceStorage'

class UserCom extends Component {
  state = {
    messageRead: false
  }

  optOutCheck () {
    this.state.messageRead
      ? this.setState({ messageRead: false })
      : this.setState({ messageRead: true })
  }

  onContinue = () => {
    if (this.state.messageRead) {
      deviceStorage.saveItem('message2', true)
    }
    this.props.navigation.push('Home')
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
            <Col style={styles.justifyAll}>
              <Row style={styles.titleContainer}>
                <Text style={styles.titleText}>
                  {t('common:userCommunication.dudoTitle')}
                </Text>
              </Row>
              <Row>
                <Text style={styles.messageText}>
                  {t('common:userCommunication.messageText')}
                </Text>
              </Row>
              <Row style={styles.buttonRow}>
                <Button
                  style={styles.buttonContainer}
                  warning
                  onPress={this.onContinue}
                >
                  <Text style={styles.buttonText}>
                    {t('common:userCommunication.continueButton')}
                  </Text>
                </Button>
              </Row>
              <Row style={styles.optOutRow}>
                <Text style={styles.optOutText}>
                  {t('common:userCommunication.notShow')}
                </Text>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checked={this.state.messageRead}
                  onPress={() => this.optOutCheck()}
                />
              </Row>
            </Col>
          </Grid>
        </Container>
      </ImageBackground>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(UserCom)

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
  justifyAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: scaleFontSize(25),
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Bangers-Regular'
  },
  messageText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scaleFontSize(22),
    fontFamily: 'Bangers-Regular',
    color: '#F58B27',
    padding: scaleFontSize(5)
  },
  buttonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0.5,
    backgroundColor: '#F58B27',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: scaleFontSize(22),
    fontFamily: 'Bangers-Regular',
    color: 'black'
  },
  optOutRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optOutText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'Bangers-Regular',
    color: 'white'
  },
  checkBox: {
    backgroundColor: 'black',
    borderColor: 'black'
  }
})
