import React, {Component} from 'react'
import {Constants} from 'expo'
import {Text, StyleSheet, Image, StatusBar} from 'react-native'
import {Container, Button} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'
import AuthService from '../services/auth'
import {withUser} from '../components/userProvider'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../helpers/responsive'

import BackHeader from '../components/Headers/BackHeader'
import LanguageSelector from '../components/Management/LanguageSelector'

class PlayerProfile extends Component {
  render() {
    const {t, i18n} = this.props
    const {name, pic} = this.props.user
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        <BackHeader navigation={this.props.navigation} />
        <Grid>
          <Col size={60} style={{alignItems: 'center'}}>
            <Row>
              <Image source={{uri: pic}} style={styles.image} />
            </Row>
            <Row>
              <Text style={styles.nameText}>{name}</Text>
            </Row>
          </Col>
          <Row size={20} style={{justifyContent: 'center'}}>
            <LanguageSelector />
          </Row>
          <Row size={20} style={{justifyContent: 'center'}}>
            <Button
              primary
              style={styles.LogoutButton}
              onPress={async () => {
                await AuthService.logout()
                this.props.navigation.push('Login')
              }}
            >
              <Text style={styles.LogoutButtonText}>
                {t('common:logoutText')}
              </Text>
            </Button>
          </Row>
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black'
  },
  image: {
    marginTop: scaleFontSize(10),
    height: scaleFontSize(150),
    width: scaleFontSize(150),
    borderRadius: scaleFontSize(75)
  },
  LogoutButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: scaleFontSize(50),
    width: scaleFontSize(200),
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'red',
    borderColor: 'rgba(255,255,255,1)'
  },
  LogoutButtonText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  },
  nameText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})

export default withNamespaces(['common'], {wait: true})(withUser(PlayerProfile))
