import React, {Component} from 'react'
import {Constants} from 'expo'
import {StyleSheet, StatusBar, Text, View, TouchableOpacity} from 'react-native'
import {Icon, Container, Footer} from 'native-base'

import {Row, Grid} from 'react-native-easy-grid'
import Modal from 'react-native-modalbox'
import {withNamespaces} from 'react-i18next'

import {compose, find, path, propEq} from 'ramda'

import GameTableHeader from '../components/Headers/GameTableHeader'
import PlayerCarousel from '../components/Game/PlayerCarousel'
import GameStatsComplete from '../components/Game/GameStatsComplete'
import PlayDisplay from '../components/Game/PlayDisplay'
import CupButton from '../components/Game/CupButton'

import DecisionMade from '../components/Game/EndOfRound/DecisionMade'
import TableDiceList from '../components/Game/EndOfRound/TableDiceList'

import api from '../services/api'

import {scaleFontSize} from '../helpers/responsive'
import {withAppState} from '../components/appStateProvider'

class GameTable extends Component {
  state = {
    isOpen: false,
    isDisabled: false
  }

  static getDerivedStateFromProps(props, state) {
    const {tableId} = props.navigation.state.params
    const table = props.appState.tables[tableId]
    if (table !== state.table) {
      return {
        table
      }
    }

    return null
  }

  componentDidMount() {
    const {table} = this.state
    if (!table) {
      this.props.navigation.goBack()
      return
    }

    this.handleHasSeen(table)
    this.handleHasSeenLastRoundResult(this.state.table)
  }

  handleHasSeen = async table => {
    if (!table.meta.has_seen) {
      try {
        await api.patch(`/api/tables/${table.id}/view`)
      } catch (e) {
        console.error(e)
      }
    }
  }

  handleHasSeenLastRoundResult = table => {
    /* if (!table.meta.has_seen_last_round_result) {
      this.props.navigation.push('RoundEnd')
    } */
  }

  renderDices() {
    const {cup} = this.state.table
    const diceIcons = []

    for (let type in cup) {
      for (let i = 0; i < cup[type]; i++) {
        diceIcons.push(
          <Icon
            style={styles.diceInCup}
            name={`dice-${type}`}
            type="MaterialCommunityIcons"
            key={`${type}-${i}`}
          />
        )
      }
    }
    return diceIcons
  }

  onUpdateTable = table => {
    this.props.actions.setTable(table)
  }

  onAddToTable = () => {
    this.props.navigation.push('AddToTable', {
      updateTable: this.onUpdateTable,
      table: this.state.table
    })
  }

  onMove = async value => {
    const res = await api.post(`/api/tables/${this.state.table.id}/moves`, {
      value
    })
    this.onUpdateTable(res.data)
  }

  //onPress={() => this.refs.modalRoundEnd.open()}

  render() {
    const {isDisabled, table} = this.state
    const {t} = this.props
    const currentPlayer = find(propEq('is_current', true), table.players)
    return (
      <Container>
        <Modal
          style={[styles.modal, styles.modalDiceInCup]}
          position={'center'}
          ref={'modalDiceInCup'}
          isDisabled={isDisabled}
        >
          {this.renderDices()}
        </Modal>
        <Modal
          style={[styles.modal, styles.modalRoundEnd]}
          position={'center'}
          ref={'modalRoundEnd'}
          swipeToClose={false}
          isDisabled={isDisabled}
        >
          <Grid>
            <Row size={30}>
              <DecisionMade />
            </Row>
            <Row size={55}>
              <TableDiceList />
            </Row>
            <Row size={15}>
              /*<TouchableOpacity
                style={styles.LangButtonSpanish}
                onPress={() => {
                  this.props.navigation.push('GameTable')
                }}
              >
                <Text style={styles.languageButtonText}>
                  {t('common:gameDecisions.continueGame')}
                </Text>
              </TouchableOpacity>*/
            </Row>
          </Grid>
        </Modal>
        <StatusBar hidden />
        <GameTableHeader
          onAddToTable={this.onAddToTable}
          onBack={() => this.props.navigation.goBack()}
          table={table}
        />
        <Grid>
          <Row size={27}>
            <PlayerCarousel data={table.players} />
          </Row>
          <Row size={25}>
            <GameStatsComplete game={table.game} lastMove={table.last_move} />
          </Row>
          <Row size={48}>
            {table.meta.allowed_to_place_move ? (
              <PlayDisplay
                onMove={this.onMove}
                game={table.game}
                lastMove={table.last_move}
              />
            ) : (
              <View style={styles.waitingContainer}>
                <Text style={styles.waitingText}>
                  {t('common:gameText:waitingFor', {
                    player: currentPlayer.name
                  })}
                </Text>
              </View>
            )}
          </Row>
        </Grid>
        <Footer style={styles.cupViewButtonContainer}>
          <CupButton onPress={() => this.refs.modalDiceInCup.open()} />
        </Footer>
      </Container>
    )
  }
}

export default compose(
  withAppState,
  withNamespaces(['common'], {wait: true})
)(GameTable)

const styles = StyleSheet.create({
  waitingContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  waitingText: {
    color: '#c8b273',
    fontSize: scaleFontSize(25),
    textAlign: 'center'
  },
  cupViewButtonContainer: {
    backgroundColor: 'black',
    borderTopColor: '#c8b273',
    borderTopWidth: 4,
    flex: 0.2
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  modalDiceInCup: {
    height: '70%',
    width: '90%'
  },
  modalRoundEnd: {
    height: '90%',
    width: '90%'
  },
  diceInCup: {
    color: 'rgba(200,178,115,1)',
    fontSize: scaleFontSize(65)
  },
  LangButtonSpanish: {
    height: scaleFontSize(50),
    backgroundColor: 'blue',
    width: '50%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,1)'
  },
  languageButtonText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    textAlign: 'center'
  }
})
