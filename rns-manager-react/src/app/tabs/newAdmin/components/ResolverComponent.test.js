import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import ResolverComponent from './ResolverComponent';

const store = mockStore({
  resolver: en.resolver,
});

const component = mount(<Provider store={store}><ResolverComponent /></Provider>);

describe('ResolverComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
