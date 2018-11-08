import React, {Component} from 'react'
import {Constants} from 'expo'
import {ActivityIndicator, StyleSheet, FlatList, View} from 'react-native'
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
import {cacheImages} from '../../helpers/caching'
import api from '../../services/api'

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

    await cacheImages(pluck('picture_url', users))
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
    <ListItem
      roundAvatar
      title={`${item.name}`}
      titleStyle={styles.tableNameText}
      avatar={{uri: item.picture_url}}
      hideChevron={true}
      containerStyle={styles.container}
      switchButton
      trackColor={'#95792A'}
      switched={item.selected}
      onSwitch={selected => this.toggleSwitch({item, selected})}
    />
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
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
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
  tableNameText: {
    color: '#c8b273',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(20)
  },
  itemSeparator: {
    height: 1,
    width: '86%',
    backgroundColor: '#c8b273',
    marginLeft: '14%'
  }
})
