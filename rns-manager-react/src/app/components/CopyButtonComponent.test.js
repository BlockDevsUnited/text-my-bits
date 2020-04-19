import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import CopyButtonComponent from './CopyButtonComponent';
import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';

const store = mockStore({
  copy_text: en.copy_text,
  copied: en.copied,
});

const component = mount(<Provider store={store}><CopyButtonComponent text="hello" /></Provider>);

describe('CopyButtonComponent', () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches the correct text', () => {
    expect(component.find('.copyText').props().defaultValue).toEqual('hello');
  });
});
