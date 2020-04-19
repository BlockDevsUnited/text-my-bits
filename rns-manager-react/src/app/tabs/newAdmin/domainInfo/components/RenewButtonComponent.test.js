import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import RenewButtonComponent from './RenewButtonComponent';

const store = mockStore({
  expires_on: en.expires_on,
  renew: en.renew,
});

const handleClick = jest.fn();

const initProps = {
  domain: 'jesse.rsk',
  expires: 100,
  handleClick,
  checkingExpirationTime: false,
  isRenewOpen: false,
};

describe('RenewButtonComponent', () => {
  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <RenewButtonComponent {...initProps} />
      </Provider>,
    );
    expect(component).toBeTruthy();
  });

  it('expect renew section to be open', () => {
    const localProps = {
      ...initProps,
      isRenewOpen: true,
    };
    const component = mount(
      <Provider store={store}>
        <RenewButtonComponent {...localProps} />
      </Provider>,
    );
    expect(component.find('button').hasClass('active')).toBeTruthy();
  });

  it('expect nothing when expires is 0', () => {
    const localProps = {
      ...initProps,
      expires: 0,
    };
    const component = mount(
      <Provider store={store}>
        <RenewButtonComponent {...localProps} />
      </Provider>,
    );
    expect(component.html()).toBe('');
  });
});
