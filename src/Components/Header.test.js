// import React from 'react'
// import { shallow, mount } from 'enzyme'
// import Header from './Header'

// describe('App', () => {
//   let wrapper
//   const signOutSpy = jest.fn()
//   beforeEach(() => {
//     wrapper = mount(<Header userName={'Some User'} onSignOut={signOutSpy} />)
//   })

//   test('should render header correct title', () => {
//     expect(wrapper.find('WithStyles(ForwardRef(Typography))').childAt(0).text()).toEqual('Tax Calculator')
//   })

//   test('should render header correct username', () => {
//     expect(wrapper.find('WithStyles(ForwardRef(Toolbar)) div').at(1).text()).toEqual('Welcome Some User')
//   })

//   test('should call signOut on click of signout button', () => {
//     wrapper.find('WithStyles(ForwardRef(Button))').props().onClick()
//     expect(signOutSpy).toHaveBeenCalled()
//   })
// })
