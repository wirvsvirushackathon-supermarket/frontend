import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App: React.FC = () => (
  <Router>
    <Route path="/">
      <p>Supermarket Frontend</p>
    </Route>
  </Router>
)

export default App
