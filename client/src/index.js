import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import App from './App';

const store = createStore(compose(applyMiddleware(thunk)));

ReactDOM.render( <App />, document.getElementById('root'));

