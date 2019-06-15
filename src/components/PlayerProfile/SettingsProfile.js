import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Col } from 'react-native-easy-grid'

import PlayHand from './SettingsProfileComponent/PlayHand'
import LanguageSelector from './SettingsProfileComponent/LanguageSelector'

class SettingsProfile extends Component {
  render () {
    return (
      <Col style={styles.colContainer}>
        <PlayHand />
        <LanguageSelector />
      </Col>
    )
  }
}

const styles = StyleSheet.create({
  colContainer: {
    flex: 1
  }
})

export default SettingsProfile
