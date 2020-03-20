import React, { FunctionComponent } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { SideDrawer } from '../../components'

const MainMenu: FunctionComponent = () => (
  <List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
)

export const Dashboard: FunctionComponent = () => {
  return (
    <div>
      <SideDrawer primaryMenu={MainMenu} />
    </div>
  )
}
