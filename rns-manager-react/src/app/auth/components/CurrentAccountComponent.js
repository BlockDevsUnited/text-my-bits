import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';


const CurrentAccountComponet = ({
  strings, name, handleLogOut, handleCurrentClick,
}) => (
  <div className="current">
    <Button
      className="switchButton"
      onClick={handleCurrentClick}
    >
      {name}
    </Button>
    <Button
      variant="outline-primary"
      onClick={handleLogOut}
    >
      {strings.log_out}
    </Button>
  </div>
);

CurrentAccountComponet.propTypes = {
  strings: propTypes.shape({
    log_out: propTypes.string.isRequired,
  }).isRequired,
  name: propTypes.string.isRequired,
  handleLogOut: propTypes.func.isRequired,
  handleCurrentClick: propTypes.func.isRequired,
};

export default multilanguage(CurrentAccountComponet);
