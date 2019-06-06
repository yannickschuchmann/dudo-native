import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import { scaleFontSize } from '../../helpers/responsive'

export default class TableList extends Component {
  renderItem = ({ item }) => (
    <ListItem
      containerStyle={[
        styles.container,
        !item.meta.has_seen && styles.containerNotSeen
      ]}
      titleStyle={[
        styles.tableNameText,
        !item.meta.has_seen && styles.tableNameTextNotSeen
      ]}
      title={item.name}
      hideChevron
      leftIcon={this.renderAsterisk({ item })}
      onPress={() => this.props.onPress(item.id)}
      badge={{
        value: item.players.length,
        textStyle: {
          color: 'black'
        },
        containerStyle: {
          backgroundColor: '#95792A'
        }
      }}
    />
  )

  renderAsterisk = ({ item }) => {
    if (item.meta.allowed_to_place_move) {
      return (
        <Icon
          name='arrow-right-drop-circle'
          type='material-community'
          iconStyle={styles.allowedToMove}
        />
      )
    }
  }

  render () {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#c8b273'
  },
  containerNotSeen: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#c8b273',
    backgroundColor: '#c8b273'
  },
  tableNameText: {
    color: '#c8b273',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(25)
  },
  tableNameTextNotSeen: {
    color: 'black',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(25)
  },
  allowedToMove: {
    color: 'red',
    paddingRight: '1%',
    fontSize: scaleFontSize(20)
  }
})
