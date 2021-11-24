import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
