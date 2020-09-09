import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index'
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import devTools from "remote-redux-devtools";
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from "redux-persist";
import watcherSaga from './saga/testSaga';


const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialiseSagaMiddleware = createSagaMiddleware();
export default function configureStore(onCompletion) {
  const enhancer = compose(
    applyMiddleware(initialiseSagaMiddleware, logger),
    devTools({
      name: "TestApp",
      realtime: true
    })
  );

  let store = createStore(persistedReducer, enhancer);
  // let persistor = persistStore(store, null, onCompletion);
  initialiseSagaMiddleware.run(watcherSaga);
  return store;
}