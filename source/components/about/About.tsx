import React, { FunctionComponent } from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import TrackChangesIcon from '@material-ui/icons/TrackChanges'
import PlaceIcon from '@material-ui/icons/Place'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

const useStyles = makeStyles({
  root: {
    marginBottom: 16
  },
  firstRoot: {
    marginBottom: 32
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: 16
  },
  icon: {
    marginTop: 5
  }
})
export const About: FunctionComponent = () => {
  const classes = useStyles()
  const conf = [
    {
      title: 'Gemeinsam sicher einkaufen',
      Icon: TrackChangesIcon,
      content: `Vermeidung von Menschenmassen zu Stoßzeiten, um Kontakt zu vermeiden
            und sichere Alltagsaufgaben zu gewährleisten.`
    },
    {
      title: '1. Auswahl Lokation',
      Icon: PlaceIcon,
      content:
        'Du planst einen öffentlichen Platz aufzusuchen (z.B. einen Supermarkt). Also suchst du diesen auf dieser Website.'
    },
    {
      title: '2. Informationen erhalten',
      Icon: NotListedLocationIcon,
      content:
        'Auf der Website werden dir Informationen zu der Lokation angezeigt und wie Stark die Auslastung ist.'
    },
    {
      title: '3. Stoßzeiten vermeiden',
      Icon: ShoppingBasketIcon,
      content:
        'Wähle einen Zeitraum in dem die öffentliche Lokation weniger besucht ist. So vermeiden wir unnötigen Kontakt.'
    }
  ]
  return (
    <>
      {conf.map(({ title, Icon, content }, i) => (
        <Card
          key={title}
          className={i === 0 ? classes.firstRoot : classes.root}
        >
          <CardContent className={classes.content}>
            <Icon className={classes.icon} />
            <div>
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography variant="body2">{content}</Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
