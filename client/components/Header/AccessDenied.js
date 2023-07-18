import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccessDenied = () => {
  const navigate=useNavigate();

  const handleGoHome=()=>{
       navigate('/')
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col className="text-center">
          <h1 className="display-1 font-weight-bold">Access Denied</h1>
          <p className="lead font-weight-bold">
            Oops! You don't have permission to access this page.
          </p>
          <Button variant="primary" onClick={handleGoHome}>
             Login to get Access
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;