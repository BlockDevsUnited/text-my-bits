import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Form, FormControl, InputGroup, Button, Card, Spinner,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidName } from '../../../validations';
import { RegisterProcessContainer } from '../../../containers';

// eslint-disable-next-line max-len
function getDisplayState(domain, domainStateLoading, owned, blocked, owner, requestingOwner, requestingCost, rifCost, registerDomain, strings) {
  if (!domain) return 'Search for a domain.';
  if (domainStateLoading || requestingCost || requestingOwner) {
    return <Spinner animation="grow" variant="primary" />;
  }

  if (owned) {
    return (
      <Card.Text>
        {strings.owned}
        <br />
        <strong>
          {strings.owner}
          {': '}
        </strong>
        {owner}
        <br />
        <Link to={`/resolve?name=${domain}.rsk`} className="btn btn-primary">{strings.resolve}</Link>
        <br />
        <Link to="/search">{strings.search_another_domain}</Link>
      </Card.Text>
    );
  }

  if (blocked) {
    return strings.blocked_domain;
  }

  return (
    <>
      <p>{strings.open}</p>
      <p>
        <Button
          onClick={() => registerDomain(domain)}
        >
          {strings.register_your_domain}
        </Button>
      </p>
      <p>
        {`${rifCost} ${strings.rif_per_year}`}
        <br />
        <em>{strings.discount}</em>
      </p>
    </>
  );
}

class DomainStateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.domain,
      invalid: null,
    };

    this.searchValueChange = this.searchValueChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.validate = this.validate.bind(this);
    this.changeShowProcess = this.changeShowProcess.bind(this);
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && getState) getState(domain);
  }

  componentWillReceiveProps(newProps) {
    const { getState } = newProps;
    const { domain } = this.props;
    if (domain !== newProps.domain) getState(newProps.domain);
  }

  onSearch(event) {
    event.preventDefault();
    const { domain, getState, search } = this.props;
    const { searchValue } = this.state;
    if (!this.validate()) {
      if (domain === searchValue) getState(searchValue);
      else search(searchValue);
    }
  }

  searchValueChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  validate() {
    const { searchValue } = this.state;
    const invalid = isValidName(searchValue);
    this.setState({ invalid });
    return invalid;
  }

  changeShowProcess() {
    const { showProcess } = this.state;
    this.setState({ showProcess: !showProcess });
  }

  render() {
    const {
      strings, domain, owned, domainStateLoading, blocked, owner, requestingOwner,
      requestingCost, rifCost, registerDomain,
    } = this.props;
    const { searchValue, invalid, showProcess } = this.state;

    let domainDisplay = '';

    if (domain) {
      domainDisplay = domain.split('.').length === 1 ? `${domain}.rsk` : domain;
    }

    const displayState = getDisplayState(
      domain, domainStateLoading, owned, blocked, owner, requestingOwner, requestingCost,
      rifCost, registerDomain, strings,
    );

    return (
      <Container className="page">
        <Row>
          <Col lg={12} className="text-center main-title-box">
            <h1>
              {strings.home_title}
            </h1>
            <span className="bajada mb-3 d-block">
              {strings.home_subtitle}
            </span>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Form onSubmit={this.onSearch}>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl type="text" value={searchValue} onChange={this.searchValueChange} className={invalid && 'is-invalid'} />
                  <InputGroup.Append>
                    <InputGroup.Text>{strings.rskTld}</InputGroup.Text>
                  </InputGroup.Append>
                  <div className="invalid-feedback">
                    {invalid}
                  </div>
                </InputGroup>
              </Col>
              <Col className="text-center">
                <Button type="submit" variant="primary-rif">{strings.search}</Button>
              </Col>
            </Form>
          </Col>

        </Row>
        <Row className="justify-content center mt-5">
          <Col lg={12} className="text-center">
            <h2>{domainDisplay}</h2>
            {displayState}
          </Col>
          <Col lg={12} className="text-center">
            <Button variant="primary-rif" className="mt-5" onClick={this.changeShowProcess}>
              {!showProcess ? strings.learn_about_process : strings.hide}
            </Button>
            {showProcess && <RegisterProcessContainer />}
          </Col>
        </Row>
      </Container>
    );
  }
}

DomainStateComponent.propTypes = {
  strings: propTypes.shape({
    search: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    learn_about_process: propTypes.string.isRequired,
    hide: propTypes.string.isRequired,
    process: propTypes.string.isRequired,
    learn_more: propTypes.string.isRequired,
    rskTld: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    home_title: propTypes.string.isRequired,
    home_subtitle: propTypes.string.isRequired,
    rif_per_year: propTypes.string.isRequired,
    discount: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  owned: propTypes.bool,
  owner: propTypes.string,
  blocked: propTypes.bool,
  requestingOwner: propTypes.bool.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
  search: propTypes.func.isRequired,
  requestingCost: propTypes.bool.isRequired,
  rifCost: propTypes.number.isRequired,
  registerDomain: propTypes.func.isRequired,
};

DomainStateComponent.defaultProps = {
  owned: false,
  owner: '',
  blocked: false,
};

export default multilanguage(DomainStateComponent);
