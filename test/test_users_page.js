import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme';
import store from '../src/store';
import UsersPage from '../src/components/users'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('users page rendered succeed', () => {
  it('user list rendered', () => {
    const wrapper = mount(<UsersPage userStore={store} />)
    expect(wrapper.find('.user').length).to.equal(2)
  })
})
