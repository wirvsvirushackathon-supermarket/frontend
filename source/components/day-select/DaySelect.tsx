import React, { FC } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { format, isSameDay } from 'date-fns'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      'text-align': 'center'
    },
    'button-selected': {
      'background-color': '#c49bfc',
      width: '100%',
      color: '#000000 !important'
    }
  })
)

type Props = {
  days: Date[]
  selected?: Date
  onDaySelected: (param: Date) => void
}

export const DaySelect: FC<Props> = ({ days, selected, onDaySelected }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="wähle einen Tag">
        {days.map(day => {
          const isSelected = selected && isSameDay(selected, new Date(day))
          return (
            <Button
              className={isSelected ? classes['button-selected'] : ''}
              key={day.toString()}
              disabled={isSelected}
              onClick={(): void => onDaySelected(new Date(day))}
            >
              {format(new Date(day), 'EEEEEE')}
            </Button>
          )
        })}
      </ButtonGroup>
    </div>
  )
}
