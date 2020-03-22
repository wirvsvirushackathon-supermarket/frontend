import React, { FunctionComponent } from 'react'
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Divider
} from '@material-ui/core'

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
    label: 'Name der Filiale/Shop'
  },
  {
    label: 'Email'
  },
  {
    label: 'Telefonnummer'
  },
  {
    label: 'PLZ und Ort'
  },
  {
    label: 'Adresse'
  }
]
export const RegistrationForm: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {conf.map(({ label }) => (
        <TextField key={label} id={label} label={label} />
      ))}
      <Divider />
      <Button>Registrieren</Button>
    </form>
  )
}
