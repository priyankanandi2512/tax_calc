export const calculateEMI = (loanInfo) => {
  const { interestRate, loanTenure } = loanInfo
  console.log('input values are:', loanInfo.principal, loanInfo.interestRate, loanInfo.loanTenure)
  const tenureInMonths = convertYearToMonths(loanTenure)
  const interestPerMonth = calculteInterestPerMonth(interestRate, tenureInMonths)
  console.log('interest rate per month:', interestPerMonth)
}

const calculteInterestPerMonth = (interestRate, tenureInMonths) => {
  return interestRate / tenureInMonths / 100
}

const convertYearToMonths = (tenure) => {
  return 12 * tenure
}
