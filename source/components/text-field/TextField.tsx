import React, { FunctionComponent, useState } from 'react'
import { TextField as MaterialTextField } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%'
    }
  })
)

type Props = {
  onValueChange: (param: string) => void
}

export const TextField: FunctionComponent<Props> = ({ onValueChange }) => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('')

  return (
    <MaterialTextField
      value={value}
      onChange={(e): void => {
        setValue(e.target.value)
        onValueChange(e.target.value)
      }}
      className={classes.root}
      id="name"
      aria-label="Vor- und Nachname"
      placeholder="Vor- und Nachname"
      variant="outlined"
      helperText="Bitte Namen verwenden, der auf deinem Personalausweis steht."
    />
  )
}
