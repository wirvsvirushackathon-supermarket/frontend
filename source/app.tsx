import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Map } from './components'

export const App: React.FC = () => (
  <Router>
    <Route path="/">
      <Map />
    </Route>
  </Router>
)
