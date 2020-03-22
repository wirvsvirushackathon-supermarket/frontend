import { makeStyles, createStyles } from '@material-ui/core'

export const useCartStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      'z-index': 20,
      width: '100%',
      bottom: 0,
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
      'max-height': 'calc(100% - 48px)',
      overflow: 'scroll'
    },
    button: {
      width: '100%'
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px'
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px'
    }
  })
)
