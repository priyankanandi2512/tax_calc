import * as React from 'react'

export default function LoanInfo (props) {
  return (
    <div className="loan-info">
      <h4 className="loan-info__title">Loan EMI</h4>
      <h3 className="loan-info__value">
        {props.loanEmi}
      </h3>
      <hr/>
      <h4 className="loan-info__title">Total Interest Payable</h4>
      <h3 className="loan-info__value">
        {props.totalInterest}
      </h3>
      <hr/>
      <h4 className="loan-info__title">Total Payment (Principle + Interest)</h4>
      <h3 className="loan-info__value">
        {props.totalPayable}
      </h3>
    </div>
  )
}
