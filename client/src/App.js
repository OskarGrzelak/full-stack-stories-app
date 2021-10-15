import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import Home from './pages/Home'
import Login from './pages/Login'
import Story from './pages/Story'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/story/:storyId">
            <Story />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
