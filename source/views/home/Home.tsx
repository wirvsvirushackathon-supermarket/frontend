import React, { FunctionComponent } from 'react'
import { Button, Typography } from '@material-ui/core'

const { wrap } = require('./home.css')

export const Home: FunctionComponent = () => (
  <div className={wrap}>
    <Typography variant="h4" component="h1" gutterBottom>
      A VERY FANCY LANGING PAGE
    </Typography>
    <Button href="/dashboard">Go to dashboard</Button>
    <Button href="/ticket">Go to ticket</Button>
  </div>
)
