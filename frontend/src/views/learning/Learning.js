import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import '../../assets/css/flashcard.css';
import '../../assets/css/course-card.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { fetchGetDeckById } from 'src/services/DeskService';
import { fetchGetCardsToLearnByDeckId } from 'src/services/LearningService';

import { fetchFinishLearning } from 'src/services/LearningService';
const Learning = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([0]);
  const [deck, setDeck] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontAudioUrl, setFrontAudioUrl] = useState('');
  const [LearnedCards, setLearnedCards] = useState([]);
  const navigate = useNavigate();

  const handleGetDeck = async () => {
    const fetchedDeck = await fetchGetDeckById(deckId);
    setDeck(fetchedDeck);
  };

  const fetchCards = async () => {
    const fetchedCards = await fetchGetCardsToLearnByDeckId(deckId);
    setCards(fetchedCards || []);
  };

  const playAudio = (e) => {
    e.stopPropagation();
    const audio = new Audio(cards[currentIndex].front_audio_url);
    audio.play();
  };

  const handleFinishLearning = async () => {
    try {
      await fetchFinishLearning(LearnedCards);
      navigate(`/courses/${deck.course_id}/decks/${deckId}/cards`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextCard = (performance) => {
    let currentCard = cards[currentIndex];
    currentCard.performance += performance;
    currentCard.learned_count += 1;
    // console.log('when add performance', cards);
    let newCards = cards.slice(1);
    if (currentCard.learned_count < 2) {
      // console.log('newCards', newCards);
      const randomIndex = Math.floor(Math.random() * newCards.length);
      newCards.splice(randomIndex, 0, currentCard);
      // console.log('newCards', newCards);
    } else {
      console.log(currentCard);
      setLearnedCards([...LearnedCards, currentCard]);
    }
    if (newCards.length === 0) {
      // handleFinishLearning();
      alert('Hết từ rồi! Hay lắm!');
    }
    setCards(newCards);
  };

  useEffect(() => {
    if (cards.length === 0) {
      handleFinishLearning();
    }
  }, [cards]);
  const handleKnowCard = () => {
    console.log('handleKnowCard');
    handleNextCard(1);
  };
  const handleNotKnowCard = () => {
    console.log('handleNotKnowCard');
    handleNextCard(-1);
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
                      {cards[currentIndex].word_class_name}
                    </Typography>

                    <Typography variant="h6" component="div">
                      {cards[currentIndex].front_pronunciation}
                      <VolumeUpIcon onClick={playAudio} style={{ cursor: 'pointer' }} />
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
            <Button className="not-known-indicator" onClick={handleNotKnowCard}>
              Chưa nhớ từ này
            </Button>
            <Button className="known-indicator" onClick={handleKnowCard}>
              Đã nhớ từ này
            </Button>
            <Typography variant="h6" component="div" sx={{ mt: 3 }}>
              Số thẻ còn lại: {cards.length}
            </Typography>
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
