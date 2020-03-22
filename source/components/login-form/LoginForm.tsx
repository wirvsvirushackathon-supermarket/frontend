import React, { FunctionComponent } from 'react'
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Link,
  Divider
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%'
      }
    }
  })
)

const conf = [
  {
    label: 'Email',
    type: 'text'
  },
  {
    label: 'Passwort',
    type: 'password'
  }
]
export const LoginForm: FunctionComponent = () => {
  const history = useHistory()

  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {conf.map(({ label, type }) => (
        <TextField key={label} id={label} label={label} type={type} />
      ))}
      <Divider />
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push('/reservations')}
      >
        Login
      </Button>
      <Link href="/overlay/register">Registrieren</Link>
      <Link href="/wip">Passwort vergessen</Link>
    </form>
  )
}
