import React, { Component } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import Modal from 'react-native-modalbox'
import { Icon } from 'native-base'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../../helpers/responsive'

class DiceCupModal extends Component {
  renderDices = () => {
    const { cup } = this.props.tableData
    const diceIcons = []
    for (let type in cup) {
      for (let i = 0; i < cup[type]; i++) {
        diceIcons.push(
          <Icon
            style={styles.diceInCup}
            name={`dice-${type}`}
            type='MaterialCommunityIcons'
            key={`${type}-${i}`}
          />
        )
      }
    }
    return diceIcons
  }
  render () {
    const { t, tableData, isOpen } = this.props
    return (
      <Modal
        style={styles.modalDiceInCup}
        position={'center'}
        isOpen={isOpen}
        backdrop={false}
      >
        {tableData.meta.is_active && tableData.cup ? (
          this.renderDices()
        ) : (
          <Text style={styles.waitingText}>
            {t('common:gameText:obligatedRound')}
          </Text>
        )}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalDiceInCup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '70%',
    width: '90%'
  },
  diceInCup: {
    color: 'white',
    fontSize: scaleFontSize(65)
  },
  waitingText: {
    color: 'white',
    fontSize: scaleFontSize(25),
    textAlign: 'center',
    fontFamily: 'Bangers-Regular'
  }
})

export default withNamespaces(['common'], { wait: true })(DiceCupModal)
