import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import UpgradeComponent from './UpgradeComponent';

const store = mockStore({
  upgrade: en.upgrade,
  upgrade_domain: en.upgrade_domain,
  upgrade_domain_explanation: en.upgrade_domain_explanation,
});

const handleClick = jest.fn();

const component = mount(
  <Provider store={store}>
    <UpgradeComponent
      isFifsMigrated={false}
      isMigrating={false}
      handleClick={handleClick}
    />
  </Provider>,
);

describe('UpgradeComponent', () => {
  it('renders and matches snapshop', () => {
    expect(component).toMatchSnapshot();
  });

  it('calls function when clicked', () => {
    component.find('button').simulate('click');
    expect(handleClick).toBeCalled();
  });
});
