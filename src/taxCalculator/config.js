export const taxConf = () => ({
  2018: {
    taxFreeInvestmentLimit: 100000,
    cess: {
      greaterThan: 500000,
      percentage: 1
    },
    slabs: [
      {
        greaterThan: 0,
        lessThan: 100000,
        percentage: 0
      },
      {
        greaterThan: 100000,
        lessThan: 500000,
        percentage: 10
      },
      {
        greaterThan: 500000,
        lessThan: 1000000,
        percentage: 20
      },
      {
        greaterThan: 1000000,
        percentage: 30
      }
    ]
  },
  2019: {
    taxFreeInvestmentLimit: 150000,
    cess: {
      greaterThan: 500000,
      percentage: 2
    },
    ageDiscount: {
      greaterThan: 60,
      taxableIncomeReduction: 50000
    },
    slabs: [
      {
        greaterThan: 0,
        lessThan: 100000,
        percentage: 0
      },
      {
        greaterThan: 100000,
        lessThan: 600000,
        percentage: 10
      },
      {
        greaterThan: 600000,
        lessThan: 1200000,
        percentage: 20
      },
      {
        greaterThan: 1200000,
        percentage: 30
      }
    ]
  },
  2020: {
    taxFreeInvestmentLimit: 200000,
    cess: {
      greaterThan: 500000,
      percentage: 5
    },
    ageDiscount: {
      greaterThan: 60,
      taxableIncomeReduction: 75000
    },
    slabs: [
      {
        greaterThan: 0,
        lessThan: 100000,
        percentage: 0
      },
      {
        lessThan: 1000000,
        greaterThan: 100000,
        percentage: 15
      },
      {
        greaterThan: 1000000,
        percentage: 25
      }
    ]
  }
})
