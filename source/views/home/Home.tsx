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
import { useLocation, useHistory } from 'react-router-dom'

import {
  SideDrawer,
  SearchHeader,
  Card,
  Overlay,
  About,
  RegistrationForm
} from '../../components'
import { MapsApiProvider, useAppState } from '../../providers'

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

  const { state, setAppState } = useAppState()

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
            setAppState({ ...state, sidebarVisible: false })
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
  const location = useLocation()
  const conf = [
    {
      path: '/overlay/info',
      title: 'So funktioniert es',
      component: <About />
    },
    {
      path: '/overlay/register',
      title: 'Filiale anmelden',
      component: <RegistrationForm />
    }
  ]
  return (
    <div>
      <MapsApiProvider>
        <SideDrawer PrimaryMenu={MainMenu} />
        <SearchHeader />
        {conf.map(({ path, title, component }) => (
          <Overlay
            key={path}
            show={location.pathname === path}
            headerTitle={title}
          >
            {component}
          </Overlay>
        ))}
      </MapsApiProvider>
      <Card />
    </div>
  )
}
