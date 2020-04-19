import React from 'react';
import { FormControl } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

function idToString(chainId, strings) {
  switch (chainId) {
    case '0x80000089': return strings.rsk;
    case '0x80000000': return strings.bitcoin;
    case '0x8000003c': return strings.ethereum;
    case '0x80000091': return strings.bitcoin_cash;
    case '0x80000002': return strings.litecoin;
    default: return chainId;
  }
}

export default multilanguage((props) => {
  const { strings, onChange, value } = props;

  return (
    <React.Fragment>
      <FormControl type="text" onChange={onChange} list="chains" value={idToString(value, strings)} placeholder={strings.select_chain} />
      <datalist id="chains">
        <option value="0x80000089">{strings.rsk}</option>
        <option value="0x80000000">{strings.bitcoin}</option>
        <option value="0x8000003c">{strings.ethereum}</option>
        <option value="0x80000091">{strings.bitcoin_cash}</option>
        <option value="0x80000002">{strings.litecoin}</option>
      </datalist>
    </React.Fragment>
  );
});
