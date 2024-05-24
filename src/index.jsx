import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import { App } from './App.jsx';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename="chat-zapchaztiulka">
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
