import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {List, Avatar} from 'react-native-elements'
import {Card} from 'native-base'

class PlayerCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          name: 'Yannick',
          player_id: 123,
          picture:
            'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/c0.13.160.160/p160x160/10013506_783540128324222_6920844401721358352_n.jpg?_nc_cat=102&oh=eb030be13293f9de19f31145990f7da0&oe=5C2053F9',
          is_current: false,
          is_active: true
        },
        {
          name: 'Sergio',
          player_id: 231,
          picture:
            'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/p160x160/26231447_10154919482157587_2724721708290940515_n.jpg?_nc_cat=108&oh=597f636a7738be6d0d25ae1b17b51255&oe=5C1D5FDC',
          is_current: false,
          is_active: true
        },
        {
          name: 'John',
          player_id: 2131,
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/John_Oliver_November_2016.jpg/220px-John_Oliver_November_2016.jpg',
          is_current: true,
          is_active: true
        },
        {
          name: 'Andrea',
          player_id: 6456,
          picture:
            'https://www.wilsoncenter.org/sites/default/files/andrea_tanco_0.jpg',
          is_current: false,
          is_active: true
        },
        {
          name: 'Timo',
          player_id: 42,
          picture:
            'https://tmssl.akamaized.net/images/portrait/originals/170527-1471002206.jpg',
          is_current: false,
          is_active: true
        },
        {
          name: 'Janina',
          player_id: 3452,
          picture:
            'https://ngin-food.com/wp-content/uploads/45/69/45697527de561eabbe38e8de876547d1.jpg',
          is_current: false,
          is_active: true
        }
      ]
    }
  }
  _renderItem = ({item}) => (
    <Card
      style={[
        item.is_current ? styles.selectedPlayer : styles.notSelectedPlayer
      ]}
    >
      <Avatar
        containerStyle={{marginTop: '10%'}}
        medium
        source={{uri: item.picture}}
        rounded
      />
      <Text
        adjustsFontSizeToFit
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
          data={this.state.data}
          keyExtractor={item => item.player_id.toString()}
          renderItem={this._renderItem}
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
  notSelectedPlayerTitleText: {
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'rgba(200,178,114,1)',
    fontSize: 20
  },
  selectedPlayerTitleText: {
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'black',
    fontSize: 20
  },
  notSelectedPlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 80,
    maxWidth: 100,
    backgroundColor: 'black',
    borderColor: 'rgba(200,178,114,1)'
  },
  selectedPlayer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 80,
    maxWidth: 100,
    backgroundColor: 'rgba(200,178,114,1)',
    borderColor: '#95792A'
  }
})

export default PlayerCarousel
