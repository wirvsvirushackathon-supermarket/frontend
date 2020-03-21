import React, { FunctionComponent } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { useTheme } from '../../providers/theme/Theme'
import { SideDrawer, Map, SearchHeader } from '../../components'

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

export const Dashboard: FunctionComponent = () => {
  return (
    <div>
      {/* <SideDrawer PrimaryMenu={MainMenu} /> */}
      <SearchHeader />
      <Map />
    </div>
  )
}
