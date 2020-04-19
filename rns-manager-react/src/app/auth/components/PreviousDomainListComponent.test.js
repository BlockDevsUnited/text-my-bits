import React from 'react';
import { shallow } from 'enzyme';
import PreviousDomainListComponent from './PreviousDomainListComponent';

describe('PreviousDomainListComponent', () => {
  const sampleDomains = [
    { domain: 'foobar.rsk', owner: '0x123456' },
    { domain: 'barfoo.rsk', owner: '0x123456' },
  ];

  it('renders without crashing', () => {
    const component = shallow(
      <PreviousDomainListComponent previousDomains={sampleDomains} switchLoginClick={jest.fn()} />,
    );
    expect(component).toMatchSnapshot();

    expect(component.find('button').at(0).text()).toBe('foobar.rsk');
    expect(component.find('button').at(1).text()).toBe('barfoo.rsk');
  });

  it('handles interaction', () => {
    const switchLoginClick = jest.fn();

    const component = shallow(
      <PreviousDomainListComponent
        previousDomains={sampleDomains}
        switchLoginClick={switchLoginClick}
      />,
    );

    component.find('button').at(0).simulate('click');
    expect(switchLoginClick).toBeCalledWith('foobar.rsk');

    component.find('button').at(1).simulate('click');
    expect(switchLoginClick).toBeCalledWith('barfoo.rsk');
  });
});
