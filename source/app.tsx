import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, AppStateProvider } from './providers'
import { Home, Dashboard, Ticket } from './views'

export const App: FunctionComponent = () => (
  <>
    <AppStateProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/ticket">
            <Ticket />
          </Route>
        </Router>
      </ThemeProvider>
    </AppStateProvider>
  </>
)
