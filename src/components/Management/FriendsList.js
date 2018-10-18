import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, FlatList, View} from 'react-native'
import {ListItem, SearchBar} from 'react-native-elements'
import _ from 'lodash'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'
import api from '../../services/api'

export class FriendsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
    this.filteredData = []
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = () => {
    api.get(`/api/users`).then(res => {
      const users = res.data
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
  //Managing Selected Switch
  toggleSwitch = item => {
    item.selected
      ? this.setState({selected: false})
      : this.setState({selected: true})
  }

  //Rendering all list Components
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
      onSwitch={item => this.toggleSwitch(item)}
    />
  )
  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }
  //Main Render
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
