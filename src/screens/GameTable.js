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
    isDisabled: false,
    playIsLoading: null
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

    this.handleRoundEnd(table)
    this.handleHasSeen(table)
  }

  componentDidUpdate() {
    const {table} = this.state

    this.handleHasSeen(table)
    this.handleRoundEnd(table)
  }

  handleRoundEnd = table => {
    if (table.round_result && this.refs.modalRoundEnd) {
      this.refs.modalRoundEnd.open()
    }
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
    this.setState({playIsLoading: value.type})
    try {
      const res = await api.post(`/api/tables/${this.state.table.id}/moves`, {
        value
      })
      this.onUpdateTable(res.data)
    } catch (e) {}
    this.setState({playIsLoading: null})
  }

  render() {
    const {isDisabled, table} = this.state
    const {t} = this.props
    const currentPlayer = find(propEq('is_current', true), table.players)
    return (
      <Container style={styles.screenStyle}>
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
                playIsLoading={this.state.playIsLoading}
                onMove={this.onMove}
                game={table.game}
                allowedToDudoCalzo={table.meta.allowed_to_dudo_calzo}
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
        <Modal
          style={styles.modalDiceInCup}
          position={'center'}
          ref={'modalDiceInCup'}
          isDisabled={isDisabled}
        >
          {table.meta.is_active && table.cup ? (
            this.renderDices()
          ) : (
            <Text style={styles.waitingText}>
              {t('common:gameText:obligatedRound')}
            </Text>
          )}
        </Modal>
        {table.round_result && (
          <Modal
            style={[
              styles.modalEndRound,
              table.round_result.status === 'regained' && styles.modalWin,
              table.round_result.status === 'lost' && styles.modalLose
            ]}
            position={'center'}
            ref={'modalRoundEnd'}
            swipeToClose={false}
            isDisabled={isDisabled}
          >
            <Grid>
              <Row size={30}>
                <DecisionMade {...table.round_result} />
              </Row>
              <Row size={55}>
                <TableDiceList cups={table.round_result.cups} />
              </Row>
              <Row size={15} style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.refs.modalRoundEnd.close()}
                  style={styles.continueButton}
                >
                  <Text style={styles.continueButtonText}>
                    {t('common:gameDecisions.continueGame')}
                  </Text>
                </TouchableOpacity>
              </Row>
            </Grid>
          </Modal>
        )}
      </Container>
    )
  }
}

export default compose(
  withAppState,
  withNamespaces(['common'], {wait: true})
)(GameTable)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  },
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
  modalEndRound: {
    height: '90%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWin: {
    backgroundColor: 'rgba(0,255,0,0.45)'
  },
  modalLose: {
    backgroundColor: 'rgba(255,0,0,0.45)'
  },
  modalDiceInCup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '70%',
    width: '90%'
  },
  diceInCup: {
    color: 'rgba(200,178,115,1)',
    fontSize: scaleFontSize(65)
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButton: {
    height: scaleFontSize(40),
    backgroundColor: 'blue',
    width: '40%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255,255,255,1)'
  },
  continueButtonText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'MyriadPro-BoldCond',
    color: 'white',
    textAlign: 'center'
  }
})
