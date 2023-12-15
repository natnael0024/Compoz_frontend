import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './Context/authContext.jsx'

import {Provider} from 'react-redux'
import {store} from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
