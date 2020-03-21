import React, { FC } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { format, isSameDay } from 'date-fns'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { slots } from '../mocked-api'

const useStyles = makeStyles(() =>
  createStyles({
    'button-selected': {
      'background-color': '#BB86FC'
    }
  })
)

type Props = {
  days: typeof slots
  selected?: Date
  onDaySelected: (param: Date) => void
}

export const DaySelect: FC<Props> = ({ days, selected, onDaySelected }) => {
  const classes = useStyles()
  return (
    <ButtonGroup size="small" aria-label="wähle einen Tag">
      {days.map(day => {
        const isSelected = selected && isSameDay(selected, new Date(day.open))
        return (
          <Button
            className={isSelected ? classes['button-selected'] : ''}
            key={day.open}
            disabled={isSelected}
            onClick={(): void => onDaySelected(new Date(day.open))}
          >
            {format(new Date(day.open), 'EEEEEE')}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
