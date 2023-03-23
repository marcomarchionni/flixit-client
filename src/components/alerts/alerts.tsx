import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface AlertProps {
  onClose: () => void;
}

const SignupSuccessAlert = ({ onClose }: AlertProps) => (
  <Alert variant="success" onClose={onClose} dismissible>
    Your profile has been created.
    <Alert.Link as={Link} to="/login">
      Please login.
    </Alert.Link>
  </Alert>
);

const SignupFailedAlert = ({ onClose }: AlertProps) => (
  <Alert variant="danger" onClose={onClose} dismissible>
    Signup failed. There is already a user with your username or email.
  </Alert>
);

const LoginFailedAlert = ({ onClose }: AlertProps) => (
  <Alert variant="danger" onClose={onClose} dismissible>
    Invalid username or password.
  </Alert>
);

const ProfileUpdateSuccessAlert = ({ onClose }: AlertProps) => (
  <Alert variant="success" onClose={onClose} dismissible>
    Profile successfully updated.
  </Alert>
);

const ProfileUpdateFailedAlert = ({ onClose }: AlertProps) => (
  <Alert variant="danger" onClose={onClose} dismissible>
    Error. Unable to update your profile.
  </Alert>
);

const ProfileDeleteFailedAlert = ({ onClose }: AlertProps) => (
  <Alert variant="danger" onClose={onClose} dismissible>
    Error. Profile deletion failed.
  </Alert>
);

const NoFavouritesAlert = () => (
  <Alert key="danger" variant="danger">
    No favourites yet. Add some movies to your favourites!
  </Alert>
);

const NoMoviesAlert = () => (
  <Alert key="danger" variant="danger">
    Sorry, no movies to show!
  </Alert>
);

interface AlertBoxProps {
  alert: string;
  onClose: () => void;
}

export const AlertBox = ({ alert, onClose }: AlertBoxProps) => {
  return (
    <div className="w-100 text-center">
      {alert === 'InvalidLogin' && <LoginFailedAlert onClose={onClose} />}
      {alert === 'SignupSuccessful' && <SignupSuccessAlert onClose={onClose} />}
      {alert === 'SignupFailed' && <SignupFailedAlert onClose={onClose} />}
      {alert === 'ProfileUpdateSuccess' && (
        <ProfileUpdateSuccessAlert onClose={onClose} />
      )}
      {alert === 'ProfileUpdateFailed' && (
        <ProfileUpdateFailedAlert onClose={onClose} />
      )}
      {alert === 'ProfileDeleteFailed' && (
        <ProfileDeleteFailedAlert onClose={onClose} />
      )}
      {alert === 'NoFavouriteMovies' && <NoFavouritesAlert />}
      {alert === 'NoMovies' && <NoMoviesAlert />}
    </div>
  );
};

interface AlertSimpleBoxProps {
  alert: string;
}

export const AlertSimpleBox = ({ alert }: AlertSimpleBoxProps) => (
  <div className="w-100 text-center">
    {alert === 'NoFavouriteMovies' && <NoFavouritesAlert />}
    {alert === 'NoMovies' && <NoMoviesAlert />}
  </div>
);
