import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGetCardsByDeckId } from 'src/services/CardService';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import '../../assets/css/flashcard.css';
import '../../assets/css/course-card.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { fetchGetDeckById } from 'src/services/DeskService';

const Learning = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontAudioUrl, setFrontAudioUrl] = useState('');
  const navigate = useNavigate();

  const handleGetDeck = async () => {
    const fetchedDeck = await fetchGetDeckById(deckId);
    setDeck(fetchedDeck);
  };

  const fetchCards = async () => {
    const fetchedCards = await fetchGetCardsByDeckId(deckId);
    console.log(fetchedCards);
    setCards(fetchedCards || []);
  };

  const playAudio = (e) => {
    e.stopPropagation();
    const audio = new Audio(cards[currentIndex].front_audio_url);
    audio.play();
  };

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      // console.log('isFlipped', isFlipped);
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      alert('You have finished studying this deck.');
      navigate('/'); // Redirect to home or any other page
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  React.useEffect(() => {
    handleGetDeck();
    fetchCards();
  }, []);

  React.useEffect(() => {
    // setIsFlipped(false);
  }, [currentIndex]);

  return (
    <Box>
      <h1>{deck.name}</h1>
      {cards.length > 0 ? (
        <Box>
          {/* <Stack> */}
          <Box key={cards[currentIndex].id} className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
            <Box className="flashcard-inner" sx={{ border: '1px solid' }} onClick={toggleFlip}>
              <Box className="front">
                <Card>
                  <CardMedia
                    image={cards[currentIndex].front_image}
                    className="course-image"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography variant="h2" component="div">
                      {cards[currentIndex].front_text}
                    </Typography>

                    <Typography variant="h6" component="div">
                      {cards[currentIndex].front_pronunciation}
                      <VolumeUpIcon onClick={playAudio} style={{ cursor: 'pointer' }} />
                      {/* <Stack>
                          <audio controls key={frontAudioUrl}>
                            <source src={frontAudioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <VolumeUpIcon onClick={playAudio} style={{ cursor: 'pointer' }} />
                        </Stack> */}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box className="back">
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {cards[currentIndex].back_text}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Button className="next-card-indicator" onClick={handleNextCard}>
              Next Card
            </Button>
          </Box>

          {/* </Stack> */}
        </Box>
      ) : (
        <p>Loading cards...</p>
      )}
    </Box>
  );
};

export default Learning;
