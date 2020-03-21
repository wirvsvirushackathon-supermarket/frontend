import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useOverlayStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100000
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)
