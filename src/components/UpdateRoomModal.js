import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import React, { useState } from "react";
import roomStore from "../roomStore";
export default function UpdateRoomModal({ isOpen, closeModal, roomm }) {
  const [room, setRoom] = useState({
    id: roomm.id,
    title: roomm.title,
    image: roomm.image,
    description: roomm.description,
  });
  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    roomStore.updateRoom(room);
    closeModal();
  };
  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update a room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control
              value={room.title}
              type="text"
              name="title"
              onChange={handleChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Image</InputGroup.Text>
            <Form.Control
              value={room.image}
              type="text"
              name="image"
              onChange={handleChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control
              type="text"
              name="description"
              onChange={handleChange}
              value={room.description}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Update room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
