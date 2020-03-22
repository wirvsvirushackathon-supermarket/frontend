import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, AppStateProvider } from './providers'
import { Home, ReservationOverview } from './views'

export const App: FunctionComponent = () => (
  <>
    <AppStateProvider>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Route exact path="/reservations">
            <ReservationOverview />
          </Route>
          <Route>
            <Home />
          </Route>
        </BrowserRouter>
      </ThemeProvider>
    </AppStateProvider>
  </>
)
