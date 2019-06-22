import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import {Button, Icon, Container, Footer} from 'native-base'
import {Notifications} from 'expo'

import {Row, Col, Grid} from 'react-native-easy-grid'
import Modal from 'react-native-modalbox'
import {withNamespaces} from 'react-i18next'

import {compose, find, propEq} from 'ramda'

import GameTableHeader from '../components/Headers/GameTableHeader'
import PlayerCarousel from '../components/Game/PlayerCarousel'
import GameStatsComplete from '../components/Game/GameStatDisplay/GameStatsComplete'
import PlayDisplay from '../components/Game/TotalPlayComponent/PlayDisplay'
import GameTableFooter from '../components/Game/CupButtonModals/GameTableFooter'
import CupButton from '../components/Game/CupButtonModals/CupButton'
import DiceCupModal from '../components/Game/CupButtonModals/DiceCupModal'

import DecisionMade from '../components/Game/EndOfRound/DecisionMade'
import TableDiceList from '../components/Game/EndOfRound/TableDiceList'

import api from '../services/api'

import {scaleFontSize} from '../helpers/responsive'
import {withGlobalState} from '../components/globalStateProvider'

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

  onAddToTable = () => {
    this.props.navigation.push('AddToTable', {
      table: this.state.table
    })
  }

  onModalClose = () => {}

  onMove = async value => {
    let isSuccess = false
    this.setState({playIsLoading: value.type})
    try {
      const res = await api.post(`/api/tables/${this.state.table.id}/moves`, {
        value
      })
      isSuccess = true
    } catch (e) {}
    this.setState({playIsLoading: null})
    return isSuccess
  }
  cupModalOpenClose = () => {
    if (!this.state.diceCupOpen) {
      this.setState({diceCupOpen: true})
    } else {
      this.setState({diceCupOpen: false})
    }
  }
  render() {
    const {isLoading, table} = this.state
    const {t, navigation} = this.props
    const currentPlayer = find(propEq('is_current', true), table.players)
    const backgroundImage = '../assets/screen-background.jpg'
    return (
      <ImageBackground
        source={require(backgroundImage)}
        style={styles.root}
      >
        <Container style={styles.container}>
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
                  size="small"
                  color="#F58B27"
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
              <GameTableFooter
                navigation={navigation}
                onPress={this.cupModalOpenClose}
              />
            </Row>
          </Grid>
          <DiceCupModal isOpen={this.state.diceCupOpen} tableData={table} />
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
      </ImageBackground>
    )
  }
}

export default compose(
  withGlobalState,
  withNamespaces(['common'], {wait: true})
)(GameTable)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  activityMonitor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  waitingContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  waitingText: {
    color: 'white',
    fontSize: scaleFontSize(25),
    fontFamily: 'Bangers-Regular',
    textAlign: 'center'
  },
  footerContainer: {
    backgroundColor: 'transparent',
    borderTopColor: '#F58B27',
    borderTopWidth: 2,
    flexDirection: 'row'
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
    fontFamily: 'Bangers-Regular',
    color: 'white',
    textAlign: 'center'
  },
  icon: {
    fontSize: scaleFontSize(30),
    color: '#c8b273'
  }
})
