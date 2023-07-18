import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Error404 = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <h1 className="display-1 font-weight-bold">404</h1>
          <p className="lead font-weight-bold">Page not found</p>
          <p className="font-weight-bold">
            Oops! The page you are looking for does not exist.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
