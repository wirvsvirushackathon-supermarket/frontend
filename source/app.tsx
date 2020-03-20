import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const a = {
  a: 1,
  b: 2
}

console.log(a)

export const App: React.FC = () => (
  <Router>
    <Route path="/">
      <p>Supermarket Frontend</p>
    </Route>
  </Router>
)
