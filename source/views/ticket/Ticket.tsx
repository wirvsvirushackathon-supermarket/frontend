import React, { FunctionComponent } from 'react'
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Logo } from '../../components/logo'

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

const peopleNumber = 'Anzahl Begleitpersonen: '.concat(
  report.numberOfAdditionalPeople
)

export const Ticket: FunctionComponent = () => (
  <Container>
    <Typography style={{ textAlign: 'center' }} variant="h6">
      Super, das hat geklappt!
    </Typography>
    <div className={logo}>
      <Logo />
    </div>
    <DateInfo />
    <PersonInfo />
  </Container>
)

const DateInfo: FunctionComponent = () => (
  <Container maxWidth="xl">
    <div className={date}>
      <div className={upperDate}>
        <Typography variant="h6">{report.reserverationTime}</Typography>
        <Typography>MIN</Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          <AccessTimeIcon fontSize="small" />
          <div className={time}>
            {report.reserverationStartTime} - {report.reserverationEndTime}
          </div>
        </div>
      </div>
      <div className={lowerDate}>
        <Typography variant="h6">{report.code}</Typography>
        <Typography>Dein Code</Typography>
      </div>
    </div>
  </Container>
)

const PersonInfo: FunctionComponent = () => (
  <Container>
    <List>
      <ListItem>
        <ListItemText primary={report.name} secondary="Name" />
      </ListItem>
      <ListItem>
        <ListItemText primary={report.storeAddress} secondary="Ort" />
      </ListItem>
      <ListItem>
        <ListItemText primary={peopleNumber} />
      </ListItem>
      <ListItem>
        <ListItemText secondary="Hinweis: Einlass nur mit Personalausweis" />
      </ListItem>
    </List>
  </Container>
)
