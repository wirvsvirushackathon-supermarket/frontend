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
import CloseIcon from '@material-ui/icons/Close'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const { wrap, date, upperDate, lowerDate, time } = require('./ticket.css')

const report = {
  reserverationTime: 30,
  reserverationStartTime: '13:30',
  reserverationEndTime: '14:00',
  code: 4789,
  name: 'Max Mustermann',
  storeAddress: 'Edeka Rees, Karlsruhe',
  numberOfAdditionalPeople: 2
}

const peopleNumber =
  'Anzahl Begleitpersonen: ' + report.numberOfAdditionalPeople

export const Ticket: FunctionComponent = () => (
  <div className={wrap}>
    <HeaderBar />
    <Card>
      <CardHeader title="Super, das hat geklappt!" />
      <CardContent>
        <Container>
          <Typography variant="h4">QOODS</Typography>
          <DateInfo />
          <PersonInfo />
        </Container>
      </CardContent>
    </Card>
  </div>
)

const HeaderBar: FunctionComponent = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton href="/">
        <CloseIcon />
      </IconButton>
      <Typography variant="h6">Deine Reservierung</Typography>
    </Toolbar>
  </AppBar>
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
