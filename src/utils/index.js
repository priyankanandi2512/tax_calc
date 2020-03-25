export const calculateEMI = (loanInfo) => {
  const { principal, interestRate, loanTenure } = loanInfo
  const tenureInMonths = convertYearToMonths(loanTenure)
  const interestPerMonth = calculteInterestPerMonth(interestRate)
  const tenureInterest = Math.pow((1 + interestPerMonth), tenureInMonths)
  return Math.round(principal * interestPerMonth * (tenureInterest / (tenureInterest - 1)))
}

export const calculateTotalPayableAmount = (loanEMI, loanTenure) => {
  const tenureInMonths = convertYearToMonths(loanTenure)
  return loanEMI * tenureInMonths
}

export const calculateTotalInterest = (principal, totalPayableAmount) => {
  return totalPayableAmount - principal
}
const calculteInterestPerMonth = (interestRate) => {
  return interestRate / (12 * 100)
}

const convertYearToMonths = (tenure) => {
  return 12 * tenure
}
