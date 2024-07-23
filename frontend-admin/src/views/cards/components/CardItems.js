import React from 'react';
import CardItem from './CardItem';
import Grid from '@mui/material/Grid';
import '../../../assets/css/modal-style.css';

const CardItems = ({ cards, wordClasses, onUpdateCardClick, onDeleteCardClick }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
      className="grid-container flex-center"
    >
      {cards.map((card, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <CardItem
            sx={{ height: '100%' }}
            card={card}
            wordClasses={wordClasses}
            onUpdateCardClick={(card) => onUpdateCardClick(card)}
            onDeleteCardClick={(deletedCardId) => onDeleteCardClick(deletedCardId)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardItems;
