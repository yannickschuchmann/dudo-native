import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  Share
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Button } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'
import { assoc, compose, curry, filter, map, pluck, propEq, when } from 'ramda'

import { withNamespaces } from 'react-i18next'
import api from '../../services/api'
import FriendsItem from './FriendsItem'
import { scaleFontSize } from '../../helpers/responsive'

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

         componentDidMount () {
           this.fetchUsers()
         }

         componentWillUnmount () {
           this.isUnmounted = true
         }

         fetchUsers = async () => {
           const res = await api.get(`/api/users`)
           const skippingIds = pluck('id', this.props.players)
           const users = filter(
             user => !skippingIds.includes(user.id),
             res.data
           )

           if (!this.isUnmounted) {
             this.setState({
               isLoading: false,
               users
             })
           }
         }

         // Managing Search Logic
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

         toggleSwitch = ({ item, selected }) => {
           const alter = curry((selected, id, items) =>
             map(
               when(propEq('id', id), assoc('selected', selected)),
               items
             )
           )
           const users = alter(selected, item.id, this.state.users)
           this.setState({ users })
           this.props.onChange(
             compose(
               pluck('id'),
               filter(propEq('selected', true))
             )(users)
           )
         }

         renderHeader = () => {
           const { t, i18n } = this.props
           return (
             <SearchBar
               round
               placeholder={t('common:searchBarText')}
               searchIcon={false}
               placeholderTextColor={'black'}
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
             <Row size={15} style={styles.buttonContainer}>
               {this.renderInviteFriends()}
             </Row>
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
           <Button
             style={styles.inviteFriendButton}
             onPress={this.onShare}
           >
             <Text style={styles.inviteFriendText}>
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

         renderItem = ({ item }) => (
           <FriendsItem item={item} toggleSwitch={this.toggleSwitch} />
         )

         renderSeparator = () => {
           return <View style={styles.itemSeparator} />
         }

         render () {
           const { isLoading, users } = this.state
           return isLoading ? (
             <View style={styles.loadingContainer}>
               <ActivityIndicator size='small' color='#F58B27' />
             </View>
           ) : users.length > 0 ? (
             this.renderList()
           ) : (
             this.renderNoFriends()
           )
         }
}

export default withNamespaces(['common'], { wait: true })(FriendsList)

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    backgroundColor: '#F58B27'
  },
  searchInputText: {
    color: 'black',
    backgroundColor: '#f5ab65'
  },
  itemSeparator: {
    height: 1,
    width: '86%',
    backgroundColor: '#F58B27',
    marginLeft: '14%'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inviteFriendButton: {
    flex: 0.6,
    justifyContent: 'center',
    backgroundColor: '#F58B27',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2
  },
  inviteFriendText: {
    fontSize: scaleFontSize(30),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    color: 'black'
  },
  textTest: {
    fontSize: scaleFontSize(30),
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: 'Bangers-Regular',
    padding: 5,
    textAlign: 'center'
  },
  friendsListText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: scaleFontSize(18),
    backgroundColor: 'transparent',
    color: 'white',
    padding: '5%',
    textAlign: 'center',
    fontFamily: 'Bangers-Regular'
  }
})
