import React from 'react';
import { Button } from 'react-bootstrap';
import { InfoLg, Star } from 'react-bootstrap-icons';

export const StarButton = () => {
  return (
    <Button variant="outline-secondary" size="sm" className="mx-1">
      <Star className="bi" />
    </Button>
  );
};

interface InfoButtonProps {
  onInfoClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const InfoButton = ({ onInfoClick }: InfoButtonProps) => {
  return (
    <Button
      onClick={onInfoClick}
      variant="outline-secondary"
      size="sm"
      className="mx-1"
    >
      <InfoLg className="bi" />
    </Button>
  );
};
