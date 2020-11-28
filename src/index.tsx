import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const render = () => {
  const App = require('./App.tsx').default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
