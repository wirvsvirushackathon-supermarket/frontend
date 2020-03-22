import React, { FunctionComponent, useState, useEffect } from 'react'
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
import { useHistory } from 'react-router-dom'
import { DaySelect } from '../day-select'
import { SlotList } from '../slot-list'
import { slots } from '../mocked-api'
import { PersonSlider } from '../person-slider/PersonSlider'
import { TextField } from '../text-field'
import { createUser, createBooking } from '../../gql'
import { useAppState } from '../../providers'

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
  const [selectedPersons, setSelectedPersons] = useState(1)
  const [selectedName, setSelectedName] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<string>()
  const [isFormValid, setIsFormValid] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { state, setAppState } = useAppState()
  const history = useHistory()
  const { currentPlaceApiResult } = state

  useEffect(() => {
    setIsHidden(false)
  }, [currentPlaceApiResult])
  useEffect(() => {
    setIsFormValid(selectedName.length > 0 && selectedSlot)
  }, [selectedName, selectedSlot])

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

  const handleFormSubmit = async (): void => {
    if (isFormValid) {
      setAppState({
        ...state,
        ticket: {
          day: selectedDay,
          slot: selectedSlot!,
          name: selectedName,
          nOfPersons: selectedPersons,
          code: Math.round(Math.random() * 1000000),
          store: currentPlaceApiResult!
        },
        currentPlaceApiResult: undefined
      })
      history.push('/overlay/ticket')
    }
  }

  if (!currentPlaceApiResult || isHidden) return null
  return (
    <MaterialCard className={classes.root}>
      <CardActionArea
        disabled={cardVisible}
        onClick={(): void => setCardVisible(true)}
      >
        <CardMedia
          component="img"
          height="120"
          image={
            typeof currentPlaceApiResult.photos[0].getUrl === 'function'
              ? currentPlaceApiResult.photos[0].getUrl()
              : ''
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={7}>
              <Typography variant="subtitle1">
                {currentPlaceApiResult!.name}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption">
                {currentPlaceApiResult!.address_components[1].long_name}
                {` ${currentPlaceApiResult!.address_components[0].long_name}`}
                <br />
                {` ${currentPlaceApiResult!.address_components[6].long_name}`}
                {` ${currentPlaceApiResult!.address_components[3].long_name}`}
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
          onClick={(): void => {
            setIsHidden(true)
          }}
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
            disabled={!isFormValid}
            onClick={handleFormSubmit}
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
            <SlotList
              slots={getAllSlotsForASelectedDay()}
              onSlotSelected={setSelectedSlot}
            />
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
