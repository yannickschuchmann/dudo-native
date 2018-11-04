import i18n from 'i18next'
import {reactI18nextModule} from 'react-i18next'
import {Localization} from 'expo-localization'
import deviceStorage from '../services/deviceStorage'

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async callback => {
    // changed language if set by user otherwise device default language
    const lng = (await deviceStorage.getItem('lng')) || Localization.locale
    callback(lng.replace('_', '-'))
  },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',

    resources: {
      es: {
        common: {
          tablesText: 'Mesas',
          createText: 'Crear',
          logoutText: 'Cerrar Sesión',
          tableNamePlaceholder: 'Escribe el nombre de tu Mesa',
          startGame: 'Comenzar',
          searchBarText: 'Busca en tu Lista de Amigos',
          gameText: {
            diceAmount: 'Dados',
            roundNumber: 'Ronda',
            playerAmount: 'Jugando',
            playerSays: 'dice:',
            waitingFor: 'Esperando a  {{player}}'
          },
          playButtons: {
            playButtonText: 'Jugar',
            dudoButtonText: 'Dudo',
            spotOnButtonText: 'Calzo!'
          },
          gameDecisions: {
            spotOnText: 'Calzó',
            doubtItText: 'Dudó',
            winnerText: 'Ganó',
            loserText: 'Pierde',
            totalText: 'Total',
            continueGame: 'Continuar'
          },
          actions: {
            toggleToSpanish: 'Español',
            toggleToGerman: 'Alemán',
            toggleToEnglish: 'Inglés'
          }
        }
      },
      en: {
        common: {
          tablesText: 'Tables',
          createText: 'Create',
          logoutText: 'Log Out',
          tableNamePlaceholder: 'Write the name of your Table',
          startGame: 'Start',
          searchBarText: 'Search your Friends List',
          gameText: {
            diceAmount: 'Dice',
            roundNumber: 'Round',
            playerAmount: 'Players',
            playerSays: 'says:',
            obligatedRound: "Obligated Round.\nYou can' see your dices",
            waitingFor: 'Waiting for {{player}}'
          },
          playButtons: {
            playButtonText: 'Play',
            dudoButtonText: 'Doubt It',
            spotOnButtonText: 'Spot On!'
          },
          gameDecisions: {
            spotOnText: 'Believes',
            doubtItText: 'Doubts',
            winnerText: 'Wins',
            loserText: 'Loses',
            totalText: 'Total',
            continueGame: 'Continue'
          },
          actions: {
            toggleToSpanish: 'Spanish',
            toggleToGerman: 'German',
            toggleToEnglish: 'English'
          }
        }
      },
      de: {
        common: {
          tablesText: 'Tische',
          createText: 'Erstellen',
          logoutText: 'Ausloggen',
          tableNamePlaceholder: 'Schreibe den Namen deiner Tisch',
          startGame: 'Beginnen',
          searchBarText: 'Suche deine Freundesliste',
          gameText: {
            diceAmount: 'Würfel',
            roundNumber: 'Runden',
            playerAmount: 'Spieler',
            playerSays: 'sagt:',
            waitingFor: 'Warten auf {{player}}'
          },
          playButtons: {
            playButtonText: 'Spiel',
            dudoButtonText: 'Bezweifel es',
            spotOnButtonText: 'Spot On!'
          },
          gameDecisions: {
            spotOnText: 'Glaubt',
            doubtItText: 'Bezweifelt',
            winnerText: 'Gewinnt',
            loserText: 'Verliert',
            totalText: 'Gesamt',
            continueGame: 'Fortsetzen'
          },
          actions: {
            toggleToSpanish: 'Spanisch',
            toggleToGerman: 'Deutsch',
            toggleToEnglish: 'Englisch'
          }
        }
      }
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  })

export default i18n
