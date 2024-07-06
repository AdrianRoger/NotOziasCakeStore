import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal as MuiModal, Typography, Button } from '@mui/material';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const closeStyle = {
    position: 'absolute',
    top: '0.2rem',
    right: '0.2rem',
    minWidth: '0px',
}

const Modal: React.FC<ModalProps> = ({ open, handleClose, title, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {title}
        </Typography>
        {children}
        <Button onClick={handleClose} sx={closeStyle} color="primary"><CloseIcon /></Button>
      </Box>
    </MuiModal>
  );
};

export default Modal;
