import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';

import { validateAddress } from '../../../../validations';
import { UserErrorComponent, UserWaitingComponent } from '../../../../components';
import { ChecksumErrorContainer } from '../../../../containers';
import { getChainNameById } from '../operations';
import allNetworks from '../networks.json';

const AddNewAddressComponent = ({
  strings,
  networks,
  handleClick,
  handleClose,
  chainAddresses,
  newSuccess,
}) => {
  // all available addresses have been set, return before states are set
  if (networks.length === 0) {
    return (<></>);
  }

  const [localError, setLocalError] = useState('');
  const [checksumError, setChecksumError] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0][1].chainId);
  const [address, setAddress] = useState('');
  const [localReset, setLocalRest] = useState(false);

  const networkName = getChainNameById(selectedNetwork);

  // reset the state and select new network when newSuccess is finished
  if (newSuccess && !localReset) {
    setSelectedNetwork(networks[0][1].chainId);
    setAddress('');
    setLocalRest(true);
  }

  const handleAddClick = () => {
    const networkInfo = allNetworks.filter(net => net.id === selectedNetwork)[0];

    if (networkInfo.validation && networkInfo.validation === 'HEX') {
      const validationChainId = networkInfo.name === 'RSK' ? process.env.REACT_APP_ENVIRONMENT_ID : null;

      switch (validateAddress(address, validationChainId)) {
        case 'Invalid address':
          return setLocalError('Invalid address');
        case 'Invalid checksum':
          return setChecksumError(true);
        default:
      }
    }

    handleClick(selectedNetwork, address);
    setLocalRest(false);
    return true;
  };

  const handleChecksumClick = (lowerAddress) => {
    setChecksumError(false);
    setAddress(lowerAddress);
    setLocalRest(false);
    handleClick(selectedNetwork, address);
  };

  const handleErrorClose = () => {
    setLocalError('');
    handleClose(networkName);
  };

  const {
    isWaiting,
    isError,
    isEditing,
    errorMessage,
  } = chainAddresses[networkName];

  return (
    <div className="break-above addNew">
      <Row>
        <Col>
          <h3 className="gray normal-size">
            {strings.add_new_address}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <select
            onChange={evt => setSelectedNetwork(evt.target.value)}
            value={selectedNetwork}
          >
            {networks.map(chainAddress => (
              <option value={chainAddress[1].chainId}>{chainAddress[0]}</option>))}
          </select>
        </Col>
        <Col md={7}>
          <input
            placeholder={strings.paste_your_address}
            onChange={evt => setAddress(evt.target.value)}
            value={address}
            disabled={isEditing}
          />
        </Col>
        <Col md={2}>
          <Button
            onClick={handleAddClick}
            disabled={isEditing}
            className="add"
          >
            {strings.add}
          </Button>
        </Col>
      </Row>

      <UserErrorComponent
        message={errorMessage || localError}
        visible={isError || (localError !== '')}
        handleCloseClick={() => handleErrorClose()}
      />

      <UserWaitingComponent
        message={strings.wait_transation_confirmed}
        visible={isWaiting}
      />

      {checksumError
        && (
          <ChecksumErrorContainer
            show={checksumError}
            inputValue={address}
            handleClick={handleChecksumClick}
          />
        )
      }

    </div>
  );
};

AddNewAddressComponent.propTypes = {
  strings: propTypes.shape({
    add: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    add_new_address: propTypes.string.isRequired,
    paste_your_address: propTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  networks: propTypes.array.isRequired,
  chainAddresses: propTypes.shape().isRequired,
  handleClick: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
  newSuccess: propTypes.bool.isRequired,
};

export default multilanguage(AddNewAddressComponent);
