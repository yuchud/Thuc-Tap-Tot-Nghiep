import { Box, Button, Modal, Typography } from '@mui/material';

import '../../assets/css/modal-style.css';

const DeleteConfirmModal = ({ open, onClose, onConfirm, objectName }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-delete-style">
        <Typography variant="h6" id="modal-modal-title" sx={{ mt: 2 }}>
          Xác nhận xóa {objectName}
        </Typography>
        <Typography variant="body1" id="modal-modal-description" sx={{ mt: 2 }}>
          Bạn có chắc chắn muốn xóa {objectName} này?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Hủy
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmModal;
