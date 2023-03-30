import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const ConfirmModal = ({
  show,
  handleClose,
  handleDelete,
}: ConfirmModalProps) => (
  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="flex-grow-1 text-center ms-2">
          Delete Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        All your data, including your list of Favourites, will be lost. Would
        you like to proceed?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export default ConfirmModal;
