import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './app'
import Modal from 'react-modal';

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
      </React.StrictMode>
  </Router>
)
