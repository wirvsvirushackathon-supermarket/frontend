import React, { FunctionComponent, useState } from 'react'
import {
  Card as MaterialCard,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Collapse,
  Grid,
  Button,
  Paper,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { eachDayOfInterval, isSameDay } from 'date-fns'
import { DaySelect } from '../day-select'
import { SlotList } from '../slot-list'
import { slots } from '../mocked-api'
import { PersonSlider } from '../person-slider/PersonSlider'
import { TextField } from '../text-field'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      'z-index': 20,
      width: '100%',
      bottom: 0,
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
      'max-height': 'calc(100% - 48px)',
      overflow: 'scroll'
    },
    button: {
      width: '100%'
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px'
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px'
    }
  })
)

export const Card: FunctionComponent = () => {
  const classes = useStyles()
  const [cardVisible, setCardVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [_selectedPersons, setSelectedPersons] = useState<number>()
  const [_selectedName, setSelectedName] = useState<string>()

  const getDaysOfWeek = (): Date[] => {
    return eachDayOfInterval({
      start: new Date(slots[0].start),
      end: new Date(slots[slots.length - 1].start)
    })
  }

  const getAllSlotsForASelectedDay = (): typeof slots => {
    return slots.filter(
      slot => selectedDay && isSameDay(new Date(slot.start), selectedDay)
    )
  }

  const getHighestAvailability = (): number => {
    // eslint-disable-next-line prefer-spread
    return Math.max.apply(
      Math,
      getAllSlotsForASelectedDay().map(slot => slot.available)
    )
  }

  // const handleButtonClick = (): void => {
  //   // TODO:
  // }

  return (
    <MaterialCard className={classes.root}>
      <CardActionArea
        disabled={cardVisible}
        onClick={(): void => setCardVisible(true)}
      >
        <CardMedia
          component="img"
          height="120"
          image="https://www.kaufda.de/insights/shared/content/uploads/2018/05/Unterschied-Supermarkt-Discounter-1200x500-1526998833.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={7}>
              <Typography variant="subtitle1">Rewe Hauptbahnhof</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption">
                Straßenname 12 12345 Musterstadt
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>

      {cardVisible && (
        <Fab
          className={classes.backButton}
          color="primary"
          aria-label="back"
          onClick={(): void => setCardVisible(false)}
        >
          <ArrowBackIcon />
        </Fab>
      )}

      {!cardVisible && (
        <Fab
          className={classes.closeButton}
          color="primary"
          aria-label="back"
          onClick={(): void => alert('ICH BRAUCH NOCH LOGIK')}
        >
          <CloseIcon />
        </Fab>
      )}

      <Collapse in={cardVisible}>
        <CardContent>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Reservieren
          </Button>
        </CardContent>

        <CardContent>
          <DaySelect
            days={getDaysOfWeek()}
            selected={selectedDay}
            onDaySelected={setSelectedDay}
          />
        </CardContent>

        <CardContent>
          <Paper elevation={3}>
            <SlotList slots={getAllSlotsForASelectedDay()} />
          </Paper>
        </CardContent>

        <CardContent>
          <PersonSlider
            max={getHighestAvailability()}
            onPersonsSelected={setSelectedPersons}
          />
        </CardContent>

        <CardContent>
          <TextField onValueChange={setSelectedName} />
        </CardContent>
      </Collapse>
    </MaterialCard>
  )
}
