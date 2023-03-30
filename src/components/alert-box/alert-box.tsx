import React from 'react';
import { Alert } from 'react-bootstrap';
import { AlertContent } from '../../interfaces/interfaces';

interface AlertBoxProps {
  alert: AlertContent | null;
  onClose: () => void;
}

export const AlertBox = ({ alert, onClose }: AlertBoxProps) => {
  if (!alert) return <></>;
  return (
    <Alert
      variant={alert.variant}
      onClose={onClose}
      dismissible={alert.dismissible}
      className="w-100 text-center"
    >
      {alert.message}
    </Alert>
  );
};
