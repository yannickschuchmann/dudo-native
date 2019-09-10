import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
        <View style={styles.rowContainer}>
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
        </View>
      ) : (
        <View>
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
        </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  footerColBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  goBackButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#F58B27',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2,
    width: scaleFontSize(100)
  },
  goBackButtonText: {
    color: 'black',
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    width: '100%',
    textAlign: 'center'
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
