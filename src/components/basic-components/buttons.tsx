import React from 'react';
import { Button } from 'react-bootstrap';
import { InfoLg, Star } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const StarButton = () => {
  return (
    <Button variant="outline-secondary" size="sm" className="mx-1">
      <Star className="bi" />
    </Button>
  );
};

interface InfoButtonProps {
  goToLink: string;
}

export const InfoButton = ({ goToLink }: InfoButtonProps) => {
  return (
    <Link to={goToLink}>
      <Button variant="outline-secondary" size="sm" className="mx-1">
        <InfoLg className="bi" />
      </Button>
    </Link>
  );
};

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export const SubmitButton = ({ label, disabled }: SubmitButtonProps) => {
  return (
    <div className="d-flex justify-content-center py-2">
      <Button variant="secondary" type="submit" disabled={disabled}>
        {label}
      </Button>
    </div>
  );
};
