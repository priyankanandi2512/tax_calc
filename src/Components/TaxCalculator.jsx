import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import NumberFormat from 'react-number-format'
import { range } from 'lodash-es'
import CurrencyNumberFormat from './CurrencyNumberFormat'
import { UPDATE_TRANSACTIONS } from '../constants/actionTypes'
import DropDown from './DropDown'
import calculateTax from '../taxCalculator'
import { Button } from '@material-ui/core'

export default function TaxCalculator () {
  const [values, setValues] = React.useState({
    totalIncome: '',
    investment: ''
  })
  const dispatch = useDispatch()
  const [tax, setTax] = React.useState(0)
  const [year, setYear] = React.useState(0)
  const [age, setAge] = React.useState(0)
  const userName = useSelector(state => state.session.userName)
  const saveTransaction = () => {
    const today = new Date()
    const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`
    const data = { ...values, age, year, tax, date }
    return dispatch({ type: UPDATE_TRANSACTIONS, payload: { userName, data } })
  }

  useEffect(() => {
    const { income, investment } = values
    const tax = calculateTax(year, age, income, investment)
    setTax(tax)
  }, [values, age, year])

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    })
  }
  const isDisabled = () => {
    console.log('year', year)
    return !values['income'] || !year || !values['investment'] || !age
  }
  return (
    <React.Fragment>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Total Income"
            value={values.income}
            onChange={handleChange('income')}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: CurrencyNumberFormat
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Investment"
            value={values.investment}
            onChange={handleChange('investment')}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: CurrencyNumberFormat
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDown
            values={[2018, 2019, 2020]}
            label='Financial year'
            onChange={setYear}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDown
            values={range(1, 120)}
            label='Age'
            onChange={setAge}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography component="div" variant="h2">
            <Box textAlign='center' m={4}>
              <Typography component="div" variant="h6">
              Tax to be paid
              </Typography>
              <NumberFormat
                value={tax}
                defaultValue={0}
                thousandsGroupStyle='lakh'
                displayType="text"
                thousandSeparator={true}
                prefix={'₹'}
              />
            </Box>
            <Button variant="contained"
              color="primary"
              onClick={saveTransaction}
              disabled={isDisabled()}>
              Save Transaction
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
