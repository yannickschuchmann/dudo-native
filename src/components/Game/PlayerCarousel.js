import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {Avatar} from 'react-native-elements'
import {Card} from 'native-base'

import {scaleFontSize} from '../../helpers/responsive'

class PlayerCarousel extends Component {
  renderItem = ({item}) => (
    <Card
      style={[
        item.is_current ? styles.selectedPlayer : styles.notSelectedPlayer
      ]}
    >
      <Avatar
        containerStyle={{marginTop: '10%'}}
        medium
        source={{uri: item.picture_url}}
        rounded
      />
      <Text
        // TODO: reenable once https://github.com/expo/expo/issues/2382 is fixed
        // adjustsFontSizeToFit
        style={[
          item.is_current
            ? styles.selectedPlayerTitleText
            : styles.notSelectedPlayerTitleText
        ]}
      >
        {`${item.name}`}
      </Text>
    </Card>
  )

  render() {
    return (
      <View style={styles.listContiner}>
        <FlatList
          horizontal
          data={this.props.data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContiner: {
    flex: 1,
    backgroundColor: 'black'
  },
  notSelectedPlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: scaleFontSize(80),
    maxWidth: scaleFontSize(100),
    backgroundColor: 'black',
    borderColor: 'rgba(200,178,114,1)'
  },
  notSelectedPlayerTitleText: {
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'rgba(200,178,114,1)',
    fontSize: scaleFontSize(20)
  },
  selectedPlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: scaleFontSize(80),
    maxWidth: scaleFontSize(100),
    backgroundColor: 'rgba(200,178,114,1)',
    borderColor: '#95792A'
  },
  selectedPlayerTitleText: {
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'black',
    fontSize: scaleFontSize(20)
  }
})

export default PlayerCarousel
