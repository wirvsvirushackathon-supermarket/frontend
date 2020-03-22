import React, { FunctionComponent } from 'react'
import { Typography } from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build'

export const WipPage: FunctionComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
    <BuildIcon />
    <Typography>Sorry, we are working on it!</Typography>
  </div>
)
