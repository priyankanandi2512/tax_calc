import { taxConf } from './config'

function getTaxableIncome (rulesForYear, age, investment, income) {
  const allowedInvestment = rulesForYear.taxFreeInvestmentLimit

  const exemptedInvestment = investment > allowedInvestment ? allowedInvestment : investment
  let taxableIncome = (income - exemptedInvestment) > 0 ? (income - exemptedInvestment) : 0
  if (rulesForYear['ageDiscount'] && age > rulesForYear.ageDiscount.greaterThan) {
    taxableIncome = taxableIncome - rulesForYear.ageDiscount.taxableIncomeReduction
  }
  if (taxableIncome > 0) {
    return taxableIncome
  }
  return 0
}

function getTaxOfTaxableIncome (rules, taxableIncome) {
  let tax = 0
  rules.forEach(rule => {
    if (taxableIncome > 0) {
      const taxForSlab = rule.lessThan ? Math.min((rule.lessThan - rule.greaterThan), taxableIncome) : taxableIncome
      tax = tax + taxForSlab * rule.percentage / 100
      taxableIncome = taxableIncome - taxForSlab
    }
  })
  return tax
}

function getCessedValue (cess, value) {
  return (value + value * cess / 100)
}

const taxCalculator = (year, age, income, investment, config = taxConf) => {
  let tax = 0
  const rulesForYear = config()[year]
  if (!rulesForYear) { return null }
  const taxableIncome = getTaxableIncome(rulesForYear, age, investment, income)
  tax = getTaxOfTaxableIncome(rulesForYear.slabs, taxableIncome)
  if (rulesForYear.cess && tax > rulesForYear.cess.greaterThan) {
    tax = getCessedValue(rulesForYear.cess.percentage, tax)
  }
  return tax
}

export default taxCalculator
