import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../../tests/config/mockStore';
import en from '../../../../../languages/en.json';

import TransferSuccessModalComponent from './TransferSuccessModalComponent';

const store = mockStore({
  was_transfered: en.was_transfered,
  register_new_domain: en.upgrade_domain,
  login_another_domain: en.login_another_domain,
});

const handleClick = jest.fn();

const component = mount(
  <Provider store={store}>
    <TransferSuccessModalComponent
      domain="jesse.rsk"
      handleClick={handleClick}
    />
  </Provider>,
);

describe('TransferSuccessModalComponent', () => {
  it('calls function with value when clicked', () => {
    component.find('button').at(0).simulate('click');
    expect(handleClick).toBeCalledWith('newAdmin');
    component.find('button').at(1).simulate('click');
    expect(handleClick).toBeCalledWith('search');

    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
