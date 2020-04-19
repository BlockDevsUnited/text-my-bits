import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Spinner } from 'react-bootstrap';

class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { intervalId: false };

    this.checkStatus = this.checkStatus.bind(this);
  }

  componentDidMount() {
    const intervalId = setInterval(this.checkStatus, 3000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  checkStatus() {
    const { checkCanReveal } = this.props;
    checkCanReveal();
  }

  render() {
    const { strings } = this.props;
    return (
      <div className="waiting">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Spinner animation="border" variant="primary" className="break-below" />
            <p>
              {strings.wait_for_two_minutes}
              <br />
              {strings.wait_period_reason}
            </p>

            <h3 className="blue major-section">
              {strings.did_you_know}
              ...
            </h3>
            <p className="lead minor-section">
              {strings.tip1}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

LoadingComponent.propTypes = ({
  checkCanReveal: propTypes.func.isRequired,
  strings: propTypes.shape({
    wait_for_two_minutes: propTypes.string.isRequired,
    wait_period_reason: propTypes.string.isRequired,
    did_you_know: propTypes.string.isRequired,
    tip1: propTypes.string.isRequired,
    domain_requested: propTypes.string.isRequired,
  }).isRequired,
});

export default multilanguage(LoadingComponent);
