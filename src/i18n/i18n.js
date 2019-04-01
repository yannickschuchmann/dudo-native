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
          friendsListText:
            'Acá están todos tus amigos de Facebook que tienen Dudo instalado',
          noFriendsText:
            'Al parecer ningún amigo tuyo tiene Dudo instalado. Invita a tus amigos por Whatsapp o Facebook',
          inviteFriends: 'Invita Amigos',
          tablesText: 'Mesas',
          createText: 'Crear',
          noTablesText: 'Aún no hay mesas.\nEmpieza por crear una nueva mesa!',
          logoutText: 'Cerrar Sesión',
          tableNamePlaceholder: 'Escribe el nombre de tu Mesa',
          startGame: 'Comenzar',
          loadingGame: 'Cargando',
          searchBarText: 'Busca en tu Lista de Amigos',
          login: {
            continueWithFacebook: 'Continua con Facebook',
            weDontPost: 'No posteamos en Facebook',
            loginFriends:
              'Haz login con Facebook para que puedas jugar con tus amigos'
          },
          lobby: {
            welcomeText: 'Estás en el Lobby',
            goToTables: 'A las Mesas',
            goToBattle: 'Juegos Batalla',
            vsOne: 'vs. 1',
            vsTwo: 'vs. 2',
            vsThree: 'vs .3',
            goBattle: 'A Jugar'
          },
          userCommunication: {
            dudoTitle: 'Dudo v1.0',
            buttonClick: 'Primero haz click en el Botón',
            buttonText: 'Como Usar Dudo',
            messageText:
              'Por favor síguenos en Facebook y dejanos tu opinión. Lo bueno y en especial lo malo, todo nos ayuda a mejorar. Iremos comunicando mejoras y avances.',
            thanksText: 'Gracias por la Ayuda!!',
            continueButton: 'Continuar',
            notShow: 'No mostar más este mensaje'
          },
          gameText: {
            diceAmount: 'Dados',
            roundNumber: 'Ronda',
            playerAmount: 'Jugando',
            playerSays: 'dice:',
            obligatedRound: 'Juego Obligado.\nNo puedes ver tus dados',
            waitingFor: 'Esperando a  {{player}}',
            wonTheGame: '{{player}} ganó!'
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
          friendsListText:
            'Here are all your Facebook friends that also have Dudo installed',
          noFriendsText:
            'It appears non of your friends have Dudo installed. Invite people through Whatsapp or Facebook',
          inviteFriends: 'Invite Friends',
          tablesText: 'Tables',
          createText: 'Create',
          noTablesText: 'No tables yet.\nStart by creating a new table!',
          logoutText: 'Log Out',
          tableNamePlaceholder: 'Write the name of your Table',
          startGame: 'Start',
          loadingGame: 'Loading',
          searchBarText: 'Search your Friends List',
          login: {
            continueWithFacebook: 'Continue with Facebook',
            weDontPost: 'We don’t post to Facebook.',
            loginFriends:
              'Login with Facebook so you can play with your friends.'
          },
          lobby: {
            welcomeText: "You're in the Lobby",
            goToTables: 'To the Tables',
            goToBattle: 'Battle Games',
            vsOne: 'vs. 1',
            vsTwo: 'vs. 2',
            vsThree: 'vs .3',
            goBattle: 'Go Play'
          },
          userCommunication: {
            dudoTitle: 'Dudo v1.0',
            buttonClick: 'First click the button',
            buttonText: 'How to use Dudo',
            messageText:
              'Please follow us on Facebook and give us your opinion. The good and especially the bad, anything helps us to improve. We will communicate improvements and progress.',
            thanksText: 'Thanks for the help!!',
            continueButton: 'Continue',
            notShow: "Don't show this message again"
          },
          gameText: {
            diceAmount: 'Dice',
            roundNumber: 'Round',
            playerAmount: 'Players',
            playerSays: 'says:',
            obligatedRound: "Obligated Round.\nYou can' see your dices",
            waitingFor: 'Waiting for {{player}}',
            wonTheGame: '{{player}} wins!'
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
          friendsListText:
            'Hier sind alle Ihre Facebook-Freunde, die auch Dudo installiert haben.',
          noFriendsText:
            'Es scheint, dass keiner Ihrer Freunde Dudo installiert haben. Laden Sie Ihre Freunde zu WhatsApp oder Facebook ein',
          inviteFriends: 'Freunde Einladen',
          tablesText: 'Tische',
          createText: 'Erstellen',
          noTablesText: 'Keine Tische gefunden.\nErstelle einen Tisch!',
          logoutText: 'Ausloggen',
          tableNamePlaceholder: 'Schreibe den Namen deiner Tisch',
          startGame: 'Beginnen',
          loadingGame: 'Speichern',
          searchBarText: 'Suche deine Freundesliste',
          login: {
            continueWithFacebook: 'Weiter mit Facebook',
            weDontPost: 'Wir posten keine Beiträge bei Facebook.',
            loginFriends:
              'Loggen Sie sich mit Facebook ein, um mit Ihren Freunden zu spielen.'
          },
          lobby: {
            welcomeText: 'Du bist in der Lobby',
            goToTables: 'Zu den Tischen',
            goToBattle: 'Kampfspiel',
            vsOne: 'vs. 1',
            vsTwo: 'vs. 2',
            vsThree: 'vs .3',
            goBattle: 'Geh Spielen'
          },
          userCommunication: {
            dudoTitle: 'Dudo v1.0',
            buttonClick: 'Klicken Sie zuerst auf die Taste',
            buttonText: 'Wie benutze ich Dudo?',
            messageText:
              'Folgen Sie uns auf Facebook und lassen Sie uns Ihre Meinung wissen. Das Gute und vor allem das Schlechte hilft uns, uns zu verbessern. Wir werden Verbesserungen und Fortschritte kommunizieren.',
            thanksText: 'Danke für die Hilfe!!',
            continueButton: 'Weitermachen',
            notShow: 'Diese Nachricht nicht mehr anzeigen'
          },
          gameText: {
            diceAmount: 'Würfel',
            roundNumber: 'Runden',
            playerAmount: 'Spieler',
            playerSays: 'sagt:',
            obligatedRound:
              'Obligatorisch Runde.\nDu kanst deine Würfel nichr sehen',
            waitingFor: 'Warten auf {{player}}',
            wonTheGame: '{{player}} hat gewonnen!'
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

    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  })

export default i18n
