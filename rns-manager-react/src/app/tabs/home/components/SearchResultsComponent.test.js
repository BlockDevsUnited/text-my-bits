import React from 'react';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import mockStore from '../../../../../tests/config/mockStore';
import en from '../../../../languages/en.json';

import SearchResultsComponent from './SearchResultsComponent';

const store = mockStore({
  results: en.results,
  available: en.available,
  domain_not_available: en.domain_not_available,
  register: en.register,
  search_for_another: en.search_for_another,
  year: en.year,
});

const handleClick = jest.fn();

describe('SearchResultsComponent', () => {
  it('renders and matches snapshot when available', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <SearchResultsComponent
            domain="foobar"
            available
            isSearching={false}
            blocked={false}
            rifCost={6}
            handleClick={handleClick}
          />
        </HashRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('h3').text()).toBe('foobar.rsk');
    expect(component.find('.status').text()).toBe('available');
    expect(component.find('p.cost').text()).toBe('6 rif / year');
  });

  it('renders and matches snapshot when not available', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <SearchResultsComponent
            domain="foobar"
            available={false}
            blocked={false}
            isSearching={false}
            rifCost={2}
            handleClick={handleClick}
          />
        </HashRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();

    expect(component.find('h3').text()).toBe('foobar.rsk');
    expect(component.find('.status').text()).toBe('not available');
  });

  it('displays nothing when no domain is provided', () => {
    const component = mount(
      <Provider store={store}>
        <HashRouter>
          <SearchResultsComponent
            available={false}
            blocked={false}
            isSearching={false}
            rifCost={2}
            handleClick={handleClick}
          />
        </HashRouter>
      </Provider>,
    );

    expect(component.html()).toBeFalsy();
  });
});
