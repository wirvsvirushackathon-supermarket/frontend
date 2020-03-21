import React, { FC, useState } from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { format, add, isSameMinute } from 'date-fns'
import parseIsoDuration from 'parse-iso-duration'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { slots as MockedSlots } from '../mocked-api'

type Props = {
  slots: typeof MockedSlots
}

export const SlotList: FC<Props> = ({ slots }) => {
  const [selected] = useState<string>()

  return (
    <List component="nav" aria-label="main mailbox folders">
      {slots.map(slot => {
        const slotStart = new Date(slot.start)
        return (
          <ListItem button key={slot.start} disabled={!slot.available}>
            <ListItemIcon>
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${format(slotStart, 'HH:mm')} - ${format(
                add(slotStart, {
                  seconds: parseIsoDuration(slots[0].slotSize) / 1000
                }),
                'HH:mm'
              )}`}
            />
            {slot.available}&nbsp;
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            {selected &&
            isSameMinute(new Date(selected), new Date(slot.start)) ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </ListItem>
        )
      })}
    </List>
  )
}
