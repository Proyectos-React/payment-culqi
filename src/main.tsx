import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { store } from './store/store';
import { Payment } from './Payment';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <Payment /> */}
    </Provider>
  </React.StrictMode>,
)
