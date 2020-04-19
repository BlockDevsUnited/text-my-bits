import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import ResolutionComponent from './ResolutionComponent';
import { ChainAddrSelectorComponent } from '../../../components';

const ResolveChainAddr = (props) => {
  const {
    strings, loading, error, value, getChainAddr,
  } = props;

  return (
    <Container>
      <Row>
        <Col>
          <h2>{strings.chain_address}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ChainAddrSelectorComponent
            list="chains"
            onChange={(e) => {
              if (e.target.value && e.target.value.length === 10) {
                getChainAddr(e.target.value);
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ResolutionComponent error={error} loading={loading} value={value} />
        </Col>
      </Row>
    </Container>
  );
};

ResolveChainAddr.propTypes = {
  strings: propTypes.shape({
    chain_address: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  value: propTypes.string,
  getChainAddr: propTypes.func.isRequired,
};

ResolveChainAddr.defaultProps = {
  error: null,
  value: null,
};

export default multilanguage(ResolveChainAddr);
