import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface AlertProps {
  handleClose: () => void;
}

export const SignupSuccessAlert = ({ handleClose }: AlertProps) => (
  <Alert variant="success" onClose={handleClose} dismissible>
    Your profile has been created.{' '}
    <Alert.Link as={Link} to="/login">
      Please login.
    </Alert.Link>
  </Alert>
);

export const InvalidLoginAlert = ({ handleClose }: AlertProps) => (
  <Alert variant="danger" onClose={handleClose} dismissible>
    Invalid username or password. Please retry.
  </Alert>
);
