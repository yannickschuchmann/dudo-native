import React, { Component } from 'react'
import { Linking, Text, StyleSheet } from 'react-native'
import { Col } from 'react-native-easy-grid'
import { Button } from 'native-base'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

class BattleProfile extends Component {
  render () {
    const { t } = this.props
    return (
      <Col style={styles.colContainer}>
        <Text style={styles.statText}>
          {t('common:profile.battleStats.comingSoon')}
        </Text>
        <Text style={styles.paragText1}>
          {t('common:profile.battleStats.goFacebookText')}
        </Text>
        <Button
          style={styles.buttonContainer}
          onPress={() =>
            Linking.openURL('https://www.facebook.com/dudogames')
          }
        >
          <Text style={styles.buttonText}>
            {t('common:profile.battleStats.goFacebookButton')}
          </Text>
        </Button>
        <Text style={styles.paragText2}>
          {t('common:profile.battleStats.iosMessage')}
        </Text>

      </Col>
    )
  }
}

const styles = StyleSheet.create({
  colContainer: {
    flex: 1,
    margin: scaleFontSize(5)
  },
  statText: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    fontSize: scaleFontSize(35),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    marginTop: scaleFontSize(25)
  },
  paragText1: {
    flex: 1,
    color: 'white',
    fontSize: scaleFontSize(20),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center'
  },
  paragText2: {
    flex: 1,
    color: 'white',
    fontSize: scaleFontSize(15),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center'
  },
  buttonContainer: {
    alignSelf: 'center',
    margin: scaleFontSize(20),
    borderColor: 'white',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2
  },
  buttonText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    color: 'white',
    padding: 5
  }
})

export default withNamespaces(['common'], { wait: true })(BattleProfile)
