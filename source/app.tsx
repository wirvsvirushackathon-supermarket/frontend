import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from './providers/theme/Theme'
import { Home, Dashboard } from './views'

export const App: FunctionComponent = () => (
  <>
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Router>
    </ThemeProvider>
  </>
)
