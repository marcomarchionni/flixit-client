import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, LinkProps } from 'react-router-dom';

type FormCardProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

const FormCard = ({ title, children }: FormCardProps) => {
  return (
    <Card className="p-4" style={{ width: '28rem' }}>
      <Card.Body>
        <Card.Title as="h2" className="text-center py-2">
          {title}
        </Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

const Buttons = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className="d-flex justify-content-center mt-4">{children}</div>
);

type FormLinkProps = {
  children: string;
  to: LinkProps['to'];
};

const FormLink = ({ children, to }: FormLinkProps) => (
  <div className="d-flex justify-content-center mt-3">
    <Link to={to}>{children}</Link>
  </div>
);

FormCard.Buttons = Buttons;
FormCard.Link = FormLink;

export default FormCard;
