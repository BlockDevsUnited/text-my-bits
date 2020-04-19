import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import UserErrorComponent from './UserErrorComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  close: en.close,
});

describe('UserErrorComponent', () => {
  it('renders and matches snapshot', () => {
    const component = mount(<Provider store={store}><UserErrorComponent /></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('renders correct title and message text', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" />
      </Provider>,
    );

    expect(component.find('strong').text()).toEqual('Test Title');
    expect(component.find('p').at(1).text()).toEqual('Test Message!');
  });

  it('returns blank when visible is false', () => {
    const component = mount(
      <Provider store={store}>
        <UserErrorComponent title="Test Title" message="Test Message!" visible={false} />
      </Provider>,
    );

    expect(component.html()).toEqual('');
  });
});
