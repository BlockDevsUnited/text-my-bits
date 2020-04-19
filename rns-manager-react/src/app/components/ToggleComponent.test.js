import React from 'react';
import { mount } from 'enzyme';
import ToggleComponent from './ToggleComponent';


describe('toggleComponent', () => {
  const handleChange = jest.fn();
  it('defaults matches snapshot', () => {
    const component = mount(<ToggleComponent onChange={handleChange} />);
    expect(component.find('input[type="checkbox"]').props().value).toBeFalsy();

    const activeButton = component.find('button.active');
    expect(activeButton.text()).toEqual('leftLabel');

    expect(component).toMatchSnapshot();
  });

  it('toggleSwitch active matches snapshot', () => {
    const component = mount(<ToggleComponent onChange={handleChange} value />);
    expect(component.find('input[type="checkbox"]').props().value).toBeFalsy();

    const activeButton = component.find('button.active');
    expect(activeButton.text()).toEqual('rightLabel');

    expect(component).toMatchSnapshot();
  });

  it('sets the text from the parent', () => {
    const component = mount(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(component.find('button.left').text()).toEqual('LEFT');
    expect(component.find('button.right').text()).toEqual('RIGHT');
  });

  it('calls the function when switched or clicked', () => {
    const component = mount(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(handleChange).toBeCalledTimes(0);
    component.find('#toggleSwitch').simulate('change', { target: { checked: true } });
    expect(handleChange).toBeCalledTimes(1);

    component.find('button.left').simulate('click');
    expect(handleChange).toBeCalledTimes(2);

    component.find('button.right').simulate('click');
    expect(handleChange).toBeCalledTimes(3);
  });

  it('returns correct value when buttons are clicked', () => {
    const component = mount(
      <ToggleComponent onChange={handleChange} />,
    );

    component.find('button.right').simulate('click');
    expect(handleChange).toBeCalledWith(true);

    component.find('button.left').simulate('click');
    expect(handleChange).toBeCalledWith(false);
  });
});
