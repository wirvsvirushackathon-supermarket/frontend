import React, { FunctionComponent } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Route, useHistory } from 'react-router-dom'
import { useOverlayStyles } from './use-overlay-styles'

export type OverlayProps = {
  headerTitle: string
}
export const Overlay: FunctionComponent<OverlayProps> = ({
  headerTitle,
  children
}) => {
  const history = useHistory()

  const classes = useOverlayStyles()
  return (
    <div className={classes.wrap}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  )
}
