import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export const App: FunctionComponent = () => (
  <Router>
    <Route path="/">
      <p>Supermarket Frontend</p>
    </Route>
  </Router>
)
