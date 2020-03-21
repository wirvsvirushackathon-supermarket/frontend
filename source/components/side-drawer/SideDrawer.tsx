import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import useResizeObserver from 'use-resize-observer'
import { Drawer, CssBaseline, Divider } from '@material-ui/core'
import { useSideDrawerStyles } from './use-side-drawer-styles'

export type SideDrawerProps = {
  PrimaryMenu: FunctionComponent
}

export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  PrimaryMenu
}) => {
  const minExpandedWidth = 800
  const classes = useSideDrawerStyles()
  const [open, setOpen] = React.useState(window.innerWidth >= minExpandedWidth)
  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width >= minExpandedWidth && !open) setOpen(true)
      if (width < minExpandedWidth && open) setOpen(false)
    }
  })
  return (
    // @ts-ignore
    <div ref={ref} className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <PrimaryMenu />
      </Drawer>
    </div>
  )
}
