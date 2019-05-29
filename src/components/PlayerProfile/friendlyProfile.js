import React, {Component} from 'react'
import {Text, Image, StyleSheet} from 'react-native'
import {Row, Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'
import {scaleFontSize} from '../../helpers/responsive'

class FriendlyProfile extends Component {
  render() {
    const {t, name, pic, friendlyStats} = this.props
    return (
      <Col style={{flex: 1}}>
        <Row style={styles.rowContainer} size={20}>
          <Image source={{uri: pic}} style={styles.image} />
          <Row>
            <Text style={styles.statText}>{name}</Text>
          </Row>
        </Row>
        <Row size={20} style={styles.rowContainer}>
          <Text style={styles.statText}>
            {t('common:profile.friendlyStats.winPercent')}{' '}
            {Math.round(
              (friendlyStats.matchesWon / friendlyStats.totalMatches) * 100
            )}
            %
          </Text>
        </Row>
        <Row size={20} style={styles.rowContainer}>
          <Text style={styles.statText}>
            {t('common:profile.friendlyStats.winLose')}{' '}
            {(
              friendlyStats.matchesWon /
              (friendlyStats.totalMatches - friendlyStats.matchesWon)
            ).toFixed(2)}
          </Text>
        </Row>
        <Row size={20} style={styles.rowContainer}>
          <Text style={styles.statText}>
            {t('common:profile.friendlyStats.dudoAcc')}{' '}
            {Math.round(
              (friendlyStats.rightDudo /
                (friendlyStats.rightDudo + friendlyStats.wrongDudo)) *
                100
            )}
            %
          </Text>
        </Row>
        <Row size={20} style={styles.rowContainer}>
          <Text style={styles.statText}>
            {t('common:profile.friendlyStats.regainAcc')}{' '}
            {Math.round(
              (friendlyStats.diceRegain / friendlyStats.totalRegain) * 100
            )}
            %
          </Text>
        </Row>
      </Col>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    margin: scaleFontSize(5),
    flex: 1,
    alignItems: 'center',
    opacity: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  statText: {
    color: 'white',
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond',
    margin: scaleFontSize(10)
  },
  image: {
    margin: scaleFontSize(10),
    height: scaleFontSize(60),
    width: scaleFontSize(60),
    borderRadius: scaleFontSize(4)
  }
})

export default withNamespaces(['common'], {wait: true})(FriendlyProfile)
