import React, { useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AlertBox } from '../../components/alerts/alerts';
import { DangerButton, SubmitButton } from '../../components/layout/buttons';
import FormCard from '../../components/cards/form-card';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../../components/layout/forms';
import MainWrapper from '../../components/layout/main-layout';
import ConfirmModal from '../../components/layout/modal';
import { ErrorResponse, UserUpdate } from '../../interfaces/interfaces';
import { selectToken } from '../../redux/reducers/token';
import { selectUser } from '../../redux/reducers/user';
import { buildUserProfileUrl } from '../../utils/urls';
import { DUMMY_PASSWORD } from '../../utils/constants';
import { useHandleLogout } from '../../utils/hooks';

const ProfileView = () => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login" />;
  const token = useSelector(selectToken);

  const userProfileUrl = buildUserProfileUrl(user.username);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday.substring(0, 10));
  const [password, setPassword] = useState(DUMMY_PASSWORD);
  const [allowEdit, setAllowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState('');

  const onAlertClose = () => setAlert('');

  const handleLogout = useHandleLogout();

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
        setAlert('ProfileUpdateSuccess');
        setAllowEdit(false);
        window.location.reload;
      } else {
        const { message }: ErrorResponse = await response.json();
        console.error(message);
        setAlert('ProfileUpdateFailed');
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
        handleLogout();
      } else {
        return response.json().then((data: ErrorResponse) => {
          const failureReason = data.message ? `. ${data.message}.` : '';
          console.error(failureReason);
          setAlert('DeleteFailed');
        });
      }
    });
  };

  return (
    <>
      <MainWrapper>
        <AlertBox alert={alert} onClose={onAlertClose} />
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
