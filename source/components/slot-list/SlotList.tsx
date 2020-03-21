import React, { FC } from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AlarmIcon from '@material-ui/icons/Alarm'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { format, add } from 'date-fns'
import parseIsoDuration from 'parse-iso-duration'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { slots } from '../mocked-api'

const useStyles = makeStyles(() =>
  createStyles({
    'button-selected': {
      'background-color': '#BB86FC'
    }
  })
)

type Props = {
  slots: typeof slots
}

export const SlotList: FC<Props> = ({ slots }) => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      {slots.map(slot => {
        const slotStart = new Date(slot.start)
        return (
          <ListItem button key={slot.start}>
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
            <FiberManualRecordIcon />
          </ListItem>
        )
      })}
    </List>
  )
}
