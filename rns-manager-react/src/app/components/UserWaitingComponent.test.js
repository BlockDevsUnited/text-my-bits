import React from 'react';
import { mount } from 'enzyme';

import UserWaitingComponent from './UserWaitingComponent';

describe('UserWaitingComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<UserWaitingComponent message="Please Wait!" />);
    expect(component.find('p').text()).toBe('Please Wait!');
    expect(component).toMatchSnapshot();
  });

  it('returns blank when visible is false', () => {
    const component = mount(<UserWaitingComponent message="Test Message!" visible={false} />);
    expect(component.html()).toEqual(null);
  });
});
