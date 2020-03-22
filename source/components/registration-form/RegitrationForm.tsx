import React, { FunctionComponent, useState } from 'react'
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Divider,
  Button,
  ButtonGroup,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%'
      }
    },
    buttonGroupLabel: {
      'margin-bottom': 0
    },
    'button-selected': {
      'background-color': '#BB86FC'
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
  },
  {
    label: 'Dauer einer Reservierung',
    helperText: 'Die Dauer einer Reservierung in Minuten'
  }
]

const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export const RegistrationForm: FunctionComponent = () => {
  const [selectedDays, setSelectedDays] = useState<Array<string>>([])

  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {conf.map(({ label, helperText }) => (
        <TextField
          key={label}
          id={label}
          label={label}
          helperText={helperText}
        />
      ))}

      <Typography className={classes.buttonGroupLabel} variant="body2">
        Tage an denen Sie geöffnet haben
      </Typography>

      <ButtonGroup size="small" aria-label="wähle einen Tag">
        {daysOfWeek.map(day => (
          <Button
            className={
              selectedDays.includes(day) ? classes['button-selected'] : ''
            }
            key={day}
            onClick={() => setSelectedDays(prevState => [...prevState, day])}
          >
            {day}
          </Button>
        ))}
      </ButtonGroup>

      <TextField label="Öffnungszeiten" placeholder="08:30 - 19:00" />

      <Divider />
      <Button>Registrieren</Button>
    </form>
  )
}
