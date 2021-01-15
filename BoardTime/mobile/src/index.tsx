import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './data/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Utilizo Redux para mantener el estado de la applicación = store. 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// Para activar el service worker.
serviceWorker.register();
