/* global describe, it, expect */
import React from 'react'
import FailedPage from '../../src/components/common/FailedPage'
import { shallow } from 'enzyme'

describe('Failed page component', () => {
  it('Failed page should render text', () => {
    const wrapper = shallow( <FailedPage />)
    const text = wrapper.find('p').text()
    expect(text).toEqual('Page not found')
  })
})

