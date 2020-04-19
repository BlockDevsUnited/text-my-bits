import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';

import { YourAddressesContainer, AddNewAddressContainer, MigrateToMultiResolverContainer } from '../containers';
import { getAllChainAddresses } from '../operations';

import { PUBLIC_RESOLVER, UNKNOWN_RESOLVER, STRING_RESOLVER } from '../../resolver/types';

const AddressesComponent = ({
  domain, resolverName, gettingResolver, strings,
}) => {
  if (gettingResolver) {
    return (<></>);
  }

  if (resolverName === STRING_RESOLVER) {
    return <p>{strings.string_resolver_message}</p>;
  }

  if (resolverName === UNKNOWN_RESOLVER) {
    return <p>{strings.custom_resolver_message}</p>;
  }

  const dispatch = useDispatch();
  useEffect(() => dispatch(getAllChainAddresses(domain, resolverName)), [dispatch]);

  return (
    <div className="yourAddress">
      <YourAddressesContainer />
      <AddNewAddressContainer />
      {resolverName === PUBLIC_RESOLVER && <MigrateToMultiResolverContainer />}
    </div>
  );
};

AddressesComponent.propTypes = {
  strings: propTypes.shape({
    your_addresses: propTypes.string.isRequired,
    string_resolver_message: propTypes.string.isRequired,
    custom_resolver_message: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  resolverName: propTypes.string.isRequired,
  gettingResolver: propTypes.bool.isRequired,
};

export default multilanguage(AddressesComponent);
