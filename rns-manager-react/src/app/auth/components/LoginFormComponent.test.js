import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LoginDropdownComponent from './LoginFormComponent';
import mockStore from '../../../../tests/config/mockStore';
import en from '../../../languages/en.json';

const store = mockStore({
  not_domains_owner_message: en.log_out,
  enter: en.enter,
  your_domain: en.your_domain,
  add_account: en.add_account,
  invalid_name: en.invalid_name,
});

describe('LoginDropdownComponent', () => {
  it('renders and matches snapshot when closed', () => {
    const component = mount(
      <Provider store={store}>
        <LoginDropdownComponent
          authError={false}
          showLoginInitState={false}
          handleLogin={jest.fn()}
          domainInputInitialState=""
        />
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('button').text()).toBe('+ Add account');
  });

  it('matches snapshot when open', () => {
    const component = mount(
      <Provider store={store}>
        <LoginDropdownComponent
          authError={false}
          showLoginInitState
          handleLogin={jest.fn()}
          domainInputInitialState=""
        />
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('button').text()).toBe('Enter');
  });
});
