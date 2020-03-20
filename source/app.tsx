import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export const App: React.FC = () => (
  <Router>
    <Route path="/">
      <p>Supermarket Frontend</p>
    </Route>
  </Router>
)
