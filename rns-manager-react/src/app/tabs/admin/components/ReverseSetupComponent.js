import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

class ReverseSetupComponent extends Component {
  componentDidMount() {
    const { getReverse } = this.props;
    getReverse();
  }

  render() {
    const {
      reverseResolution, getting, setting, setReverse, strings,
    } = this.props;

    if (getting || setting) {
      return <Spinner animation="grow" variant="primary" />;
    }

    if (reverseResolution) {
      return strings.has_reverse;
    }

    return <Button disabled={setting} onClick={setReverse}>{strings.set_reverse}</Button>;
  }
}

ReverseSetupComponent.defaultProps = {
  reverseResolution: undefined,
};

ReverseSetupComponent.propTypes = {
  strings: propTypes.shape({
    has_reverse: propTypes.string.isRequired,
    set_reverse: propTypes.string.isRequired,
  }).isRequired,
  getReverse: propTypes.func.isRequired,
  setReverse: propTypes.func.isRequired,
  reverseResolution: propTypes.string,
  getting: propTypes.bool.isRequired,
  setting: propTypes.bool.isRequired,
};

export default multilanguage(ReverseSetupComponent);
