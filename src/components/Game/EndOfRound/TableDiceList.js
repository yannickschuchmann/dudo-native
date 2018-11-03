import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import {Icon} from 'native-base'
import {Grid, Col} from 'react-native-easy-grid'

import {scaleFontSize} from '../../../helpers/responsive'

export default class TableDiceList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          id: 1,
          name: 'Yannick',
          cup: {
            '1': 1,
            '3': 2,
            '4': 1,
            '6': 1
          }
        },
        {
          id: 2,
          name: 'Sergio',
          cup: {
            '1': 1,
            '2': 2,
            '4': 1,
            '5': 1
          }
        },
        {
          id: 3,
          name: 'Paul',
          cup: {
            '1': 1,
            '3': 2,
            '5': 1,
            '6': 1
          }
        },
        {
          id: 4,
          name: 'José',
          cup: {
            '1': 1,
            '2': 1,
            '4': 1,
            '5': 2
          }
        },
        {
          id: 5,
          name: 'Angeles',
          cup: {
            '1': 1,
            '3': 2,
            '4': 1,
            '6': 1
          }
        },
        {
          id: 6,
          name: 'Felipe',
          cup: {
            '1': 1,
            '2': 2,
            '4': 1,
            '5': 1
          }
        },
        {
          id: 7,
          name: 'Benjamin',
          cup: {
            '1': 1,
            '3': 2,
            '5': 1,
            '6': 1
          }
        },
        {
          id: 8,
          name: 'Macarena',
          cup: {
            '1': 1,
            '2': 1,
            '4': 1,
            '5': 2
          }
        }
      ]
    }
  }

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
        <Text style={styles.playerNameText}>{item.name}</Text>
        <View style={styles.diceContainer}>{diceIcons}</View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={{backgroundColor: '#c8b273'}}
        data={this.state.data}
        keyExtractor={item => item.id.toString()}
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
