import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Calculator from './Calculator'
import Header from './Header'
import History from './History'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://coderland.taxcalculator.s3-website.us-east-1.amazonaws.com">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginBottom: '55px'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

export default function TaxApp (props) {
  const classes = useStyles()
  const { userName, onSignOut } = props
  return (
    <>
      <CssBaseline />
      <Header userName={userName} onSignOut={onSignOut} />
      <Grid container spacing={10} alignContent='center'>
        <Grid item md={6} xs={12}>
          <div className={classes.layout}>
            <History />
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.layout}>
            <Calculator classes={classes}/>
          </div>
        </Grid>
      </Grid>
      <Copyright />

    </>
  )
}
