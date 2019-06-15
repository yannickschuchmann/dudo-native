import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { settingsReducer } from './reducers'

const rootReducer = combineReducers({
  switchValue: settingsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer)
export const persistor = persistStore(store)
