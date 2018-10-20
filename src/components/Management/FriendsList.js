import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View} from 'react-native'
import {ListItem, SearchBar} from 'react-native-elements'
import {
  assoc,
  compose,
  curry,
  filter,
  map,
  path,
  pluck,
  propEq,
  when
} from 'ramda'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'
import api from '../../services/api'

export class FriendsList extends Component {
  filteredData = []
  static defaultProps = {
    players: []
  }
  state = {
    users: []
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = () => {
    api.get(`/api/users`).then(res => {
      const skippingIds = pluck('id', this.props.players)
      const users = filter(user => !skippingIds.includes(user.id), res.data)

      this.setState({
        users
      })
    })
  }

  //Managing Search Logic
  //handleSearch = (text) => {
  //const newData = this.filteredData.filter(item => {
  //const itemData = `${item.name.toUpperCase()}`;
  //const textData = text.toUpperCase();
  //return itemData.indexOf(textData) > -1;
  //});
  //this.setState({
  //data: newData
  //});
  //};

  toggleSwitch = ({item, selected}) => {
    const alter = curry((selected, id, items) =>
      map(when(propEq('id', id), assoc('selected', selected)), items)
    )
    const users = alter(selected, item.id, this.state.users)
    this.setState({users})
    this.props.onChange(
      compose(
        pluck('id'),
        filter(propEq('selected', true))
      )(users)
    )
  }

  renderHeader = () => {
    const {t, i18n} = this.props
    return (
      <SearchBar
        round
        placeholder={t('common:searchBarText')}
        placeholderTextColor={'#95792A'}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInputText}
        //onChangeText={(text) => this.handleSearch(text)}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}) => (
    <ListItem
      roundAvatar
      title={`${item.name}`}
      titleStyle={styles.tableNameText}
      avatar={{uri: item.picture_url}}
      hideChevron={true}
      containerStyle={styles.container}
      switchButton
      switchOnTintColor={'#95792A'}
      switched={item.selected}
      onSwitch={selected => this.toggleSwitch({item, selected})}
    />
  )

  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }

  render() {
    return (
      <FlatList
        data={this.state.users}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}

export default withNamespaces(['common'], {wait: true})(FriendsList)

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
  }
})
