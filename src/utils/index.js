export const calculateEMI = (loanInfo) => {
  const { interestRate, loanTenure } = loanInfo
  console.log('input values are:', loanInfo.principal, loanInfo.interestRate, loanInfo.loanTenure)
  const tenureInMonths = convertYearToMonths(loanTenure)
  const interestRatePerMonth = calculteInterestRatePerMonth(interestRate, tenureInMonths)
  console.log('interest rate per month:', interestRatePerMonth)
}

const calculteInterestRatePerMonth = (interestRate, tenureInMonths) => {
  return interestRate / tenureInMonths
}

const convertYearToMonths = (tenure) => {
  return 12 * tenure
}
