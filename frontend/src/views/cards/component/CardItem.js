import React from 'react';
import { List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';
import { formatDate } from 'src/utilities/Date';

const CardItem = ({ card }) => {
  return (
    <>
      <ListItemText primary={card.front_text} secondary={card.back_text} />
      <ListItemText
        primary={`Số người học: ${card.learned_account_count}`}
        secondary={card.is_learned && <p>{formatDate(card.last_reviewed_at)}</p>}
      />
    </>
  );
};

export default CardItem;
