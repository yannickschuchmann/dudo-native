import React, { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Row, Col } from 'react-native-easy-grid'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

const StatisticRow = ({ children }) => (
  <Row size={20} style={styles.rowContainer}>
    <Text style={styles.statText}>
      {children}
    </Text>
  </Row>
)

class FriendlyProfile extends Component {
  render () {
    const { t, name, pic, statistics } = this.props

    const winPercent = Math.round(
      (statistics.games_won / statistics.total_games) * 100
    )
    const winLose = (
      statistics.games_won /
      (statistics.total_games - statistics.games_won)
    ).toFixed(2)
    const dudoAcc = Math.round(
      (statistics.correct_dudo /
        statistics.total_dudo) *
        100
    )
    const calzoAcc = Math.round(
      (statistics.correct_calzo / statistics.total_calzo) * 100
    )

    return (
      <Col style={{ flex: 1 }}>
        <Row style={styles.rowContainer} size={20}>
          <Image source={{ uri: pic }} style={styles.image} />
          <Row>
            <Text style={styles.statText}>{name}</Text>
          </Row>
        </Row>
        <Row>
          <StatisticRow>
            {t('common:profile.statistics.totalGames')}{' '}
            {statistics.total_games}
          </StatisticRow>
          <StatisticRow>
            {t('common:profile.statistics.gamesWon')} {statistics.games_won}
          </StatisticRow>
        </Row>
        <StatisticRow>
          {t('common:profile.statistics.winPercent')} {winPercent} %
        </StatisticRow>
        <StatisticRow>
          {t('common:profile.statistics.winLose')} {winLose}
        </StatisticRow>
        <StatisticRow>
          {t('common:profile.statistics.dudoAcc')} {dudoAcc} %
        </StatisticRow>
        <StatisticRow>
          {t('common:profile.statistics.calzoAcc')} {calzoAcc} %
        </StatisticRow>
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
    height: scaleFontSize(40),
    width: scaleFontSize(40),
    borderRadius: scaleFontSize(4)
  }
})

export default withNamespaces(['common'], { wait: true })(FriendlyProfile)
