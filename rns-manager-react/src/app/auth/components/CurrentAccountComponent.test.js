import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import CurrentAccountComponent from './CurrentAccountComponent';
import mockStore from '../../../../tests/config/mockStore';
import en from '../../../languages/en.json';

const store = mockStore({
  log_out: en.log_out,
});

describe('CurrentAccountComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <CurrentAccountComponent
            name="foobar.rsk"
            handleLogOut={jest.fn()}
            switchLoginClick={jest.fn()}
            handleCurrentClick={jest.fn()}
          />
        </HashRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('button').at(0).text()).toBe('foobar.rsk');
    expect(component.find('button').at(1).text()).toBe(en.log_out);
  });
});
