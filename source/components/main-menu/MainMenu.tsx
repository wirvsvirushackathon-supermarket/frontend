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
import { useHistory } from 'react-router-dom'
import { useAppState } from '../../providers'

const useMainMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      paddingRight: theme.spacing(1),
      minWidth: 'auto'
    }
  })
)
export const MainMenu: FunctionComponent = () => {
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
      text: 'Filialbesitzer',
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
