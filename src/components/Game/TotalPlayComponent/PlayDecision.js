import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import VibrateButton from '../../vibrateButton'
import {Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../../helpers/responsive'

export class PlayDecision extends Component {
  render() {
    const {t, i18n, allowedToDudoCalzo, playIsLoading} = this.props
    return (
      <Col>
        <VibrateButton
          block
          primary
          disabled={!!playIsLoading}
          style={styles.buttonContainer}
          onPress={this.props.onPlay}
        >
          <Text style={styles.buttonText}>
            {t('common:playButtons.playButtonText')}
          </Text>
        </VibrateButton>
        <VibrateButton
          block
          danger
          disabled={!allowedToDudoCalzo || !!playIsLoading}
          onPress={() => this.props.onMove({type: 'dudo'})}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            {playIsLoading == 'dudo'
              ? t('common:loadingGame')
              : t('common:playButtons.dudoButtonText')}
          </Text>
        </VibrateButton>
        <VibrateButton
          block
          success
          disabled={!allowedToDudoCalzo || !!playIsLoading}
          onPress={() => this.props.onMove({type: 'calzo'})}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            {playIsLoading == 'calzo'
              ? t('common:loadingGame')
              : t('common:playButtons.spotOnButtonText')}
          </Text>
        </VibrateButton>
      </Col>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(PlayDecision)

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    height: '27%'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})
