import taxCalculator from './index'

describe('taxCalculator', () => {
  const discount = {
    greaterThan: 500000,
    percentage: 5
  }
  const ageDiscount = {
    greaterThan: 60,
    taxableIncomeReduction: 75000
  }
  const mockConfig = {
    2020: {
      taxFreeInvestmentLimit: 100000,
      slabs: [
        {
          greaterThan: 0,
          lessThan: 100000,
          percentage: 0
        },
        {
          greaterThan: 100000,
          lessThan: 500000,
          percentage: 15
        },
        {
          greaterThan: 500000,
          lessThan: 1000000,
          percentage: 25
        },
        {
          greaterThan: 1000000,
          percentage: 30
        }
      ]
    }
  }

  it('should return correct tax if no discount and ageDiscount is present', () => {
    const tax = taxCalculator(2020, 10, 3000000, 10000, () => mockConfig)
    expect(tax).toEqual(782000)
  })

  it('should return correct tax if discount is present and ageDiscount is not present', () => {
    const mockConfigWithDiscount = { 2020: { ...mockConfig[2020], ...{ discount } } }
    console.log(mockConfigWithDiscount)
    const tax = taxCalculator(2020, 10, 3000000, 10000, () => mockConfigWithDiscount)
    expect(tax).toEqual(782000)
  })

  it('should return correct tax if ageDiscount is present and discount is not present and ageCriteria matches', () => {
    const mockConfigWithDiscount = { 2020: { ...mockConfig[2020], ...{ ageDiscount } } }
    const tax = taxCalculator(2020, 65, 3000000, 500000, () => mockConfigWithDiscount)
    expect(tax).toEqual(732500)
  })

  it('should return correct tax if ageDiscount is present and discount is not present and ageCriteria does not match', () => {
    const mockConfigWithDiscount = { 2020: { ...mockConfig[2020], ...{ ageDiscount } } }
    const tax = taxCalculator(2020, 59, 3000000, 500000, () => mockConfigWithDiscount)
    expect(tax).toEqual(755000)
  })

  it('should return correct tax if ageDiscount and discount are present', () => {
    const mockConfigWithDiscount = { 2020: { ...mockConfig[2020], ...{ ageDiscount }, discount } }
    const tax = taxCalculator(2020, 10, 3000000, 10000, () => mockConfigWithDiscount)
    expect(tax).toEqual(782000)
  })

  describe('Non taxable slab', () => {
    it('should return 0 tax if income is less than maximum amout of slab', () => {
      const tax = taxCalculator(2020, 10, 50000, 0, () => mockConfig)
      expect(tax).toEqual(0)
    })

    it('should return correct tax if income is maximum in the slab', () => {
      const tax = taxCalculator(2020, 10, 100000, 0, () => mockConfig)
      expect(tax).toEqual(0)
    })
  })

  describe('Taxable Slab', () => {
    it('should return correct tax if income is in taxable slab and taxable income is not in taxable slab', () => {
      const tax = taxCalculator(2020, 10, 150000, 0, () => mockConfig)
      expect(tax).toEqual(7500)
    })

    it('should return correct tax if income is in the first taxable slab but taxable income is in tax free slab', () => {
      const tax = taxCalculator(2020, 10, 150000, 50000, () => mockConfig)
      expect(tax).toEqual(0)
    })
    // verify from here
    it('should return correct tax if income is  taxable slab and taxable income is also in taxable slab', () => {
      const tax = taxCalculator(2020, 10, 150000, 10000, () => mockConfig)
      expect(tax).toEqual(6000)
    })
    it('should return correct tax if income is second taxable slab and taxable income is lowest in second taxable slab and investment is 0', () => {
      const tax = taxCalculator(2020, 10, 500000, 0, () => mockConfig)
      expect(tax).toEqual(60000)
    })
    it('should return correct tax if income is second taxable slab and taxable income is lowest in second taxable slab', () => {
      const tax = taxCalculator(2020, 10, 500000, 10000, () => mockConfig)
      expect(tax).toEqual(58500)
    })

    it('should return correct tax if income is second taxable slab and taxable income is in second taxable slab', () => {
      const tax = taxCalculator(2020, 10, 700000, 10000, () => mockConfig)
      expect(tax).toEqual(107500)
    })
    it('should return correct tax if income is second taxable slab and taxable income is equal to taxable limit', () => {
      const tax = taxCalculator(2020, 10, 700000, 100000, () => mockConfig)
      expect(tax).toEqual(85000)
    })
    it('should return correct tax if income is second taxable slab and taxable income is greater than taxable limit', () => {
      const tax = taxCalculator(2020, 10, 700000, 200000, () => mockConfig)
      expect(tax).toEqual(85000)
    })
    it('should return correct tax if income is in second taxable slab and investment is more than allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1000000, 500000, () => mockConfig)
      expect(tax).toEqual(160000)
    })
    it('should return correct tax if income is in second taxable slab and investment is equal to allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1000000, 100000, () => mockConfig)
      expect(tax).toEqual(160000)
    })
    it('should return correct tax if income is in second taxable slab and investment is lessthan than allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1000000, 500000, () => mockConfig)
      expect(tax).toEqual(160000)
    })
  })
  describe(' Last Taxable Slab', () => {
    it('should return correct tax if income is in last taxable slab and investment is lessthan than allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1500000, 10000, () => mockConfig)
      expect(tax).toEqual(332000)
    })
    it('should return correct tax if income is in last taxable slab and investment is lessthan than allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1500000, 100000, () => mockConfig)
      expect(tax).toEqual(305000)
    })
    it('should return correct tax if income is in last taxable slab and investment is more than allowed limit', () => {
      const tax = taxCalculator(2020, 10, 1500000, 400000, () => mockConfig)
      expect(tax).toEqual(305000)
    })
  })
})
