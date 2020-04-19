import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';

import { SubdomainViewContainer } from '../containers';
import { getSubdomainListFromLocalStorage } from '../operations';

const SubdomainListComponent = ({
  strings, domain, subdomains, chainId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getSubdomainListFromLocalStorage(domain)), [dispatch]);

  return (
    <div className="major-section">
      <h3 className="blue">{strings.my_subdomains}</h3>
      {Object.entries(subdomains).map((item) => {
        const subdomain = item[1];
        if (!subdomain.isActive) {
          return <></>;
        }

        return (
          <div className="break-below">
            <SubdomainViewContainer
              key={subdomain.name}
              label={subdomain.name}
              labelDisplay={`${subdomain.name}.${domain}`}
              value={subdomain.owner}
              isError={subdomain.editError !== ''}
              isWaiting={subdomain.isWaiting}
              isSuccess={subdomain.isSuccess}
              successTx={subdomain.confirmedTx}
              reset={subdomain.isSuccess}
              validation
              validationChainId={chainId}
              strings={{
                value_prefix: strings.owner,
                error_message: subdomain.editError,
                cancel: strings.cancel,
                submit: strings.submit,
                edit_placeholder: strings.type_owners_address,
                success_message: strings.subdomain_owner_set,
                waiting: strings.wait_transation_confirmed,
                delete: strings.delete,
                edit: strings.edit,
                delete_confirm_text: strings.remove_subdomain_comfirm,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

SubdomainListComponent.propTypes = {
  strings: propTypes.shape({
    my_subdomains: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    type_owners_address: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    subdomain_owner_set: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
    remove_subdomain_comfirm: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  subdomains: propTypes.arrayOf({
    name: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
  }).isRequired,
  chainId: propTypes.number.isRequired,
};

export default multilanguage(SubdomainListComponent);
