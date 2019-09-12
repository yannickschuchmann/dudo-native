import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import VibrateButton from '../../vibrateButton'
import { Grid, Row, Col } from 'react-native-easy-grid'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../../helpers/responsive'

export class PlayDecision extends Component {
  render () {
    const { t, allowedToDudoCalzo, playIsLoading } = this.props
    return (
      <Grid>
        <Row style={styles.rowContainer}>
          <VibrateButton
            disabled={!allowedToDudoCalzo || !!playIsLoading}
            onPress={() => this.props.onMove({ type: 'dudo' })}
            style={styles.dudoButton}
          >
            <Text style={styles.buttonText}>
              {playIsLoading === 'dudo'
                ? t('common:loadingGame')
                : t('common:playButtons.dudoButtonText')}
            </Text>
          </VibrateButton>
          <VibrateButton
            disabled={!allowedToDudoCalzo || !!playIsLoading}
            onPress={() => this.props.onMove({ type: 'calzo' })}
            style={styles.calzoButton}
          >
            <Text style={styles.buttonText}>
              {playIsLoading === 'calzo'
                ? t('common:loadingGame')
                : t('common:playButtons.spotOnButtonText')}
            </Text>
          </VibrateButton>
        </Row>
        <Row style={styles.rowContainer}>
          <VibrateButton
            disabled={!!playIsLoading}
            onPress={this.props.onPlay}
            style={styles.playButton}
          >
            <Text style={styles.buttonText}>
              {t('common:playButtons.playButtonText')}
            </Text>
          </VibrateButton>
        </Row>
      </Grid>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(PlayDecision)

const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: 'space-around'
  },
  calzoButton: {
    backgroundColor: 'green',
    flex: 0.4,
    height: '70%',
    marginTop: '3%'
  },
  dudoButton: {
    backgroundColor: 'red',
    flex: 0.4,
    height: '70%',
    marginTop: '3%'
  },
  playButton: {
    backgroundColor: 'blue',
    flex: 0.9,
    height: '70%',
    marginTop: '3%'
  },
  buttonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'Bangers-Regular',
    color: 'white',
    width: '100%',
    textAlign: 'center'
  }
})
