import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input } from 'native-base'
import { Row } from 'react-native-easy-grid'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

export class TableSetupSection extends Component {
  render () {
    const { t } = this.props
    return (
      <View style={{ width: '100%' }}>
        <Row style={styles.inputContainer}>
          <Input
            placeholder={t('common:tableNamePlaceholder')}
            placeholderTextColor='grey'
            style={styles.textInput}
            onChangeText={this.props.onNameChange}
            value={this.props.name}
          />
        </Row>
        <Row style={styles.buttonContainer}>
          <Button
            primary
            style={styles.startGameButton}
            onPress={this.props.onStart}
            disabled={this.props.isCreating}
          >
            <Text style={styles.startGameButtonText}>
              {this.props.isCreating
                ? t('common:loadingGame')
                : t('common:startGame')}
            </Text>
          </Button>
        </Row>
      </View>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(TableSetupSection)

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    flex: 1
  },
  inputContainer: {
    marginTop: scaleFontSize(15),
    marginLeft: '5%',
    marginRight: '5%'
  },
  textInput: {
    borderBottomColor: '#F58B27',
    borderBottomWidth: 2,
    color: 'white'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startGameButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58B27'
  },
  startGameButtonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'Bangers-Regular',
    color: 'black'
  }
})
