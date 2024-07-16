import React from 'react';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';

const CustomTextArea = ({ label, value, onChange }) => {
  return (
    <>
      <Typography variant="subtitle1">{label}</Typography>
      <TextareaAutosize
        minRows={3}
        style={{
          width: '100%',
          padding: '18.5px 14px',
          maxHeight: '110px',
          overflowY: 'auto', // Enable vertical scrolling
          resize: 'none',
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default CustomTextArea;
