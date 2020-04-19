import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { ChainAddrSelectorComponent } from '../../../components';

class MultiChainAddrFieldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chainId: '0x80000000',
      inputValue: props.preloadedValue,
    };

    this.onChangeChainId = this.onChangeChainId.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidMount() {
    const { get, preloadedValue, changeEdit } = this.props;
    const { chainId } = this.state;
    get(chainId);

    if (preloadedValue) {
      changeEdit();
    }
  }

  componentWillReceiveProps(newProps) {
    const { get, domain } = this.props;
    if (newProps.domain !== domain) {
      const { chainId } = this.state;
      get(newProps.domain, chainId);
    }
  }

  onChangeChainId(event) {
    const chainId = event.target.value;
    this.setState({ chainId });

    const { get } = this.props;
    if (chainId.length === 10) get(chainId);
  }

  onValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const {
      strings, getting, value, changeEdit, editOpen, set, editing,
    } = this.props;
    const { inputValue, chainId } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>chain addr</Col>
          <Col md={3}>
            <ChainAddrSelectorComponent onChange={this.onChangeChainId} list="chains" value={chainId} />
          </Col>
          <Col md={5}>{getting ? '...' : value || 'none'}</Col>
          <Col md={2}>
            <Button variant="link" onClick={changeEdit}>{editOpen ? strings.cancel : strings.edit}</Button>
          </Col>
        </Row>
        {
          editOpen
          && (
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  set(chainId, inputValue);
                }}
                >
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type="text" value={inputValue} onChange={this.onValueChange} />
                      <InputGroup.Append>
                        <Button type="submit" size="sm">{strings.edit}</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </React.Fragment>
          )
        }
        {
          editing && '...'
        }
      </React.Fragment>
    );
  }
}

MultiChainAddrFieldComponent.propTypes = {
  get: propTypes.func.isRequired,
  preloadedValue: propTypes.string.isRequired,
  domain: propTypes.string,
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
  }).isRequired,
  getting: propTypes.bool.isRequired,
  value: propTypes.string,
  changeEdit: propTypes.func.isRequired,
  editOpen: propTypes.bool.isRequired,
  set: propTypes.func.isRequired,
  editing: propTypes.bool.isRequired,
};

MultiChainAddrFieldComponent.defaultProps = {
  domain: null,
  value: null,
};

export default multilanguage(MultiChainAddrFieldComponent);
