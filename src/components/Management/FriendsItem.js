import React from 'react'
import {StyleSheet} from 'react-native'
import {scaleFontSize} from '../../helpers/responsive'
import {ListItem} from 'react-native-elements'

export default class FriendsItem extends React.Component {
  state = {hasError: false}

  componentDidCatch(error, info) {
    this.setState({hasError: true})
  }

  render() {
    const {item} = this.props
    return (
      <ListItem
        roundAvatar
        title={`${item.name}`}
        titleStyle={styles.tableNameText}
        avatar={this.state.hasError ? null : {uri: item.picture_url}}
        hideChevron={true}
        containerStyle={styles.container}
        switchButton
        switched={item.selected}
        onSwitch={selected => this.props.toggleSwitch({item, selected})}
      />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  tableNameText: {
    color: 'white',
    fontFamily: 'Bangers-Regular',
    fontSize: scaleFontSize(20),
  }
})
