import React, { FunctionComponent } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { useOverlayStyles } from './use-overlay-styles'

export type OverlayProps = {
  headerTitle: string
  show: boolean
}
export const Overlay: FunctionComponent<OverlayProps> = ({
  headerTitle,
  children,
  show
}) => {
  const history = useHistory()
  const classes = useOverlayStyles()
  return (
    <Slide direction="down" timeout={250} in={show} mountOnEnter unmountOnExit>
      <div className={classes.wrap}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                history.goBack()
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {headerTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>{children}</div>
      </div>
    </Slide>
  )
}
