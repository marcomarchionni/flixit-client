import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { ErrorResponse, User } from '../../interfaces/interfaces';
import { USERS_URL } from '../../utils/api-urls';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
} from '../basic-components/forms';
import ConfirmModal from '../basic-components/modal';

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
  const [password, setPassword] = useState(user.password);
  const [allowEdit, setAllowEdit] = useState(false);
  const [token] = useState<string>(storedToken ? JSON.parse(storedToken) : '');
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      return;
    }
    const data = {
      username,
      email,
      birthday,
      password,
    };

    fetch(userProfileUrl, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Profile updated!');
          window.location.reload();
        } else {
          return response.json().then((data: ErrorResponse) => {
            const failureReason = data.message ? `. ${data.message}.` : '';
            alert(`Profile update failed${failureReason}`);
          });
        }
      })
      .catch((err: Error) => console.error(err));
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
        handleLogout();
      } else {
        return response.json().then((data: ErrorResponse) => {
          const failureReason = data.message ? `. ${data.message}.` : '';
          alert(`Profile deletion failed${failureReason}`);
        });
      }
    });
  };

  return (
    <Row className="my-4">
      <Col Col sm={6} className="mx-auto">
        <Card className="p-4 h-100">
          <Card.Body>
            <h2 className="text-center py-2">Profile</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId={`formUsername`} className="my-4">
                <FormLabel>Username</FormLabel>
                <FormControl
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  disabled={!allowEdit}
                ></FormControl>
              </Form.Group>
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
              <div className="d-flex justify-content-center py-4">
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!allowEdit}
                  className="mx-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowModal(true)}
                  disabled={!allowEdit}
                  className="mx-2"
                >
                  Delete
                </Button>
                <ConfirmModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                  handleDelete={handleDelete}
                ></ConfirmModal>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileView;
