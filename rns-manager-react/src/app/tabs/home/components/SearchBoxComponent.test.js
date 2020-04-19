import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import SearchBoxComponent from './SearchBoxComponent';

const store = mockStore({
  search_placeholder: en.search_placeholder,
  search: en.search,
  blocked_domain: en.blocked_domain,
  invalid_name: en.invalid_name,
});

describe('SearchBoxComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <SearchBoxComponent handleClick={jest.fn()} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('handles successful interaction', () => {
    const handleClick = jest.fn();
    const component = mount(
      <Provider store={store}>
        <SearchBoxComponent handleClick={handleClick} />
      </Provider>,
    );
    component.find('input').simulate('change', { target: { value: 'hello' } });
    component.find('button').simulate('click');

    expect(handleClick).toBeCalledWith('hello');
  });

  it('handles errors with interactions', () => {
    const handleClick = jest.fn();
    const component = mount(
      <Provider store={store}>
        <SearchBoxComponent handleClick={handleClick} />
      </Provider>,
    );

    component.find('input').simulate('change', { target: { value: 'foo' } });
    component.find('button').simulate('click');
    expect(component.find('.errorMessage').find('p').text()).toBe(en.blocked_domain);

    component.find('input').simulate('change', { target: { value: 'foobar!' } });
    component.find('button').simulate('click');
    expect(component.find('.errorMessage').find('p').text()).toBe(en.invalid_name);

    expect(handleClick).toBeCalledTimes(0);
  });
});
