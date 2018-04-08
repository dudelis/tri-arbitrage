import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'

import MainRouter from './routers/MainRouter';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <MainRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));