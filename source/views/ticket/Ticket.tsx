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

const { wrap, date, upperDate, lowerDate } = require('./ticket.css')

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
        <Typography variant="h6">30</Typography>
        <Typography>MIN</Typography>
        <div>
          <AccessTimeIcon fontSize="small" />
          14:30 - 14:00
        </div>
      </div>
      <div className={lowerDate}>
        <Typography variant="h6">4789</Typography>
        <Typography>Dein Code</Typography>
      </div>
    </div>
  </Container>
)

const PersonInfo: FunctionComponent = () => (
  <Container>
    <List>
      <ListItem>
        <ListItemText primary="Max Mustermann" secondary="Name" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Edeka Rees, Karlsruhe" secondary="Ort" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Anzahl Begleitpersonen: 1" />
      </ListItem>
    </List>
  </Container>
)
