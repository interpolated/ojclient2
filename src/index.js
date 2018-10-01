import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers_index';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

window.store =  store



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
