import { makeStyles, createStyles, Theme } from '@material-ui/core'

export const useHomeStyles = makeStyles((theme: Theme) =>
  createStyles({
    geoButton: {
      position: 'fixed',
      width: '100%',
      bottom: theme.spacing(2),
      textAlign: 'center'
    }
  })
)
