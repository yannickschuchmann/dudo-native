import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, View, Text} from 'react-native'
import {Button, Input} from 'native-base'
import {Row} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'

export class TableSetupSection extends Component {
  render() {
    const {t, i18n} = this.props
    return (
      <View style={{width: '100%'}}>
        <Row style={styles.inputContainer}>
          <Input
            placeholder={t('common:tableNamePlaceholder')}
            placeholderTextColor="#95792a"
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
          >
            <Text style={styles.startGameButtonText}>
              {t('common:startGame')}
            </Text>
          </Button>
        </Row>
      </View>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(TableSetupSection)

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    flex: 1
  },
  inputContainer: {
    marginTop: scaleFontSize(15),
    marginLeft: '5%',
    marginRight: '5%'
  },
  buttonContainer: {
    marginTop: '1%',
    justifyContent: 'flex-end',
    marginRight: '5%'
  },
  textInput: {
    borderBottomColor: 'rgba(200,178,115,1)',
    borderBottomWidth: 2,
    color: 'rgba(200,178,115,1)'
  },
  startGameButton: {
    backgroundColor: 'rgba(149,121,42,1)',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  startGameButtonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white'
  }
})
