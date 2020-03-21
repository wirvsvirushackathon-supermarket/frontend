import React, { FunctionComponent } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { useTheme } from '../../providers/theme/Theme'
import { SideDrawer, SearchHeader } from '../../components'
import { MapsApiProvider, useAppState } from '../../providers'

const MainMenu: FunctionComponent = () => {
  const { setTheme, themes } = useTheme()

  return (
    <List>
      <ListItem button onClick={(): void => setTheme(themes.lightTheme)}>
        <ListItemText primary="Light theme" />
      </ListItem>
      <ListItem button onClick={(): void => setTheme(themes.darkTheme)}>
        <ListItemText primary="Dark theme" />
      </ListItem>
    </List>
  )
}

export const Home: FunctionComponent = () => {
  const { state } = useAppState()
  return (
    <div>
      <MapsApiProvider
        lat={state.userLocation.lat}
        lon={state.userLocation.lat}
      >
        <SideDrawer PrimaryMenu={MainMenu} />
        <SearchHeader />
      </MapsApiProvider>
    </div>
  )
}
