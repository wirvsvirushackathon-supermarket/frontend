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
  ButtonGroup
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { DaySelect } from '../day-select'
import { slots } from '../mocked-api'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      'z-index': 20,
      width: 'calc(100% - 10px)',
      left: '5px',
      bottom: 0,
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0
    },
    button: {
      width: '100%'
    }
  })
)

export const Card: FunctionComponent = () => {
  const classes = useStyles()
  const [cardVisible, setCardVisible] = useState(false)
  const [selectedDay, setselectedDay] = useState()
  return (
    <MaterialCard className={classes.root}>
      <CardActionArea
        onClick={(): void => setCardVisible(prevState => !prevState)}
      >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
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
            days={slots}
            selected={selectedDay}
            onDaySelected={setselectedDay}
          />
        </CardContent>
      </Collapse>
    </MaterialCard>
  )
}
