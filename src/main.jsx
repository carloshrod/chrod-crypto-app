import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CoinsProvider } from './context/CoinsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CoinsProvider>
    <App />
  </CoinsProvider>
)
