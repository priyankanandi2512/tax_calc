import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { range } from 'lodash-es'
import TaxCalculator from './TaxCalculator'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])
describe('App', () => {
  let wrapper
  const signOutSpy = jest.fn()
  beforeEach(() => {
    const store = mockStore({
      session: { userName: 'kunal' }
    })
    wrapper = mount(<Provider store={store}>
      <TaxCalculator userName={'some user'} onSignOut={signOutSpy} />
    </Provider>)
  })

  test('should render TotalIncome component with correct props and value', () => {
    const incomeField = wrapper.find('WithStyles(ForwardRef(TextField))').at(0)
    expect(incomeField.props().label).toEqual('Total Income')
  })

  test('should render Investment component with correct props and value', () => {
    const investMentField = wrapper.find('WithStyles(ForwardRef(TextField))').at(1)
    expect(investMentField.props().label).toEqual('Investment')
  })

  test('should render Year component with correct props and value', () => {
    const yearField = wrapper.find('DropDown').at(0)
    expect(yearField.props().label).toEqual('Financial year')
    expect(yearField.props().values).toEqual([2018, 2019, 2020])
  })

  test('should render Age component with correct props and value', () => {
    const ageField = wrapper.find('DropDown').at(1)
    expect(ageField.props().label).toEqual('Age')
    expect(ageField.props().values).toEqual(range(1, 120))
  })
})
