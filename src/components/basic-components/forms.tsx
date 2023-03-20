import React from 'react';
import { Form, FormControl, FormLabel } from 'react-bootstrap';

interface FormInputProps {
  value: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const UsernameInput = ({
  value: username,
  handleValueChange: handleUsernameChange,
  disabled,
}: FormInputProps) => {
  return (
    <GenericInput
      value={username}
      type="text"
      label="Username"
      handleValueChange={handleUsernameChange}
      required
      minLength={3}
      disabled={disabled}
    />
  );
};

export const PasswordInput = ({
  value: password,
  handleValueChange: handlePasswordChange,
  disabled,
}: FormInputProps) => {
  return (
    <GenericInput
      value={password}
      type="password"
      label="Password"
      handleValueChange={handlePasswordChange}
      required
      disabled={disabled}
    />
  );
};

export const EmailInput = ({
  value: email,
  handleValueChange: handleEmailChange,
  disabled,
}: FormInputProps) => {
  return (
    <GenericInput
      value={email}
      type="email"
      label="Email"
      handleValueChange={handleEmailChange}
      required
      disabled={disabled}
    />
  );
};

export const BirthdayInput = ({
  value: date,
  handleValueChange: handleDateChange,
  disabled,
}: FormInputProps) => {
  return (
    <GenericInput
      value={date}
      type="date"
      label="Birthday"
      handleValueChange={handleDateChange}
      required
      max={new Date().toISOString().substring(0, 10)}
      disabled={disabled}
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
  disabled?: boolean;
}

const GenericInput = ({
  value,
  type,
  label,
  handleValueChange,
  required,
  minLength,
  max,
  disabled,
}: GenericInputProps) => {
  return (
    <Form.Group controlId={`form${label}`} className="mb-4">
      <FormLabel>{label}</FormLabel>
      <FormControl
        type={type}
        value={value}
        onChange={handleValueChange}
        required={required}
        minLength={minLength}
        max={max}
        disabled={disabled}
      ></FormControl>
    </Form.Group>
  );
};
