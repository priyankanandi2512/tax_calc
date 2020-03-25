import React from 'react'
import { shallow} from 'enzyme'
import TaxApp from './TaxApp'

describe('App', () => {
  let wrapper
  const signOutSpy = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<TaxApp userName={'some user'} onSignOut={signOutSpy} />)
  })

  test('should render header component with correct props', () => {
    expect(wrapper.find('Header').props().userName).toEqual('some user')
    wrapper.find('Header').props().onSignOut()
    expect(signOutSpy).toHaveBeenCalled()
  })

  test('should render TaxApp component with correct title', () => {
    expect(wrapper.find('Calculator')).toHaveLength(1)
  })

  test('should render History component ', () => {
    expect(wrapper.find('History')).toHaveLength(1)
  })
})
