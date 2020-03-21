import React, { FunctionComponent } from 'react'
import { Button, Typography } from '@material-ui/core'

const styles = require('./home.css')

console.log(styles)

export const Home: FunctionComponent = () => (
  <div className={styles.wrap}>
    <Typography variant="h4" component="h1" gutterBottom>
      A VERY FANCY LANGING PAGE
    </Typography>
    <Button href="/dashboard">Go to dashboard</Button>
  </div>
)
