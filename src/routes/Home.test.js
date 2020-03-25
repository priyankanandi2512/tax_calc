import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import Home from './Home'
import configureStore from 'redux-mock-store'
import cognitoUtils from '../lib/cognitoUtils'
const mockStore = configureStore([])

describe('App', () => {
  let store
  const getCognitoSignInUriMock = jest.spyOn(cognitoUtils, 'getCognitoSignInUri').mockImplementation(() => 'http://someurl.com')
  const getCognitoSessionMock = jest.spyOn(cognitoUtils, 'getCognitoSession').mockImplementation(() => Promise.resolve({}))
  const signOutCognitoSessionMock = jest.spyOn(cognitoUtils, 'signOutCognitoSession').mockImplementation(() => null)

  beforeEach(() => {
    store = mockStore({
      session: { isLoggedIn: true, userName: 'kunal' }
    })
  })

  test('should render home component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    ).shallow()
    expect(wrapper.find('Home')).toHaveLength(1)
  })

  test('should render TaxApp component with correct props when user is logged in', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(wrapper.find('TaxApp')).toHaveLength(1)
    expect(wrapper.find('TaxApp').props().userName).toEqual('kunal')
  })

  test('should not render TaxApp component with correct props when user is logged in', () => {
    const storeWithIsLoggedInFalse = store = mockStore({
      session: { isLoggedIn: false, userName: 'kunal' }
    })
    const wrapper = mount(
      <Provider store={storeWithIsLoggedInFalse}>
        <Home />
      </Provider>
    )
    expect(wrapper.find('TaxApp')).toHaveLength(0)
  })

  test('should call signOutCognitoSession on signOut', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    wrapper.find('TaxApp').props().onSignOut({ preventDefault: () => null })
    expect(signOutCognitoSessionMock).toHaveBeenCalled()
  })
})
