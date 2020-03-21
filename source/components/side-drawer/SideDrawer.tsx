import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import useResizeObserver from 'use-resize-observer'
import { Drawer, CssBaseline, Divider } from '@material-ui/core'
import { useAppState } from '../../providers'
import { useSideDrawerStyles } from './use-side-drawer-styles'

export type SideDrawerProps = {
  PrimaryMenu: FunctionComponent
}

export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  PrimaryMenu
}) => {
  const classes = useSideDrawerStyles()
  const { state: appState } = useAppState()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={appState.sidebarVisible}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <PrimaryMenu />
      </Drawer>
    </div>
  )
}
