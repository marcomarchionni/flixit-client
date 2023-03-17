import React from 'react';
import { Form, FormControl, FormLabel } from 'react-bootstrap';

interface FormInputProps {
  value: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UsernameInput = ({
  value: username,
  handleValueChange: handleUsernameChange,
}: FormInputProps) => {
  return (
    <GenericInput
      value={username}
      type="text"
      label="Username"
      handleValueChange={handleUsernameChange}
      required
      minLength={3}
    />
  );
};

export const PasswordInput = ({
  value: password,
  handleValueChange: handlePasswordChange,
}: FormInputProps) => {
  return (
    <GenericInput
      value={password}
      type="password"
      label="Password"
      handleValueChange={handlePasswordChange}
      required
    />
  );
};

export const EmailInput = ({
  value: email,
  handleValueChange: handleEmailChange,
}: FormInputProps) => {
  return (
    <GenericInput
      value={email}
      type="email"
      label="Email"
      handleValueChange={handleEmailChange}
      required
    />
  );
};

export const BirthdayInput = ({
  value: date,
  handleValueChange: handleDateChange,
}: FormInputProps) => {
  return (
    <GenericInput
      value={date}
      type="date"
      label="Birthday"
      handleValueChange={handleDateChange}
      required
      max={new Date().toISOString().substring(0, 10)}
    />
  );
};

interface GenericInputProps {
  value: string;
  type: string;
  label: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  max?: string;
}

const GenericInput = ({
  value,
  type,
  label,
  handleValueChange,
  required,
  minLength,
  max,
}: GenericInputProps) => {
  return (
    <Form.Group controlId={`form${label}`} className="my-4">
      <FormLabel>{label}</FormLabel>
      <FormControl
        type={type}
        value={value}
        onChange={handleValueChange}
        required={required}
        minLength={minLength}
        max={max}
      ></FormControl>
    </Form.Group>
  );
};
