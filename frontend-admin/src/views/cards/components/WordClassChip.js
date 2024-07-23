import React from 'react';

import Chip from '@mui/material/Chip';
const WordClassChip = ({ wordClass }) => {
  console.log(wordClass);
  let color = null;
  const label = wordClass.name;
  switch (wordClass.id) {
    case 1:
      color = 'primary';
      break;
    case 2:
      color = 'secondary';
      break;
    case 3:
      color = 'success';
      break;
    case 4:
      color = 'info';
      break;
    case 5:
      color = 'warning';
      break;
    case 6:
      color = 'danger';
      break;
    default:
      color = 'default';
  }

  return <Chip size="small" label={label} color={color} />;
};

export default WordClassChip;
