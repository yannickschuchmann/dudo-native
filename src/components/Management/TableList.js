import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View, Dimensions} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class TableList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          id: 50,
          name: "Yannick's Table",
          players: 2
        },
        {
          id: 51,
          name: "Sergio's Table",
          players: 5
        },
        {
          id: 52,
          name: 'Hamburg',
          players: 45
        },
        {
          id: 53,
          name: 'That time in a Bar',
          players: 3
        },
        {
          id: 54,
          name: 'Viña',
          players: 23
        },
        {
          id: 55,
          name: 'Amigos',
          players: 99
        },
        {
          id: 56,
          name: 'Family',
          players: 5
        },
        {
          id: 57,
          name: 'People I met at the Airport',
          players: 12
        },
        {
          id: 58,
          name: 'Christmas Game',
          players: 7
        },
        {
          id: 59,
          name: "At Alan's Place",
          players: 8
        },
        {
          id: 60,
          name: 'Puerto Varas',
          players: 3
        },
        {
          id: 61,
          name: 'The Floyd Table',
          players: 76
        },
        {
          id: 62,
          name: 'I neede to make another Table with a super long name',
          players: 125
        }
      ]
    }
  }
  renderItem = ({item}) => (
    <ListItem
      containerStyle={styles.container}
      titleStyle={styles.tableNameText}
      title={item.name}
      hideChevron={true}
      chevronColor={'#C8B273'}
      onPress={() => {
        this.props.navigation.push('GameTable')
      }}
      badge={{
        value: item.players,
        textStyle: {color: 'black'},
        containerStyle: {backgroundColor: '#95792A'}
      }}
    />
  )
  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }
  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}
SCREEN_WIDTH = Dimensions.get('window').width // get current width
SCALE = 375 // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = fontSize => {
  const ratio = fontSize / SCALE // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH)
  return newSize
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  tableNameText: {
    color: '#c8b273',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(25)
  },
  itemSeparator: {
    height: 1,
    width: '95%',
    backgroundColor: '#c8b273',
    marginLeft: '5%'
  }
})
