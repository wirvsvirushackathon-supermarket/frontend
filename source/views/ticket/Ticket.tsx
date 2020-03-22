import React, { FunctionComponent } from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { Logo } from '../../components/logo'
import { useAppState } from '../../providers'

const { date, upperDate, lowerDate, time, logo } = require('./ticket.css')

const report = {
  reserverationTime: 30,
  reserverationStartTime: '13:30',
  reserverationEndTime: '14:00',
  code: 4789,
  name: 'Max Mustermann',
  storeAddress: 'Edeka Rees, Karlsruhe',
  numberOfAdditionalPeople: '2'
}

export const Ticket: FunctionComponent = () => {
  const { state } = useAppState()
  if (!state.ticket) return null
  return (
    <>
      <Typography style={{ textAlign: 'center' }} variant="h6">
        Super, das hat geklappt!
      </Typography>
      <div className={logo}>
        <Logo />
      </div>
      <DateInfo />
      <PersonInfo />
    </>
  )
}

const DateInfo: FunctionComponent = () => {
  const { state } = useAppState()

  return (
    <div className={date}>
      <div className={upperDate}>
        <Typography variant="h6">{report.reserverationTime} MIN</Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px'
          }}
        >
          <CalendarIcon fontSize="small" />
          <div className={time}>
            {new Intl.DateTimeFormat('de-DE', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            }).format(new Date(state.ticket.slot))}{' '}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            marginBottom: '8px'
          }}
        >
          <AccessTimeIcon fontSize="small" />
          <div className={time}>
            {new Intl.DateTimeFormat('de-DE', {
              hour: 'numeric',
              minute: 'numeric'
            }).format(new Date(state.ticket.slot))}{' '}
            {' -'}{' '}
            {new Intl.DateTimeFormat('de-DE', {
              hour: 'numeric',
              minute: 'numeric'
            }).format(
              new Date(new Date(state.ticket.slot).getTime() + 30 * 60000)
            )}
          </div>
        </div>
      </div>
      <div className={lowerDate}>
        <Typography>Dein Code:</Typography>
        <Typography variant="h6">{state.ticket.code}</Typography>
      </div>
    </div>
  )
}

const PersonInfo: FunctionComponent = () => {
  const { state } = useAppState()

  return (
    <List>
      <ListItem>
        <ListItemText primary={state.ticket.name} secondary="Name" />
      </ListItem>
      <ListItem>
        <ListItemText secondary="Ort">
          {state.ticket.store!.address_components[1].long_name}
          {` ${state.ticket.store!.address_components[0].long_name}`}
          {` ${state.ticket.store!.address_components[6].long_name}`}
          {` ${state.ticket.store!.address_components[3].long_name}`}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText secondary="Anzahl der Personen">
          {state.ticket.nOfPersons}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText secondary="Hinweis: Einlass nur mit Personalausweis" />
      </ListItem>
    </List>
  )
}
