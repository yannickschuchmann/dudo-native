import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Button, Container } from 'native-base'
import { Notifications } from 'expo'

import { Row, Col, Grid } from 'react-native-easy-grid'
import Modal from 'react-native-modalbox'
import { withNamespaces } from 'react-i18next'

import { compose, find, propEq } from 'ramda'

import GameTableHeader from '../components/Headers/GameTableHeader'
import PlayerCarousel from '../components/Game/PlayerCarousel'
import GameStatsComplete from '../components/Game/GameStatDisplay/GameStatsComplete'
import PlayDisplay from '../components/Game/TotalPlayComponent/PlayDisplay'
import CupButton from '../components/Game/CupButtonModals/CupButton'

import DiceCupModal from '../components/Game/CupButtonModals/DiceCupModal'

import DecisionMade from '../components/Game/EndOfRound/DecisionMade'
import TableDiceList from '../components/Game/EndOfRound/TableDiceList'

import api from '../services/api'

import { scaleFontSize } from '../helpers/responsive'
import { withGlobalState } from '../components/globalStateProvider'

class GameTable extends Component {
  state = {
    isLoading: false,
    isOpen: false,
    isDisabled: false,
    playIsLoading: null,
    moveError: false,
    diceCupOpen: false
  }


  static getDerivedStateFromProps(props, state) {
    const {tableId} = props.navigation.state.params
    const {isLoading} = props.globalState
    const table = props.globalState.tables[tableId]
    if (table !== state.table || isLoading !== state.isLoading) {
      return {
        table,
        isLoading
      }
    }
    return null
  }

  componentDidMount () {
    const { table } = this.state
    if (!table) {
      this.props.navigation.goBack()
      return
    }
    this.handleRoundEnd(table)
    this.handleHasSeen(table)
  }

  componentDidUpdate() {
    const {table} = this.state
    this.handleRoundEnd(table)
    this.handleHasSeen(table)
  }

  handleRoundEnd = table => {
    if (table.round_result && !table.meta.has_seen && this.refs.modalRoundEnd) {
      this.refs.modalRoundEnd.open()
    }
  }

  handleHasSeen = async table => {
    if (!table.meta.has_seen) {
      this.props.actions.setTableMeta(table.id, {has_seen: true})
    }
  }

  onUpdateTable = table => {
    this.props.actions.setTable(table)


  onAddToTable = () => {
    this.props.navigation.push('AddToTable', {
      table: this.state.table
    })
  }

  onModalClose = () => {}

  onMove = async value => {
    let isSuccess = false
    this.setState({ playIsLoading: value.type })
    try {
      const res = await api.post(`/api/tables/${this.state.table.id}/moves`, {
        value
      })
      isSuccess = true
    } catch (e) {}
    this.setState({ playIsLoading: null })
    return isSuccess
  }

  cupModalOpenClose = () => {
    if (!this.state.diceCupOpen) {
      this.setState({ diceCupOpen: true })
    } else {
      this.setState({ diceCupOpen: false })
    }
  }

  render() {
    const {isLoading, table} = this.state
    const {t} = this.props
    const currentPlayer = find(propEq('is_current', true), table.players)
    return (
      <Container style={styles.screenStyle}>
        <StatusBar hidden />
        <GameTableHeader onAddToTable={this.onAddToTable} table={table} />
        <Grid>
          <Row size={22}>
            <PlayerCarousel data={table.players} />
          </Row>
          <Row size={23}>
            <GameStatsComplete
              game={table.game}
              lastMove={table.last_move}
            />
          </Row>
          <Row size={40}>
            {isLoading ? (
              <ActivityIndicator
                size='small'
                color='#c8b273'
                style={styles.activityMonitor}
              />
            ) : table.meta.allowed_to_place_move ? (
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
          <Row Row size={15} style={styles.footerContainer}>
            <Col style={styles.footerColBack}>
              <Button
                style={styles.goBackButton}
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.goBackButtonText}>
                  {t('common:gameText:goBackTables')}
                </Text>
              </Button>
            </Col>
            <Col style={styles.footerColCupButton}>
              <CupButton
                onPress={
                  (() => this.cupModalOpenClose())
                }
              />
            </Col>
          </Row>
        </Grid>
        <DiceCupModal
          isOpen={this.state.diceCupOpen}
          tableData={table}
        />
        {table.round_result && (
          <Modal
            style={[
              styles.modalEndRound,
              table.round_result.status === 'regained' && styles.modalWin,
              table.round_result.status === 'lost' && styles.modalLose
            ]}
            position={'center'}
            onClosed={this.onModalClose}
            ref={'modalRoundEnd'}
            swipeToClose={false}
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
  withGlobalState,
  withNamespaces(['common'], { wait: true })
)(GameTable)

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'black'
  },
  activityMonitor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  footerContainer: {
    backgroundColor: 'black',
    borderTopColor: '#c8b273',
    borderTopWidth: 4,
    flexDirection: 'row'
  },
  footerColBack: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  goBackButton: {
    alignSelf: 'center',
    borderColor: '#c8b273',
    opacity: 1,
    borderWidth: 2,
    borderRadius: 5,
    padding: '3%'
  },
  goBackButtonText: {
    color: '#c8b273',
    fontSize: scaleFontSize(25),
    fontFamily: 'MyriadPro-BoldCond'
  },
  footerColCupButton: {
    flex: 1,
    justifyContent: 'center'
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
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: '#c8b273'
  }
})
