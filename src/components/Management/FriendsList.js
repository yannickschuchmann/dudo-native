import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  Share
} from 'react-native'
import {SearchBar} from 'react-native-elements'
import {Button} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'
import {assoc, compose, curry, filter, map, pluck, propEq, when} from 'ramda'

import {withNamespaces} from 'react-i18next'
import {cacheImages} from '../../helpers/caching'
import api from '../../services/api'
import FriendsItem from './FriendsItem'
import {scaleFontSize} from '../../helpers/responsive'

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

  renderList = () => (
    <Grid>
      <Row size={20}>
        <Text style={styles.friendsListText}>
          {this.props.t('common:friendsListText')}
        </Text>
      </Row>
      <Row size={65}>
        <FlatList
          data={this.filterByQuery(this.state.users)}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </Row>
      <Row size={15}>{this.renderInviteFriends()}</Row>
    </Grid>
  )

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'dudogames.com/play-now'
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message)
    }
  }

  renderInviteFriends = () => (
    <Button style={styles.createTableButton} onPress={this.onShare}>
      <Text style={styles.createButtonText}>
        {this.props.t('common:inviteFriends')}
      </Text>
    </Button>
  )

  renderNoFriends = () => (
    <Grid>
      <Row>
        <Text style={styles.textTest}>
          {this.props.t('common:noFriendsText')}
        </Text>
      </Row>
      <Row>{this.renderInviteFriends()}</Row>
    </Grid>
  )

  renderItem = ({item}) => (
    <FriendsItem item={item} toggleSwitch={this.toggleSwitch} />
  )

  renderSeparator = () => {
    return <View style={styles.itemSeparator} />
  }

  render() {
    const {isLoading, users} = this.state
    const {t, i18n} = this.props
    return isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#c8b273" />
      </View>
    ) : users.length > 0 ? (
      this.renderList()
    ) : (
      this.renderNoFriends()
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
  },
  createTableButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(149,121,42,1)',
    borderRadius: 10,
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  createButtonText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'white'
  },
  textTest: {
    fontSize: scaleFontSize(30),
    backgroundColor: 'transparent',
    color: '#C8B273',
    fontFamily: 'MyriadPro-BoldCond',
    padding: 5,
    textAlign: 'center'
  },
  friendsListText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: scaleFontSize(15),
    backgroundColor: 'transparent',
    color: '#C8B273',
    padding: '5%',
    textAlign: 'center'
  }
})
