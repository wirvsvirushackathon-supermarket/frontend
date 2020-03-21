import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Dashboard } from './views'

export const App: FunctionComponent = () => (
  <Router>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
  </Router>
)
