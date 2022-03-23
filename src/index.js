import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/scss/auth.scss'
import './assets/scss/spinner.css'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);