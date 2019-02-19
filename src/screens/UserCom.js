import React, {Component} from 'react'
import {Constants} from 'expo'
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native'
import {CheckBox} from 'react-native-elements'
import {Container, Button} from 'native-base'
import {Grid, Col, Row} from 'react-native-easy-grid'
import {scaleFontSize} from '../helpers/responsive'

import {withNamespaces} from 'react-i18next'
import deviceStorage from '../services/deviceStorage'

class UserCom extends Component {
  state = {
    messageRead: false
  }

  optOutCheck() {
    this.state.messageRead
      ? this.setState({messageRead: false})
      : this.setState({messageRead: true})
  }

  onContinue = () => {
    if (this.state.messageRead) {
      deviceStorage.saveItem('message1', true)
    }
    this.props.navigation.push('Home')
  }

  render() {
    const {t, i18n} = this.props
    return (
      <Container style={{backgroundColor: 'black'}}>
        <StatusBar hidden />
        <Grid>
          <Row size={10} />
          <Row size={90}>
            <Col style={styles.justifyAll}>
              <Row size={10}>
                <Text style={styles.textTest}>
                  {t('common:userCommunication.dudoTitle')}
                </Text>
              </Row>
              <Row size={10}>
                <Text style={styles.textTest}>
                  {t('common:userCommunication.buttonClick')}
                </Text>
              </Row>
              <Row size={10}>
                <Button
                  style={styles.buttonContainer}
                  onPress={() =>
                    Linking.openURL(
                      'https://www.facebook.com/398225500942026/videos/321329241846462'
                    )
                  }
                >
                  <Text style={styles.buttonText}>
                    {t('common:userCommunication.buttonText')}
                  </Text>
                </Button>
              </Row>
              <Row size={10} />
              <Row size={30}>
                <Text style={styles.textParag}>
                  {t('common:userCommunication.messageText')}
                </Text>
              </Row>
              <Row size={10}>
                <Text style={styles.textTest}>
                  {t('common:userCommunication.thanksText')}
                </Text>
              </Row>
              <Row size={10}>
                <Button
                  style={styles.buttonContainer}
                  warning
                  onPress={this.onContinue}
                >
                  <Text style={styles.otherButtonText}>
                    {t('common:userCommunication.continueButton')}
                  </Text>
                </Button>
              </Row>
              <Row size={10}>
                <Text style={styles.optOutText}>
                  {t('common:userCommunication.notShow')}
                </Text>
                <CheckBox
                  containerStyle={{
                    backgroundColor: 'black',
                    borderColor: 'black'
                  }}
                  checked={this.state.messageRead}
                  onPress={() => this.optOutCheck()}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(UserCom)

const styles = StyleSheet.create({
  justifyAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textParag: {
    flex: 1,
    textAlign: 'center',
    fontSize: scaleFontSize(23),
    fontFamily: 'Roboto-Bold',
    fontFamily: 'MyriadPro-BoldCond',
    color: '#C8B273',
    paddingLeft: 15,
    paddingRight: 15
  },
  textTest: {
    fontSize: scaleFontSize(30),
    backgroundColor: 'transparent',
    color: '#C8B273',
    fontFamily: 'MyriadPro-BoldCond',
    padding: 5
  },
  buttonText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    padding: 5
  },
  optOutText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    paddingTop: 5,
    paddingLeft: 15
  },
  otherButtonText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'black',
    padding: 5
  }
})
