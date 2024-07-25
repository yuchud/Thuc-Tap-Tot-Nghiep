import React from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchGetCardsByDeckId } from '../../services/CardService';
import { fetchGetDeckById } from '../../services/DeskService';
import CardItems from './component/CardItems';

import { Button } from '@mui/material';
const Cards = () => {
  const deckId = useParams().deckId;
  const [deck, setDeck] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  // *** GET ***
  const fetchGetCards = async () => {
    const fetchGetCards = await fetchGetCardsByDeckId(deckId);
    console.log(fetchGetCards);
    if (fetchGetCards) {
      setCards(fetchGetCards);
    }
  };

  const fetchGetDeck = async () => {
    const fetchDeck = await fetchGetDeckById(deckId);
    if (fetchDeck) {
      setDeck(fetchDeck);
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    fetchGetDeck();
    fetchGetCards();
  }, []);
  return (
    <Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}>
            <Card>
              <CardMedia
                component="img"
                image={deck.image_url}
                alt={deck.name}
                sx={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent sx={{ maxHeight: '200px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {deck.name}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {deck.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h1">Thẻ</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/courses/${deck.course_id}/decks/${deckId}/learning`)}
        >
          Study
        </Button>
        <CardItems cards={cards}></CardItems>
      </Box>
    </Box>
  );
};
export default Cards;
