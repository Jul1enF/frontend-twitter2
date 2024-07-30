import '../styles/globals.css';
import Head from 'next/head';
import {Provider} from 'react-redux'

import user from '../reducers/user'
import tweets from '../reducers/tweets'

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({ user, tweets });
const persistConfig = { key: 'twitter 2', storage };

const store = configureStore({
 reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});


const persistor = persistStore(store);
function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Head>
        <title>Twitter 2</title>
      </Head>
      <Component {...pageProps} />
        </PersistGate>
      </Provider>
      
    </>
  );
}

export default App;
