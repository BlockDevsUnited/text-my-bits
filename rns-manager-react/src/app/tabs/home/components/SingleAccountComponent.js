import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import axios from 'axios';
import { Row, Button } from 'react-bootstrap';


const SingleAccountComponent = ({account}) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const validateClick = () =>{
    console.log('Validate clicked')
  }
  const registerClick = () => {
    axios.get(`http://localhost:3002/register`, {
      params:{
      phoneNoHash: phoneNo, 
      address: account
      }
    }).catch(error =>console.error(error))
    setPhoneNo('')
  };

  return (
    <>
      <Row className="searchBox">
        <div className="col-md-7 offset-md-1 searchInput">
          <input
            placeholder='Phone Number'
            value={phoneNo}
            onChange={evt => setPhoneNo(evt.target.value)}
          />
          <span className="blue"></span>
        </div>
        {/* <div className="col-md-3">
          <Button
            onClick={validateClick}
          >
            Send Code
          </Button>
        </div>
      </Row> */}
      {/* <Row className="searchBox">
        <div className="col-md-7 offset-md-1 searchInput">
          <input
            placeholder='Verification Code'
            value={code}
            onChange={evt => setCode(evt.target.value)}
          />
          </div>
        </Row> */}
        {/* <Row className="searchBox">
          <div className="col-md-7 offset-md-1 searchInput">
            <input
              placeholder='RNS Address'
              value={address}
              onChange={evt => setAddress(evt.target.value)}
            />
            <span className="blue"></span>
          </div> */}
          <div className="col-md-3">
            <Button
              onClick={registerClick}
            >
              Register
            </Button>
          </div>
      </Row>
      {error
      && (
        <Row className="errorMessage">
          <div className="col-md-8 offset-md-2">
            <p>{error}</p>
          </div>
        </Row>
      )}
    </>
  );
};

export default multilanguage(SingleAccountComponent);
