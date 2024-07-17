import React from 'react';
import DeckItem from './DeckItem';
import Grid from '@mui/material/Grid';
import '../../../assets/css/modal-style.css';

const DeckItems = ({ decks, onUpdateDeckClick, onDeleteDeckClick }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
      className="grid-container flex-center"
    >
      {decks.map((deck, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <DeckItem
            sx={{ height: '100%' }}
            deck={deck}
            onUpdateDeckClick={(deck) => onUpdateDeckClick(deck)}
            onDeleteDeckClick={(deletedDeckId) => onDeleteDeckClick(deletedDeckId)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DeckItems;
