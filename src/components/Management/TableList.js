import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View} from 'react-native'
import {ListItem, Icon} from 'react-native-elements'

import {scaleFontSize} from '../../helpers/responsive'

export default class TableList extends Component {
  renderItem = ({item}) => (
    <ListItem
      containerStyle={styles.container}
      titleStyle={styles.tableNameText}
      title={item.name}
      hideChevron={true}
      leftIcon={this.renderAsterisk({item})}
      onPress={() => this.props.onPress(item.id)}
      badge={{
        value: item.players.length,
        textStyle: {color: 'black'},
        containerStyle: {backgroundColor: '#95792A'}
      }}
    />
  )

  renderAsterisk = ({item}) => {
    if (item.meta.allowed_to_place_move) {
      return (
        <Icon
          name="arrow-right-drop-circle"
          type="material-community"
          iconStyle={styles.allowedToMove}
        />
      )
    }
  }
  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
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
  },
  allowedToMove: {
    color: 'red',
    paddingRight: '1%',
    fontSize: scaleFontSize(20)
  }
})
