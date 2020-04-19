import React from 'react';
import { Link } from 'react-router-dom';
import { multiChainResolver } from '../adapters/configAdapter';
import { txTypes } from './types';

const displaySetTx = (title, description, action = null) => ({
  title,
  description: `${title}: ${description}`,
  action,
});

export default strings => (params) => {
  if (!params) return null;
  switch (params.type) {
    case txTypes.SET_OWNER: return displaySetTx(strings.notifications_new_owner, params.value);
    case txTypes.SET_RESOLVER: return displaySetTx(
      strings.notifications_new_resolver,
      params.value,
      params.value.toLowerCase() === multiChainResolver
        && (
          <Link
            to="/multiChainResolver?action=chain_addr&defaultValue=btcaddress"
            className="btn btn-primary"
          >
              {strings.set_address}
          </Link>
        ),
    );
    case txTypes.SET_TTL: return displaySetTx(strings.notifications_new_ttl, params.value);
    case txTypes.SET_SUBNODE_OWNER: return displaySetTx(
      strings.notifications_new_subdomain_owner,
      params.owner,
    );
    case txTypes.SET_ADDR: return displaySetTx(strings.notifications_new_addr, params.value);
    case txTypes.SET_CONTENT: return displaySetTx(strings.notifications_new_content, params.value);
    case txTypes.SET_CHAIN_ADDR: return displaySetTx(strings.notifications_new_chain_addr, `${params.chainId} - ${params.value}`);
    case txTypes.SET_STR: return displaySetTx(strings.notifications_new_str, params.value);
    case txTypes.SET_REVERSE_RESOLUTION: return {
      title: strings.notifications_new_reverse_resolution,
    };
    case txTypes.MIGRATE_FIFS_REGISTRAR: return {
      title: strings.notifications_migrated_domain,
    };
    case txTypes.REGISTRAR_COMMIT: return {
      title: strings.notifications_registrar_committed,
    };
    case txTypes.REVEAL_COMMIT: return {
      title: strings.notifications_registrar_revealed,
      description: strings.login_explanation,
    };
    case txTypes.TRANSFER_DOMAIN_TOKEN: return {
      title: strings.notifications_transferred_domain_token,
    };
    case txTypes.RENEW_DOMAIN: return {
      title: strings.renew_domain_successfully,
    };
    default: return null;
  }
};
