import * as React from 'react';
import Modal from '@mui/material/Modal';
import styled from "styled-components";

export const ModalComponent = ({ open, children, handleClose }) => {
  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container >
        {children}
      </Container>
    </Modal>
  );
};


const Container = styled.div`
  background-color: rgb(255, 255, 255);
  margin: 1rem;
  padding: 0.2rem;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;
`;

