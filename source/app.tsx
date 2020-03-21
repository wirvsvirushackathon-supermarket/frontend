import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, AppStateProvider } from './providers'
import { Home } from './views'

export const App: FunctionComponent = () => (
  <>
    <AppStateProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
        </Router>
      </ThemeProvider>
    </AppStateProvider>
  </>
)
