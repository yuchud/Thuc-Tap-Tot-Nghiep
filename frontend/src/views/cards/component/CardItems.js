import React from 'react';
import '../../../assets/css/modal-style.css';
import '../../../assets/css/course-card.css';

import { List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';
import formatDate from 'src/utilities/Date';

import CardItem from './CardItem';
const style = {
  py: 0,
  width: '100%',
  maxWidth: 380,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  margin: 'auto',
};

const learned_style = {
  color: 'green',
};

const DeckItems = ({ cards }) => {
  console.log(cards);
  return (
    <Box>
      <List sx={style}>
        {cards.map((card, index) => (
          <>
            <ListItem key={index} style={card.is_learned ? learned_style : {}}>
              <CardItem card={card} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Box>
  );
};

export default DeckItems;
