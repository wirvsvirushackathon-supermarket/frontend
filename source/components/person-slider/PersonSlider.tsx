import React, { FunctionComponent, useState, useEffect } from 'react'
import { Slider, Typography } from '@material-ui/core'

type Props = {
  max: number
  onPersonsSelected: (param: number) => void
}

export const PersonSlider: FunctionComponent<Props> = ({
  max,
  onPersonsSelected
}) => {
  const [value, setValue] = useState(1)

  useEffect(() => {
    if (value > max) {
      setValue(max)
    }
  }, [max])

  return (
    <>
      <Typography id="discrete-slider" gutterBottom>
        Anzahl Personen
      </Typography>
      <Slider
        onChange={(event, newValue): void => {
          setValue(newValue as number)
          onPersonsSelected(newValue as number)
        }}
        value={value}
        defaultValue={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={max}
      />
    </>
  )
}
