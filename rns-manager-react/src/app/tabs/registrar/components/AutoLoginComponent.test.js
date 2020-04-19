import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import AutoLoginComponent from './AutoLoginComponent';

const store = mockStore({
  log_in: en.log_in,
  admin_domain: en.admin_domain,
  register_another_domain: en.register_another_domain,
});

const handleAdminClick = jest.fn();
const handleRegisterNewClick = jest.fn();

const component = mount(
  <Provider store={store}>
    <AutoLoginComponent
      handleManageClick={handleAdminClick}
      handleRegisterNewClick={handleRegisterNewClick}
    />
  </Provider>,
);

describe('AutoLoginComponent', () => {
  it('should matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });


  it('should call functions when buttons are clicked', () => {
    const buttons = component.find('.btn-primary');

    expect(buttons.at(0).text()).toBe(en.admin_domain);
    buttons.at(0).simulate('click');
    expect(handleAdminClick).toHaveBeenCalledTimes(1);

    expect(buttons.at(1).text()).toBe(en.register_another_domain);
    buttons.at(1).simulate('click');
    expect(handleRegisterNewClick).toHaveBeenCalledTimes(1);
  });
});
