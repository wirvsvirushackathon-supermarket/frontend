import React, { FunctionComponent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import {
  useToggleSideBarHandler,
  useMapsApi,
  useAppState
} from '../../providers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 10000
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
)

export const SearchHeader: FunctionComponent = () => {
  const classes = useStyles()
  const { placesService } = useMapsApi()
  const { state } = useAppState()
  const toggleSidebar = useToggleSideBarHandler()
  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        onKeyUp={(e): void => {
          const request = {
            name: e.target.value,
            fields: ['name', 'geometry'],
            location: {
              lat: state.userLocation.lat,
              lng: state.userLocation.lon
            },
            type: ['grocery_or_supermarket', 'supermarket'],
            radius: '10000'
          }
          placesService.nearbySearch(request, (results, status) => {
            if (status === 'OK') {
              // eslint-disable-next-line no-console
              console.log(results)
            }
          })
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  )
}
