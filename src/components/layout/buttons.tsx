import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { InfoLg, Star, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

interface StarButtonProps {
  handleToggle: () => void;
  isOn: boolean;
}

export const StarButton = ({
  handleToggle,
  isOn: isFavourite,
}: StarButtonProps) => {
  const [favourite, setFavourite] = useState(isFavourite);
  const handleClick = () => {
    setFavourite(!favourite);
    handleToggle();
  };
  return (
    <Button
      variant="outline-dark"
      size="sm"
      onClick={handleClick}
      className="mx-1"
    >
      {favourite ? <StarFill className="bi" /> : <Star className="bi" />}
    </Button>
  );
};

interface InfoButtonProps {
  goToLink: string;
}

export const InfoButton = ({ goToLink }: InfoButtonProps) => (
  <Link to={goToLink}>
    <Button variant="outline-dark" size="sm" className="mx-1">
      <InfoLg className="bi" />
    </Button>
  </Link>
);

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export const SubmitButton = ({ label, disabled }: SubmitButtonProps) => (
  <Button
    variant="secondary"
    type="submit"
    disabled={disabled}
    className="mx-2"
  >
    {label}
  </Button>
);

interface SimpleButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export const DangerButton = ({
  label,
  disabled,
  onClick,
}: SimpleButtonProps) => (
  <Button
    variant="danger"
    disabled={disabled}
    className="mx-2"
    onClick={onClick}
  >
    {label}
  </Button>
);

export const CardButtons = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => <div className="d-flex justify-content-center mb-2">{children}</div>;
