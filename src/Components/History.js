import React from 'react'
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

function Title (props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node
}

export default function History () {
  const transactions = useSelector(state => state.transactions)
  return (
    <React.Fragment>
      <Title>Recent Calculations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Income</TableCell>
            <TableCell>Investment</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.income}</TableCell>
              <TableCell>{transaction.investment}</TableCell>
              <TableCell>{transaction.year}</TableCell>
              <TableCell>{transaction.age}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell align="right">{transaction.tax}</TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && <> No saved transactions</>}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
