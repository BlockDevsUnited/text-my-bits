import reducer from './reducer';
import {
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS, REQUEST_SET_SUBDOMAIN_OWNER,
  RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER, REVERSE_REQUEST_GET, REVERSE_RECEIVE_GET,
  REVERSE_REQUEST_SET, REVERSE_RECEIVE_SET, REVERSE_ERROR_SET, FIFS_MIGRATION_CHECK_SUBDOMAIN,
  FIFS_MIGRATION_REQUEST_CHECK_MIGRATION, FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION,
  FIFS_MIGRATION_REQUEST_MIGRATION, FIFS_MIGRATION_RECEIVE_MIGRATION,
  FIFS_MIGRATION_ERROR_CHECK_MIGRATION, FIFS_MIGRATION_ERROR_MIGRATION,
  TRANSFER_DOMAIN_CHECK_SUBDOMAIN, TRANSFER_DOMAIN_REQUEST_CHECK_OWNER,
  TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER, TRANSFER_DOMAIN_ERROR_CHECK_OWNER,
  TRANSFER_DOMAIN_REQUEST_TRANSFER, TRANSFER_DOMAIN_RECEIVE_TRANSFER,
  TRANSFER_DOMAIN_ERROR_TRANSFER, RENEW_DOMAIN_CHECK_SUBDOMAIN,
  RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME, RENEW_DOMAIN_ERROR_EXPIRATION_TIME,
  RENEW_DOMAIN_REQUEST_EXPIRATION_TIME,
} from './types';

describe('admin reducer', () => {
  it('should handle CLEAR_SUBDOMAINS and remove all subdomains', () => {
    expect(reducer(undefined, {
      type: CLEAR_SUBDOMAINS,
    }).subdomains)
      .toEqual(
        [],
      );
  });

  it('should handle ADD_SUBDOMAIN adding a new subdomain label', () => {
    expect(reducer(undefined, {
      type: ADD_SUBDOMAIN,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '...',
          viewEdit: false,
          editing: false,
        }],
      );
  });

  it('should handle RECEIVE_SUBDOMAIN_OWNER and set owner when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SUBDOMAIN_OWNER,
      label: 'test',
      owner: '0x01',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '0x01',
        }],
      );
  });

  it('should handle RECEIVE_SUBDOMAIN_OWNER keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SUBDOMAIN_OWNER,
      label: 'test2',
      owner: '0x01',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });

  it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and set the opposite value to viewEdit when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
          viewEdit: true,
        },
      ],
    }, {
      type: VIEW_EDIT_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: false,
        }],
      );
  });

  it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
          viewEdit: true,
        },
      ],
    }, {
      type: VIEW_EDIT_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: true,
        }],
      );
  });

  it('should handle REQUEST_SET_SUBDOMAIN_OWNER and set edditing value when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: REQUEST_SET_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editing: true,
        }],
      );
  });

  it('should handle REQUEST_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: REQUEST_SET_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });

  it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and set editing value when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SET_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editing: false,
        }],
      );
  });

  it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SET_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });
});

describe('admin reverse reducer', () => {
  it('should handle REVERSE_REQUEST_GET and set props', () => {
    expect(reducer(undefined, {
      type: REVERSE_REQUEST_GET,
    }).reverse)
      .toEqual(
        {
          getting: true,
          reverseResolution: undefined,
          setting: false,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_GET with empty string and set hasReverse to false', () => {
    expect(reducer(undefined, {
      reverseResolution: '',
      type: REVERSE_RECEIVE_GET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: '',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_GET and set reverse resolution', () => {
    expect(reducer(undefined, {
      reverseResolution: 'test',
      type: REVERSE_RECEIVE_GET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: 'test',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_REQUEST_SET and set setting', () => {
    expect(reducer(undefined, {
      type: REVERSE_REQUEST_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: undefined,
          setting: true,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_SET and set hasReverse', () => {
    expect(reducer(undefined, {
      reverseResolution: 'test',
      type: REVERSE_RECEIVE_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: 'test',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_ERROR_SET and remove setting flag', () => {
    expect(reducer(undefined, {
      type: REVERSE_ERROR_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: undefined,
          setting: false,
        },
      );
  });

  it('should handle undefined action', () => {
    expect(reducer(undefined, {}).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: undefined,
          setting: false,
        },
      );
  });
});

describe('admin fifs migration reducer', () => {
  it('should handle undefined action', () => {
    expect(reducer(undefined, {}).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrating: false,
          migrated: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_CHECK_SUBDOMAIN and subdomain true', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_CHECK_SUBDOMAIN,
      isSubdomain: true,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: false,
          isSubdomain: true,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_CHECK_SUBDOMAIN and subdomain false', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_CHECK_SUBDOMAIN,
      isSubdomain: false,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: false,
          isSubdomain: false,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_REQUEST_CHECK_MIGRATION and set checking flag', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_REQUEST_CHECK_MIGRATION,
    }).fifsMigration)
      .toEqual(
        {
          checking: true,
          migrated: false,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION and set migrated flag to false', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION,
      migrated: false,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION and set migrated flag to true', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION,
      migrated: true,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: true,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_REQUEST_MIGRATION and set migrated flag to true', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_REQUEST_MIGRATION,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: true,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_RECEIVE_MIGRATION and set migrated flag to true', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_RECEIVE_MIGRATION,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: true,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: true,
        },
      );
  });

  it('should handle FIFS_MIGRATION_ERROR_MIGRATION', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_ERROR_MIGRATION,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });

  it('should handle FIFS_MIGRATION_ERROR_CHECK_MIGRATION', () => {
    expect(reducer(undefined, {
      type: FIFS_MIGRATION_ERROR_CHECK_MIGRATION,
    }).fifsMigration)
      .toEqual(
        {
          checking: false,
          migrated: false,
          migrating: false,
          isSubdomain: undefined,
          justMigrated: false,
        },
      );
  });
});

describe('admin transfer domain reducer', () => {
  it('should handle undefined action', () => {
    expect(reducer(undefined, {}).transferDomain)
      .toEqual(
        {
          isSubdomain: null,
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_CHECK_SUBDOMAIN and subdomain true', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_CHECK_SUBDOMAIN,
      isSubdomain: true,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: true,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_CHECK_SUBDOMAIN and subdomain false', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_CHECK_SUBDOMAIN,
      isSubdomain: false,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: false,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_REQUEST_CHECK_OWNER and set checking flag', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_REQUEST_CHECK_OWNER,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: true,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER and set currentOwner and isTokenOwner flag to false', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER,
      isTokenOwner: false,
      currentOwner: 'test',
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: 'test',
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER and set currentOwner and isTokenOwner flag to true', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER,
      isTokenOwner: true,
      currentOwner: 'test',
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: true,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: 'test',
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_REQUEST_TRANSFER and set transferring flag to true', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_REQUEST_TRANSFER,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: true,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_RECEIVE_TRANSFER and set justTransferred flag to true', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_RECEIVE_TRANSFER,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: true,
          checking: false,
          transferring: false,
          justTransferred: true,
          currentOwner: null,
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_ERROR_TRANSFER', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_ERROR_TRANSFER,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: null,
        },
      );
  });

  it('should handle TRANSFER_DOMAIN_ERROR_CHECK_OWNER', () => {
    expect(reducer(undefined, {
      type: TRANSFER_DOMAIN_ERROR_CHECK_OWNER,
    }).transferDomain)
      .toEqual(
        {
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
          isSubdomain: null,
        },
      );
  });

  it('should handle NOT_IMPLEMENTED and return default state', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }).transferDomain)
      .toEqual(
        {
          isSubdomain: null,
          isTokenOwner: false,
          checking: false,
          transferring: false,
          justTransferred: false,
          currentOwner: null,
        },
      );
  });
});

describe('admin renew domain', () => {
  it('should handle undefined action', () => {
    expect(reducer(undefined, {}).renewDomain)
      .toEqual(
        {
          isSubdomain: null,
          checking: false,
          expirationRemaining: 0,
          domain: null,
        },
      );
  });

  it('should handle RENEW_DOMAIN_CHECK_SUBDOMAIN and subdomain true', () => {
    expect(reducer(undefined, {
      type: RENEW_DOMAIN_CHECK_SUBDOMAIN,
      isSubdomain: true,
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: true,
          checking: false,
          expirationRemaining: 0,
          domain: null,
        },
      );
  });

  it('should handle RENEW_DOMAIN_CHECK_SUBDOMAIN and subdomain false', () => {
    expect(reducer(undefined, {
      type: RENEW_DOMAIN_CHECK_SUBDOMAIN,
      isSubdomain: false,
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: false,
          checking: false,
          domain: null,
          expirationRemaining: 0,
        },
      );
  });

  it('should handle RENEW_DOMAIN_REQUEST_EXPIRATION_TIME and set checking flag', () => {
    expect(reducer(undefined, {
      type: RENEW_DOMAIN_REQUEST_EXPIRATION_TIME,
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: null,
          checking: true,
          expirationRemaining: 0,
          domain: null,
        },
      );
  });

  it('should handle RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME and set expirationRemaining', () => {
    expect(reducer(undefined, {
      type: RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME,
      expirationRemaining: 1234,
      domain: 'testing',
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: null,
          checking: false,
          domain: 'testing',
          expirationRemaining: 1234,
        },
      );
  });

  it('should handle RENEW_DOMAIN_ERROR_EXPIRATION_TIME', () => {
    expect(reducer(undefined, {
      type: RENEW_DOMAIN_ERROR_EXPIRATION_TIME,
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: null,
          checking: false,
          domain: null,
          expirationRemaining: 0,
        },
      );
  });

  it('should handle NOT_IMPLEMENTED and return default state', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }).renewDomain)
      .toEqual(
        {
          isSubdomain: null,
          checking: false,
          domain: null,
          expirationRemaining: 0,
        },
      );
  });
});
