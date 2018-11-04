import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import {Icon} from 'native-base'
import {Grid, Col} from 'react-native-easy-grid'

import {scaleFontSize} from '../../../helpers/responsive'

export default class TableDiceList extends Component {
  renderItem = ({item}) => {
    const diceIcons = []

    for (let type in item.cup) {
      for (let i = 0; i < item.cup[type]; i++) {
        diceIcons.push(
          <Icon
            style={styles.diceInCup}
            name={`dice-${type}`}
            type="MaterialCommunityIcons"
            key={`${type}-${i}`}
          />
        )
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.playerNameText}>{item.player}</Text>
        <View style={styles.diceContainer}>{diceIcons}</View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={{backgroundColor: '#c8b273'}}
        data={this.props.cups}
        keyExtractor={(item, i) => `${item.name}-${i}`}
        renderItem={this.renderItem}
      />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderTopWidth: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  playerNameText: {
    color: 'black',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(35),
    marginLeft: '2%'
  },
  diceInCup: {
    color: 'black',
    fontSize: scaleFontSize(40)
  },
  diceContainer: {
    flex: 1,
    marginRight: '2%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
