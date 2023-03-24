import React, { useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { ErrorResponse, User, UserUpdate } from '../../interfaces/interfaces';
import { USERS_URL } from '../../utils/api-urls';
import { DUMMY_PASSWORD } from '../../utils/constants';
import { AlertBox } from '../alerts/alerts';
import { DangerButton, SubmitButton } from '../layout/buttons';
import FormCard from '../layout/form-card';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../layout/forms';
import MainWrapper from '../layout/main-wrapper';
import ConfirmModal from '../layout/modal';

interface ProfileViewProps {
  user: User;
  handleLogout: () => void;
}

const ProfileView = ({ user, handleLogout }: ProfileViewProps) => {
  const userProfileUrl = `${USERS_URL}/${user.username}`;
  const storedToken = localStorage.getItem('token');

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday.substring(0, 10));
  const [password, setPassword] = useState(DUMMY_PASSWORD);
  const [allowEdit, setAllowEdit] = useState(false);
  const [token] = useState<string>(storedToken ? JSON.parse(storedToken) : '');
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState('');
  const onAlertClose = () => setAlert('');

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleDelete = () => {
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
        console.log('ok');
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
          <Form onSubmit={handleUpdate}>
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
                onClick={handleDelete}
                disabled={!allowEdit}
              />
            </FormCard.Buttons>
          </Form>
        </FormCard>
      </MainWrapper>
      <ConfirmModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      ></ConfirmModal>
    </>
  );
};

export default ProfileView;
