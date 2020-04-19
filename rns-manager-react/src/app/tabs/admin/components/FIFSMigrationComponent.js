import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Spinner, Button, Container,
} from 'react-bootstrap';

class FIFSMigrationComponent extends Component {
  componentDidMount() {
    const { checkIfSubdomainOrMigrated } = this.props;
    checkIfSubdomainOrMigrated();
  }

  render() {
    const {
      isSubdomain, checking, migrating, strings, migrate, migrated, justMigrated,
    } = this.props;

    if (!isSubdomain && (!migrated || justMigrated)) {
      const title = <h3>{strings.fifs_migration}</h3>;
      let html;

      if (checking || migrating) {
        html = <Spinner animation="grow" variant="primary" />;
      } else if (justMigrated) {
        html = strings.already_migrated;
      } else {
        html = (
          <Button disabled={migrating} onClick={migrate}>{strings.fifs_migrate}</Button>
        );
      }

      return (
        <Container>
          {title}
          {html}
          <hr />
        </Container>
      );
    }

    return '';
  }
}

FIFSMigrationComponent.defaultProps = {
  isSubdomain: undefined,
};

FIFSMigrationComponent.propTypes = {
  strings: propTypes.shape({
    already_migrated: propTypes.string.isRequired,
    fifs_subdomain: propTypes.string.isRequired,
    fifs_migrate: propTypes.string.isRequired,
    due_migration_date: propTypes.string.isRequired,
    action_needed: propTypes.string.isRequired,
    fifs_migration: propTypes.string.isRequired,
  }).isRequired,
  checkIfSubdomainOrMigrated: propTypes.func.isRequired,
  migrate: propTypes.func.isRequired,
  isSubdomain: propTypes.bool,
  migrated: propTypes.bool.isRequired,
  checking: propTypes.bool.isRequired,
  migrating: propTypes.bool.isRequired,
  justMigrated: propTypes.bool.isRequired,
};

export default multilanguage(FIFSMigrationComponent);
