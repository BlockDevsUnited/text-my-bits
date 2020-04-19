import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { StartButton } from '../auth';
import { explorer } from '../adapters/explorerAdapter';
import { rskNode } from '../adapters/nodeAdapter';
import { rif as rifAddress } from '../adapters/configAdapter';
import { networkSelector } from '../selectors';

const SetUpTab = multilanguage(({ strings }) => {
  const networkId = process.env.REACT_APP_ENVIRONMENT_ID;
  const networkName = networkSelector(networkId);

  return (
    <Container className="page">
      <Row className="setup">
        <Col style={{ textAlign: 'left' }}>
          <h2>{strings.setup_title}</h2>
          <ol>
            <li>{strings.setup_download_metamask}</li>
            <li>
              {strings.setup_connect_to_rsk}
              <ol>
                <li>{strings.setup_open_network_selector}</li>
                <li>{strings.setup_select_custom_rpc}</li>
                <li>
                  {strings.setup_fill_with}
                  <ul>
                    <li>
                      Network Name:
                      <span>{` ${networkName}`}</span>
                    </li>
                    <li>
                      New RPC URL:
                      <span>{` ${rskNode}`}</span>
                    </li>
                    <li>
                      ChainID:
                      <span>{` ${networkId}`}</span>
                    </li>
                    <li>
                      Symbol:
                      {' '}
                      <span>RBTC</span>
                    </li>
                    <li>
                      Block Explorer URL:
                      <span>{` ${explorer}`}</span>
                    </li>
                  </ul>
                </li>
                <li>{strings.setup_save}</li>
              </ol>
            </li>
            <li>
              {strings.setup_add_rif}
              <ol>
                <li>{strings.setup_open_left_menu}</li>
                <li>{strings.setup_go_to_add_token}</li>
                <li>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  {strings.setup_fill_token_address_with_}
                  <span>{rifAddress}</span>
                </li>
                <li>{strings.setup_next}</li>
                <li>{strings.setup_add_tokens}</li>
              </ol>
            </li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col>
          <StartButton />
        </Col>
      </Row>
    </Container>
  );
});

SetUpTab.propTypes = {
  strings: propTypes.arrayOf(propTypes.string).isRequired,
};

export default SetUpTab;
