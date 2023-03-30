import React, { useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AlertBox } from '../../components/alert-box/alert-box';
import FormCard from '../../components/cards/form-card';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../../components/forms/forms';
import { DangerButton, SubmitButton } from '../../components/buttons/buttons';
import MainWrapper from '../../components/layout/main-layout';
import ConfirmModal from '../../components/modal/modal';
import { useHandleLogout } from '../../hooks/hooks';
import {
  AlertContent,
  ErrorResponse,
  User,
  UserUpdate,
} from '../../interfaces/interfaces';
import { setLoginAlert } from '../../redux/reducers/loginAlert';
import { selectToken } from '../../redux/reducers/token';
import { selectUser, setUser } from '../../redux/reducers/user';
import {
  CREDENTIALS_UPDATED,
  profileDeleteFailed,
  profileUpdateFailed,
  PROFILE_DELETE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
} from '../../utils/alert-content';
import { DUMMY_PASSWORD } from '../../utils/constants';
import { buildUserProfileUrl } from '../../utils/urls';

const ProfileView = () => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login" />;
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const userProfileUrl = buildUserProfileUrl(user.username);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday.substring(0, 10));
  const [password, setPassword] = useState(DUMMY_PASSWORD);
  const [allowEdit, setAllowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<AlertContent | null>(null);

  const handleLogout = useHandleLogout();

  const credentialsHaveChanged = (user: User, updatedUser: User) =>
    user.username !== updatedUser.username ||
    user.password !== updatedUser.password;

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!token) {
        return;
      }
      const data: UserUpdate = {
        username,
        email,
        birthday,
        password: password !== DUMMY_PASSWORD ? password : undefined,
      };

      const response = await fetch(userProfileUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // profile update successful
        const updatedUser: User = await response.json();
        if (credentialsHaveChanged(user, updatedUser)) {
          // logout user
          dispatch(setLoginAlert(CREDENTIALS_UPDATED));
          handleLogout();
        } else {
          // keep user logged in
          dispatch(setUser(updatedUser));
          setAlert(PROFILE_UPDATE_SUCCESS);
          setAllowEdit(false);
          window.location.reload;
        }
      } else {
        // profile update failed
        const { message }: ErrorResponse = await response.json();
        console.error(message); // TODO add to alert message
        setAlert(profileUpdateFailed(message));
      }
    } catch {
      (error: Error) => console.error(error);
    }
  };

  const handleProfileDelete = () => {
    if (!token) {
      return;
    }

    fetch(userProfileUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        dispatch(setLoginAlert(PROFILE_DELETE_SUCCESS));
        handleLogout();
      } else {
        return response.json().then((data: ErrorResponse) => {
          const message = data.message ? data.message : '';
          setAlert(profileDeleteFailed(message));
        });
      }
    });
  };

  return (
    <>
      <MainWrapper>
        <AlertBox alert={alert} onClose={() => setAlert(null)} />
        <FormCard title="Profile">
          <Form onSubmit={handleProfileUpdate}>
            <UsernameInput
              value={username}
              handleValueChange={(e) => setUsername(e.target.value)}
              disabled={!allowEdit}
            />
            <EmailInput
              value={email}
              handleValueChange={(e) => setEmail(e.target.value)}
              disabled={!allowEdit}
            />
            <BirthdayInput
              value={birthday}
              handleValueChange={(e) => setBirthday(e.target.value)}
              disabled={!allowEdit}
            />
            <PasswordInput
              value={password}
              handleValueChange={(e) => setPassword(e.target.value)}
              disabled={!allowEdit}
            />
            <FormCheck
              type="checkbox"
              label="Unlock to update or delete your profile"
              onChange={() => {
                setAllowEdit(!allowEdit);
              }}
            />
            <FormCard.Buttons>
              <SubmitButton label="Update" disabled={!allowEdit} />
              <DangerButton
                label="Delete"
                onClick={handleProfileDelete}
                disabled={!allowEdit}
              />
            </FormCard.Buttons>
          </Form>
        </FormCard>
      </MainWrapper>
      <ConfirmModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleProfileDelete}
      ></ConfirmModal>
    </>
  );
};

export default ProfileView;
