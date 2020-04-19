import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Image } from 'react-bootstrap';

import copy from '../../assets/img/copy.svg';

const CopyButtonComponent = ({ strings, text }) => {
  const [showResponse, setShowResponse] = useState(false);

  let copyTextField = null;

  const handleClick = () => {
    copyTextField.select();
    document.execCommand('copy');
    setShowResponse(true);
    setTimeout(() => setShowResponse(false), 1500);
  };

  return (
    <div className="copyButton">
      <button
        type="button"
        onClick={handleClick}
      >
        <Image
          src={copy}
          alt={strings.copy_text}
        />
      </button>
      {showResponse && <span className="response">{strings.copied}</span>}
      <input
        type="text"
        className="copyText"
        ref={(input) => { copyTextField = input; }}
        defaultValue={text}
      />
    </div>
  );
};

CopyButtonComponent.propTypes = {
  strings: propTypes.shape({
    copy_text: propTypes.string.isRequired,
    copied: propTypes.string.isRequired,
  }).isRequired,
  text: propTypes.string.isRequired,
};

export default multilanguage(CopyButtonComponent);
