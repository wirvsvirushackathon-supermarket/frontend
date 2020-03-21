import React, { FunctionComponent } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'
import {
  InfoRounded,
  PermIdentityTwoTone,
  StorefrontTwoTone
} from '@material-ui/icons'
import { Route, useHistory } from 'react-router-dom'

import { SideDrawer, SearchHeader, Card, Overlay } from '../../components'
import { MapsApiProvider } from '../../providers'

export const useMainMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      paddingRight: theme.spacing(1),
      minWidth: 'auto'
    }
  })
)
const MainMenu: FunctionComponent = () => {
  const classes = useMainMenuStyles()
  const history = useHistory()

  const conf = [
    {
      text: 'So funktioniert es',
      icon: <InfoRounded />,
      href: '/overlay/info'
    },
    {
      text: 'Filialbesitzer registrieren',
      icon: <StorefrontTwoTone />,
      href: '/overlay/register'
    },
    {
      text: 'Login Filialbesitzer',
      icon: <PermIdentityTwoTone />,
      href: '/overlay/login'
    }
  ]
  return (
    <List>
      {conf.map(({ text, icon, href }) => (
        <ListItem
          onClick={() => {
            history.push(href)
          }}
          key={text}
          button
          href="/overlay/register"
        >
          <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )
}

export const Home: FunctionComponent = () => {
  return (
    <div>
      <MapsApiProvider>
        <SideDrawer PrimaryMenu={MainMenu} />
        <SearchHeader />
        <Route path="/overlay/info">
          <Overlay headerTitle="So funktioniert es">
            <p>some</p>
          </Overlay>
          <Overlay headerTitle="Für Filialbesitzer">
            <p>some</p>
          </Overlay>
        </Route>
      </MapsApiProvider>
      <Card />
    </div>
  )
}
