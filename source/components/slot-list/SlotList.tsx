import React, { FC, useState } from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { format, add, isSameMinute } from 'date-fns'
import parseIsoDuration from 'parse-iso-duration'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    radios: {
      fill: '#6200EE'
    }
  })
)

type Props = {
  slots: any
  onSlotSelected: (param: string) => void
  maxSlots: number
}

export const SlotList: FC<Props> = ({ slots, onSlotSelected, maxSlots }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState<string>()

  return (
    <List component="nav" aria-label="main mailbox folders">
      {slots.map(slot => {
        const slotStart = new Date(slot.start)
        return (
          <ListItem
            button
            key={slot.start}
            disabled={!slot.available}
            onClick={(): void => {
              setSelected(slot.start)
              onSlotSelected(slot.start)
            }}
          >
            <ListItemIcon>
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${format(slotStart, 'HH:mm')} - ${format(
                add(slotStart, {
                  seconds: parseIsoDuration(slot.slotSize) / 1000
                }),
                'HH:mm'
              )}`}
            />
            {maxSlots - slot.available}/{maxSlots}&nbsp;
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            {selected &&
            isSameMinute(new Date(selected), new Date(slot.start)) ? (
              <RadioButtonCheckedIcon className={classes.radios} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </ListItem>
        )
      })}
    </List>
  )
}
