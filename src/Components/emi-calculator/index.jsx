/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Row } from '../../common/row'
import { Col } from '../../common/col'
import { Card } from '../../common/card'
import Input from '../../common/input'
import LoanInfo from './loan-info'
import { calculateEMI, calculateTotalPayableAmount, calculateTotalInterest } from '../../utils'

export default function EMICalculator () {
  const [loanEMI, setEMI] = useState(0)
  const [totalPayableAmount, setAmountPayable] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [loanInfo, setLoanInfo] = useState({
    principal: 0,
    interestRate: 0,
    loanTenure: 0
  })

  useEffect(() => {
    const loanEMI = calculateEMI(loanInfo)
    const totalPayableAmount = calculateTotalPayableAmount(loanEMI, loanInfo.loanTenure)
    const totalInterest = calculateTotalInterest(loanInfo.principal, totalPayableAmount)
    setEMI(loanEMI)
    setAmountPayable(totalPayableAmount)
    setTotalInterest(totalInterest)
    console.log('loan Emi Is:', totalPayableAmount)
  }, [loanInfo])

  const handleChange = (event) => {
    setLoanInfo({
      ...loanInfo,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="container">
      <Row>
        <Col lg={4}>
          <Card xl>
            <Input
              type='number'
              label={'Home Loan Amount'}
              value={loanInfo.principal}
              name="principal"
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
          </Card>
        </Col>
        <Col lg={4}>
          <Card xl>
            <LoanInfo
              loanEmi={loanEMI}
              totalInterest={totalInterest}
              totalPayable={totalPayableAmount}
            />
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
