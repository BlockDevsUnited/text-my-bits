import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import UserSuccessComponent from './UserSuccessComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
  view_explorer: en.view_explorer,
});

describe('UserSuccessComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<Provider store={store}><UserSuccessComponent /></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const component = mount(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(component.find('strong').text()).toEqual('Test Title');
    expect(component.find('p').at(2).text()).toEqual('Test Message!');
  });

  it('renders with explorer address', () => {
    const component = mount(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" address="0x12345" />
      </Provider>,
    );

    expect(component.find('p.explorer').text()).toEqual(en.view_explorer);
  });

  it('returns blank when visible is false', () => {
    const component = mount(
      <Provider store={store}>
        <UserSuccessComponent title="Test Title" message="Test Message!" visible={false} />
      </Provider>,
    );

    expect(component.html()).toEqual('');
  });
});
