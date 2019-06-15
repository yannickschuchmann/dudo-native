import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { Row, Col } from 'react-native-easy-grid'
import CupButton from '../CupButtonModals/CupButton'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../../helpers/responsive'
class GameTableFooter extends Component {
  render () {
    const { navigation, t, onPress, switchValue } = this.props
    return (
      switchValue ? (
        <Row>
          <Col style={styles.footerColBack}>
            <Button
              style={styles.goBackButton}
              transparent
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.goBackButtonText}>
                {t('common:gameText:goBackTables')}
              </Text>
            </Button>
          </Col>
          <Col style={styles.footerColCupButton}>
            <CupButton onPress={onPress} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col style={styles.footerColCupButton}>
            <CupButton onPress={onPress} />
          </Col>
          <Col style={styles.footerColBack}>
            <Button
              style={styles.goBackButton}
              transparent
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.goBackButtonText}>
                {t('common:gameText:goBackTables')}
              </Text>
            </Button>
          </Col>
        </Row>
      )
    )
  }
}

const styles = StyleSheet.create({
  footerColBack: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  goBackButton: {
    alignSelf: 'center',
    borderColor: '#c8b273',
    opacity: 1,
    borderWidth: 2,
    borderRadius: 5,
    padding: '3%'
  },
  goBackButtonText: {
    color: '#c8b273',
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond'
  },
  footerColCupButton: {
    flex: 1,
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return { switchValue: state.switchValue }
}

const withN = withNamespaces(['common'], { wait: true })(GameTableFooter)
export default connect(mapStateToProps)(withN)
