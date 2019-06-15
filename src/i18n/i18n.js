import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import { Localization } from 'expo-localization'
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
            dudoTitle: 'Dudo v1.5',
            messageText:
              'Esta es una versión intermedia en la que ahora les entregamos estadísticas personales sobre su juego. Estos datos los pueden ver en su perfil. Donde también verás que hay más cosas en las que estamos trabajando que podrás disfrutar pronto.',
            continueButton: 'Continuar',
            notShow: 'No mostar más este mensaje'
          },
          profile: {
            personalTab: 'Personal',
            battleTab: 'Batalla',
            statistics: {
              totalGames: 'Partidos:',
              gamesWon: 'Triunfos:',
              winPercent: 'Porcentaje Ganado:',
              winLose: 'Ratio Ganado/Perdido:',
              dudoAcc: 'Certeza en Dudo:',
              calzoAcc: 'Certeza en Calzo:'
            },
            settings: {
              leftHand: 'Mano Izquierda',
              rightHand: 'Mano Derecha'
            },
            battleStats: {
              comingSoon: '¡PERFIL DE BATALLA LLEGA PRONTO!',
              goFacebookText:
                '¿Qué es perfil de batalla? Anda a nuestro grupo de Facebook para que te enteres y y nos digas que te gustaría ver ahí.',
              goFacebookButton: 'A Faceboook',
              iosMessage:
                ' Si tienes iOS y Safari tendrás que cambiar tus ajustes de Safari para que pueda abrir la página de Facebook. O solo busca a Dudo en Facebook.'
            }
          },
          gameText: {
            diceAmount: 'Dados',
            roundNumber: 'Ronda',
            playerAmount: 'Jugando',
            playerSays: 'dice:',
            obligatedRound: 'Juego Obligado.\nNo puedes ver tus dados',
            waitingFor: 'Esperando a  {{player}}',
            wonTheGame: '{{player}} ganó!',
            goBackTables: 'Volver'
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
            dudoTitle: 'Dudo v1.5',
            messageText:
              'This is an intermediate version in which we now give you personal statistics about your game. You can see this information in your profile. Where you will also see that there are more things that we are working on that you can enjoy soon.',
            notShow: "Don't show this message again",
            continueButton: 'Continue'
          },
          profile: {
            personalTab: 'Personal',
            battleTab: 'Battle',
            statistics: {
              totalGames: 'Games:',
              gamesWon: 'Wins:',
              winPercent: 'Win Percentage:',
              winLose: 'Win/Loss Ratio:',
              dudoAcc: 'Dudo Accuracy:',
              calzoAcc: 'Spot On Accuracy:'
            },
            settings: {
              leftHand: 'Left Hand',
              rightHand: 'Right Hand'
            },
            battleStats: {
              comingSoon: 'BATTLE PROFILE COMING SOON!',
              goFacebookText:
                'What is a battle profile? Go to our Facebook group so you can find out and tell us what you would like to see there.',
              goFacebookButton: 'Go To Faceboook',
              iosMessage:
                'If you have iOS and Safari you will have to change your Safari settings so that you can open the Facebook page. Or you can just look for Dudo in Facebook'
            }
          },
          gameText: {
            diceAmount: 'Dice',
            roundNumber: 'Round',
            playerAmount: 'Players',
            playerSays: 'says:',
            obligatedRound: "Obligated Round.\nYou can' see your dices",
            waitingFor: 'Waiting for {{player}}',
            wonTheGame: '{{player}} wins!',
            goBackTables: 'Back'
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
            goToBattle: 'Battlemode',
            vsOne: 'vs. 1',
            vsTwo: 'vs. 2',
            vsThree: 'vs .3',
            goBattle: 'Geh Spielen'
          },
          userCommunication: {
            dudoTitle: 'Dudo v1.5',
            messageText:
              'Dies ist eine Zwischenversion, in der wir Ihnen jetzt persönliche Statistiken über Ihr Spiel geben. Sie können diese Informationen in Ihrem Profil sehen. Wo Sie auch sehen werden, dass es weitere Dinge gibt, an denen wir arbeiten, die Sie bald genießen können.',
            notShow: 'Diese Nachricht nicht mehr anzeigen',
            continueButton: 'Fortsetzen'
          },
          profile: {
            personalTab: 'Persönlich',
            battleTab: 'Kampf',
            statistics: {
              totalGames: 'Spiele:',
              gamesWon: 'Siege:',
              winPercent: 'Gewinnprozentsatz:',
              winLose: 'Gewinn/Verlust-Verhältnis:',
              dudoAcc: 'Dudo-Genauigkeit:',
              calzoAcc: 'SpotOn-Genauigkeit:'
            },
            settings: {
              leftHand: 'Linke Hand',
              rightHand: 'Rechte Hand'
            },
            battleStats: {
              comingSoon: 'KAMPFPROFIL KOMMT BALD!',
              goFacebookText:
                'Was ist ein Kampfprofil? Besuchen Sie unsere Facebook-Gruppe, damit Sie herausfinden und uns mitteilen können, was Sie dort sehen möchten.',
              goFacebookButton: 'Gehe zu Facebook',
              iosMessage:
                'Wenn Sie iOS und Safari verwenden, müssen Sie Ihre Safari-Einstellungen ändern, damit Sie die Facebook-Seite öffnen können. Oder suchen Sie einfach bei Facebook nach Dudo'
            }
          },
          gameText: {
            diceAmount: 'Würfel',
            roundNumber: 'Runden',
            playerAmount: 'Spieler',
            playerSays: 'sagt:',
            obligatedRound:
              'Obligatorisch Runde.\nDu kanst deine Würfel nichr sehen',
            waitingFor: 'Warten auf {{player}}',
            wonTheGame: '{{player}} hat gewonnen!',
            goBackTables: 'Zuruck'
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
