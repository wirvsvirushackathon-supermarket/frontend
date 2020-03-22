import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, AppStateProvider } from './providers'
import { Home, ReservationOverview, WipPage } from './views'
import { Overlay } from './components'

export const App: FunctionComponent = () => (
  <>
    <AppStateProvider>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/reservations">
              <Overlay headerTitle="Deine Reservierungen" show>
                <ReservationOverview />
              </Overlay>
            </Route>
            <Route path="/wip">
              <WipPage />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AppStateProvider>
  </>
)
