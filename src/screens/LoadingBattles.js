import React, {Component} from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {Container} from 'native-base'

import LoadingFriendBattle from '../Loading/LoadingFriendBattle'
import LoadingAnonBattle from '../Loading/LoadingAnonBattle'

class LoadingBattle extends Component {
  render() {
    const friendBattle = this.props.navigation.getParam('friendBattle', null)
    const {navigation} = this.props
    return (
      <Container style={styles.root}>
        <StatusBar hidden />
        {friendBattle ? (
          <LoadingFriendBattle navigation={navigation} />
        ) : (
          <LoadingAnonBattle navigation={navigation} />
        )}
      </Container>
    )
  }
}

export default LoadingBattle

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black'
  }
})
