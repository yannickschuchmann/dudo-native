import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View} from 'react-native'
import {ListItem} from 'react-native-elements'

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
          id: 1,
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
        }
      ]
    }
  }

  renderItem = ({item}) => (
    <ListItem
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      title={`${item.name}`}
      titleStyle={styles.tableNameText}
      hideChevron={true}
      containerStyle={styles.container}
    >
      {this.diceIcons}
    </ListItem>
  )

  render() {
    const diceIcons = []

    for (let type in this.state.data.cup) {
      for (let i = 0; i < this.state.data.cup[type]; i++) {
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
      <FlatList
        style={{backgroundColor: 'blue'}}
        data={this.state.data}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  searchContainer: {
    backgroundColor: '#95792A'
  },
  searchInputText: {
    color: 'black',
    backgroundColor: '#C8B273'
  },
  tableNameText: {
    color: '#c8b273',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(25)
  },
  itemSeparator: {
    height: 1,
    width: '86%',
    backgroundColor: '#c8b273',
    marginLeft: '14%'
  },
  diceInCup: {
    color: 'rgba(200,178,115,1)',
    fontSize: scaleFontSize(20)
  }
})
