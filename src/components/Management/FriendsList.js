import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, FlatList, View} from 'react-native'
import {SearchBar} from 'react-native-elements'
import {
  assoc,
  compose,
  curry,
  filter,
  map,
  pluck,
  propEq,
  when
} from 'ramda'

import {withNamespaces} from 'react-i18next'
import {cacheImages} from '../../helpers/caching'
import api from '../../services/api'
import FriendsItem from './FriendsItem'

export class FriendsList extends Component {
  isUnmounted = false
  static defaultProps = {
    players: []
  }
  state = {
    isLoading: true,
    users: [],
    query: ''
  }

  componentDidMount() {
    this.fetchUsers()
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  fetchUsers = async () => {
    const res = await api.get(`/api/users`)
    const skippingIds = pluck('id', this.props.players)
    const users = filter(user => !skippingIds.includes(user.id), res.data)

    if (!this.isUnmounted) {
      this.setState({
        isLoading: false,
        users
      })
    }
  }

  //Managing Search Logic
  handleSearch = query => {
    this.setState({
      query
    })
  }

  filterByQuery = () =>
    this.state.users.filter(user => {
      const name = user.name.toLowerCase()
      const query = this.state.query.toLowerCase()
      return name.indexOf(query) > -1
    })

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
        onChangeText={this.handleSearch}
        autoCorrect={false}
      />
    )
  }

  renderItem = ({item}) => (
    <FriendsItem item={item} />
  )

  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }

  render() {
    const {isLoading, users} = this.state
    return isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#c8b273" />
      </View>
    ) : (
      <FlatList
        data={this.filterByQuery(users)}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    backgroundColor: '#95792A'
  },
  searchInputText: {
    color: 'black',
    backgroundColor: '#C8B273'
  },
  itemSeparator: {
    height: 1,
    width: '86%',
    backgroundColor: '#c8b273',
    marginLeft: '14%'
  }
})
