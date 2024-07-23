import React from 'react';
import '../../../assets/css/modal-style.css';
import '../../../assets/css/course-card.css';

import { List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  margin: 'auto',
};

const DeckItems = ({ cards }) => {
  return (
    <Box>
      <List sx={style}>
        {cards.map((card, index) => (
          <>
            <ListItem key={index}>
              <ListItemText primary={card.front_text} secondary={card.back_text} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Box>
  );
};

export default DeckItems;
