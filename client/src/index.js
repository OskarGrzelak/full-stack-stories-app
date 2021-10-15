import React from 'react'
import ReactDOM from 'react-dom'
import { LoggedUserProvider } from './contexts/LoggedUser'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <LoggedUserProvider>
      <App />
    </LoggedUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
