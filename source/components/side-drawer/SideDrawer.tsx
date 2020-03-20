import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import useResizeObserver from 'use-resize-observer'
import { Drawer, CssBaseline, Divider } from '@material-ui/core'
import { useSideDrawerStyles } from './use-side-drawer-styles'

export type SideDrawerProps = {
  primaryMenu: FunctionComponent
}

export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  primaryMenu
}) => {
  const classes = useSideDrawerStyles()
  const [open, setOpen] = React.useState(false)
  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      if (width >= 800 && !open) setOpen(true)
      if (width < 800 && open) setOpen(false)
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
        {primaryMenu}
      </Drawer>
    </div>
  )
}
