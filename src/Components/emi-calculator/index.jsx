/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Row } from '../../common/row'
import { Col } from '../../common/col'
import { Card } from '../../common/card'
import Input from '../../common/input'
import LoanInfo from './loan-info'
import { calculateEMI } from '../../utils'

export default function EMICalculator () {
  const [loanInfo, setLoanInfo] = useState({
    loanAmount: 0,
    interestRate: 0,
    loanTenure: 0
  })

  useEffect(() => {
    // const { income, investment } = values
    // const tax = calculateTax(year, age, income, investment)
    // setTax(tax)
    const emi = calculateEMI(loanInfo)
    console.log('in use effect:', emi)
  }, [loanInfo])

  const handleChange = (event) => {
    setLoanInfo({
      ...loanInfo,
      [event.target.name]: event.target.value
    })
  }

  console.log('loan info isssss:', loanInfo)
  return (
    <div className="container">
      <Row>
        <Col lg={4}>
          <Card xl>
            <Input
              type='number'
              label={'Home Loan Amount'}
              value={loanInfo.loanAmount}
              name="loanAmount"
              onChange={handleChange}
            />
            <hr/>
            <Input
              type='number'
              label={'Interest Rate'}
              value={loanInfo.interestRate}
              name="interestRate"
              onChange={handleChange}
            />
            <hr/>
            <Input
              type='number'
              label={'Loan Tenure'}
              value={loanInfo.loanTenure}
              name="loanTenure"
              onChange={handleChange}
            />
            {/* <hr/> */}
          </Card>
        </Col>
        <Col lg={4}>
          <Card xl>
            <LoanInfo loanEmi={'12000'} totalInterest={'3249502'} totalPayable={'43929929292'}/>
          </Card>
        </Col>
        <Col lg={4}>
          <Card xl>
            <div className="section-header">
                Emi Calculator
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
