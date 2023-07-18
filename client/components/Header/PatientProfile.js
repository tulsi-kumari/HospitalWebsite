import React from 'react';
import { Container } from 'react-bootstrap';

const PatientProfile = ({user}) => {
  return (
     <Container className="d-flex align-items-center justify-content-center vh-100 ">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card rounded">
            <div className="card-body ">
              <h5 className="card-title ">Patient Profile</h5>
              <p><strong>Email:</strong>{user.email}</p>
              <p><strong>Username:</strong>{user.username}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Disease:</strong>{user.disease}</p>
              <p><strong>Contact:</strong> +91 {user.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default PatientProfile