import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { useToggleSideBarHandler } from '../../providers'
import { useKeyupHandler } from './use-keyup-handler'
import { useClickHandler } from './use-click-handler'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 10000,
      'border-radius': 0
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
  const onKeyUp = useKeyupHandler()
  const onClick = useClickHandler()

  const toggleSidebar = useToggleSideBarHandler()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    onKeyUp(value)
  }, [value])
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
        placeholder="Suche nach einem Supermarkt"
        inputProps={{ 'aria-label': 'search google maps' }}
        onKeyUp={e => setValue((e.target as HTMLInputElement).value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={e => {
          e.preventDefault()
          onClick(value)
        }}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  )
}
