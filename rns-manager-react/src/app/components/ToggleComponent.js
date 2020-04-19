/* eslint-disable react/self-closing-comp */
import React from 'react';
import propTypes from 'prop-types';

const ToggleComponent = (props) => {
  const {
    labelLeft,
    labelRight,
    onChange,
    value,
  } = props;

  const handleChange = (changeTo) => {
    onChange(changeTo);
  };

  return (
    <div className="toggleSwitch">
      <button
        className={!value ? 'left active' : 'left'}
        onClick={() => handleChange(false)}
        type="button"
      >
        {labelLeft}
      </button>
      <label className="switch" htmlFor="toggleSwitch">
        <input
          type="checkbox"
          onChange={() => handleChange(!value)}
          id="toggleSwitch"
          checked={value}
        />
        <span className="slider"></span>
      </label>
      <button
        className={value ? 'right active' : 'right'}
        onClick={() => handleChange(true)}
        type="button"
      >
        {labelRight}
      </button>
    </div>
  );
};

ToggleComponent.defaultProps = {
  labelLeft: 'leftLabel',
  labelRight: 'rightLabel',
  value: false,
};

ToggleComponent.propTypes = {
  labelLeft: propTypes.string,
  labelRight: propTypes.string,
  onChange: propTypes.func.isRequired,
  value: propTypes.bool,
};

export default ToggleComponent;
