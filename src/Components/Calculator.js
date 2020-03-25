import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TaxCalculator from './TaxCalculator'

export default function Calculator ({ classes }) {
  return <Paper className={classes.paper}>
    <Typography component="h1" variant="h4" align="center" className={classes.title}>
      Income Tax Calculator
    </Typography>
    <React.Fragment>
      <TaxCalculator />
    </React.Fragment>
  </Paper>
}
