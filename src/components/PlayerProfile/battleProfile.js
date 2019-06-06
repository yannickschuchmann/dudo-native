import React, { Component } from 'react'
import { Linking, Text, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'
import { Button } from 'native-base'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

class BattleProfile extends Component {
  render () {
    const { t } = this.props
    return (
      <Col style={{ flex: 1 }}>
        <Row style={styles.rowContainer} size={40}>
          <Text style={styles.statText}>
            {t('common:profile.battleStats.comingSoon')}
          </Text>
        </Row>
        <Row style={styles.rowContainer} size={40}>
          <Text style={styles.paragText}>
            {t('common:profile.battleStats.goFacebookText')}
          </Text>
        </Row>
        <Row style={styles.rowContainer} size={20}>
          <Button
            style={styles.buttonContainer}
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/dudogames'
              )
            }
          >
            <Text style={styles.buttonText}>
              {t('common:profile.battleStats.goFacebookButton')}
            </Text>
          </Button>
        </Row>
      </Col>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleFontSize(10)
  },
  statText: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    fontSize: scaleFontSize(35),
    fontFamily: 'MyriadPro-BoldCond',
    margin: scaleFontSize(10),
    textAlign: 'center'
  },
  paragText: {
    color: 'white',
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    padding: 5
  }
})

export default withNamespaces(['common'], { wait: true })(BattleProfile)
