import React, { FunctionComponent } from 'react'
import { SideDrawer } from '../../components'
import { List, ListItem, ListItemText } from '@material-ui/core'

const MainMenu: FunctionComponent = () => (
   <List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
);

export const Dashboard: FunctionComponent = () => {
  return (
    <div><SideDrawer primaryMenu={MainMenu} ></div>
  )
}
