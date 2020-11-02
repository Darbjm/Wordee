/* global describe, it, expect */
import React from 'react'
import Profile from './profile'
import { shallow } from 'enzyme'

describe('Profile Component', () => {
  it('trips should render a title', () => {
    const wrapper = shallow(<Profile />)
    const title = wrapper.find('h1').text()
    expect(title).toEqual('Trip')
  })

  // it('trips should render a title with mockDataNULL', () => {
  //   const { getByTestId } = renderer(<Trips trips={mockDataNULL} />)
  //   const title = getByTestId('title')
  //   expect(title).toBeInTheDocument()
  // })

  // it('trips should render a div', () => {
  //   const { getAllByTestId } = renderer(<Trips trips={mockDataOk} />)
  //   const key = getAllByTestId('key')
  //   expect(key).toHaveLength(3)
  // })


})