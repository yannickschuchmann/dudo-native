import React, { Component } from 'react'
import { Text, View, StyleSheet, Switch } from 'react-native'
import { connect } from 'react-redux'
import { Col, Row } from 'react-native-easy-grid'
import { Icon } from 'native-base'
import { withNamespaces } from 'react-i18next'

import { selectHand } from '../../../store/actions'

import { scaleFontSize } from '../../../helpers/responsive'

class PlayHand extends Component {
  render () {
    const { t, switchValue, selectHand } = this.props
    return (
      <Row>
        <Col size={20}>
          <View style={styles.handIconContainer}>
            <Icon
              style={styles.handSelectIcon}
              name='hand'
              type='Ionicons'
            />
          </View>
        </Col>
        <Col size={30}>
          <View style={styles.leftHand}>
            <Text style={styles.handButtonText}>
              {t('common:profile.settings.leftHand')}
            </Text>
          </View>
        </Col>
        <Col size={20}>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ true: 'green', false: 'blue' }}
              value={switchValue}
              onValueChange={() => selectHand(switchValue)}
            />
          </View>
        </Col>
        <Col size={30}>
          <View style={styles.rightHand}>
            <Text style={styles.handButtonText}>
              {t('common:profile.settings.rightHand')}
            </Text>
          </View>
        </Col>
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  handIconContainer: {
    marginTop: scaleFontSize(10),
    height: scaleFontSize(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  handSelectIcon: {
    color: '#c8b273',
    fontSize: 40
  },
  leftHand: {
    marginTop: scaleFontSize(10),
    height: scaleFontSize(50),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  switchContainer: {
    marginTop: scaleFontSize(10),
    height: scaleFontSize(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHand: {
    marginTop: scaleFontSize(10),
    height: scaleFontSize(50),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  handButtonText: {
    color: '#c8b273',
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond'
  }
})

const mapStateToProps = (state) => {
  return { switchValue: state.switchValue }
}

const withN = withNamespaces(['common'], { wait: true })(PlayHand)
export default connect(
  mapStateToProps, { selectHand })(withN)
