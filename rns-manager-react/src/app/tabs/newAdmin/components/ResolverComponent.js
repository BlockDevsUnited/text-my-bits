import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const ResolverComponent = (props) => {
  const { strings } = props;
  return (
    <div>
      <h1>{strings.resolver}</h1>
    </div>
  );
};

ResolverComponent.propTypes = {
  strings: propTypes.shape({
    resolver: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(ResolverComponent);
