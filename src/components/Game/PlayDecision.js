import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'native-base'
import {Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'

export class PlayDecision extends Component {
  render() {
    const {t, i18n, allowedToDudoCalzo} = this.props
    return (
      <Col>
        <Col>
          <Button
            block
            primary
            style={styles.buttonContainer}
            onPress={this.props.onPlay}
          >
            <Text style={styles.buttonText}>
              {t('common:playButtons.playButtonText')}
            </Text>
          </Button>
          <Button
            block
            danger
            disabled={!allowedToDudoCalzo}
            onPress={() => this.props.onMove({type: 'dudo'})}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>
              {t('common:playButtons.dudoButtonText')}
            </Text>
          </Button>
          <Button
            block
            success
            disabled={!allowedToDudoCalzo}
            onPress={() => this.props.onMove({type: 'calzo'})}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>
              {t('common:playButtons.spotOnButtonText')}
            </Text>
          </Button>
          )}
        </Col>
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
