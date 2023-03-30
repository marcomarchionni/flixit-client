import { AlertContent } from '../interfaces/interfaces';

export const SIGNUP_SUCCESS: AlertContent = {
  message: 'Your profile has been created. Please login.',
  variant: 'success',
  dismissible: true,
};
export const SIGNUP_FAILED: AlertContent = {
  message:
    'Signup failed. There is already a user with your username or email.',
  variant: 'danger',
  dismissible: true,
};
export const LOGIN_FAILED: AlertContent = {
  message: 'Invalid username or password.',
  variant: 'danger',
  dismissible: true,
};
export const PROFILE_UPDATE_SUCCESS: AlertContent = {
  message: 'Profile successfully updated',
  variant: 'success',
  dismissible: true,
};

export const PROFILE_DELETE_SUCCESS: AlertContent = {
  message: 'Profile successfully deleted. Please login or signup.',
  variant: 'success',
  dismissible: true,
};

export const NO_RELATED_MOVIES: AlertContent = {
  message: 'No related movies.',
  variant: 'danger',
};

export const NO_FAVOURITES: AlertContent = {
  message: 'Nothing to show. Add some movies to your favourites!',
  variant: 'danger',
};

export const NO_MOVIES: AlertContent = {
  message: 'Sorry, no movies to show!',
  variant: 'danger',
};
export const CREDENTIALS_UPDATED: AlertContent = {
  message: 'Your credentials have changed. Please login.',
  variant: 'success',
  dismissible: true,
};
export const profileUpdateFailed = (errorMessage: string): AlertContent => {
  const message = `Unable to update your profile. ${errorMessage}`;
  return {
    message,
    variant: 'danger',
    dismissible: true,
  };
};

export const profileDeleteFailed = (errorMessage: string): AlertContent => {
  const message = `Unable to delete your profile. ${errorMessage}`;
  return {
    message,
    variant: 'danger',
    dismissible: true,
  };
};
