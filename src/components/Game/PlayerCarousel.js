import React, { Component } from 'react'
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Card } from 'native-base'
import { pluck } from 'ramda'

import { cacheImages } from '../../helpers/caching'
import { scaleFontSize } from '../../helpers/responsive'

class PlayerCarousel extends Component {
  isUnmounted = false
  state = {
    isLoading: true
  }

  componentDidMount () {
    this.prefetchImages()
  }

  componentDidUpdate () {
    this.prefetchImages()
  }

  componentWillUnmount () {
    this.isUnmounted = true
  }

  prefetchImages = async () => {
    await cacheImages(pluck('picture_url', this.props.data))

    if (!this.isUnmounted) {
      this.setState({ isLoading: false })
    }
  }

  renderItem = ({ item }) => (
    <Card
      style={[
        styles.basePlayer,
        item.is_current && styles.currentPlayer,
        !item.is_active && styles.nonActivePlayer
      ]}
    >
      <Avatar
        containerStyle={{ marginTop: '10%' }}
        medium
        source={{ uri: item.picture_url }}
        rounded
      />
      <Text
        // TODO: reenable once https://github.com/expo/expo/issues/2382 is fixed
        adjustsFontSizeToFit
        style={[
          styles.basePlayerText,
          item.is_current && styles.currentPlayerText,
          !item.is_active && styles.nonActivePlayerText
        ]}
      >
        {`${item.name}`}
      </Text>
    </Card>
  )

  render () {
    return (
      <View style={styles.listContiner}>
        {this.state.isLoading ? (
          <ActivityIndicator size='small' color='#c8b273' />
        ) : (
          <FlatList
            horizontal
            data={this.props.data}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderItem}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  basePlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: scaleFontSize(80),
    maxWidth: scaleFontSize(100),
    backgroundColor: 'transparent',
    borderColor: '#d96004',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2
  },
  basePlayerText: {
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    color: '#F58B27',
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    width: '100%'
  },
  currentPlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: scaleFontSize(80),
    maxWidth: scaleFontSize(100),
    backgroundColor: '#F58B27',
    borderColor: 'white',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 2
  },
  currentPlayerText: {
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    color: 'black',
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    width: '100%'
  },
  nonActivePlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: scaleFontSize(80),
    maxWidth: scaleFontSize(100),
    backgroundColor: 'grey',
    borderColor: '#d96004'
  },
  nonActivePlayerText: {
    fontFamily: 'Bangers-Regular',
    textAlign: 'center',
    color: 'black',
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    width: '100%'
  }
})

export default PlayerCarousel
