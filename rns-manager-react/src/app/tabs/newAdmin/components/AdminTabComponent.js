import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router';

import { AuthTabWrapper } from '../../../auth';
import { start } from '../operations';
import { ToggleContainer } from '../../../containers';
import {
  LeftNavContainer,
  ResolverContainer,
} from '../containers';

import { DomainInfoContainer } from '../domainInfo/containers';
import { SubdomainsContainer } from '../subdomains/containers';
import { ReverseContainer } from '../reverse/containers';
import { AddressesContainer } from '../addresses/containers';

const AdminComponent = (props) => {
  const {
    strings,
    toggleAdvancedBasic,
    advancedView,
    domain,
  } = props;

  if (domain) {
    const dispatch = useDispatch();
    useEffect(() => dispatch(start(domain)), [dispatch]);
  }

  return (
    <AuthTabWrapper>
      <div className="admin">
        <Row>
          <Col md={12}>
            <ToggleContainer
              labelLeft={strings.basic}
              labelRight={strings.advanced}
              value={advancedView}
              onChange={toggleAdvancedBasic}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} className="leftnav">
            <LeftNavContainer />
          </Col>
          <Col md={9}>
            <Switch>
              <Route path="/newAdmin/addresses" component={AddressesContainer} />
              <Route path="/newAdmin/subdomains" component={SubdomainsContainer} />

              <Route path="/newAdmin/resolver" component={advancedView ? ResolverContainer : DomainInfoContainer} />
              <Route path="/newAdmin/reverse" component={advancedView ? ReverseContainer : DomainInfoContainer} />
              <Route exact path="/newAdmin" component={DomainInfoContainer} />
            </Switch>
          </Col>
        </Row>
      </div>
    </AuthTabWrapper>
  );
};

AdminComponent.defaultProps = {
  domain: '',
};

AdminComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
  }).isRequired,
  advancedView: propTypes.bool.isRequired,
  toggleAdvancedBasic: propTypes.func.isRequired,
  domain: propTypes.string,
};

export default multilanguage(AdminComponent);
