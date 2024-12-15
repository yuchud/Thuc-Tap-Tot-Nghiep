import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { fetchGetCardsToTest } from '../../services/LearningService'; // Adjust the import path as necessary
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import '../../assets/css/TestPage.css';

const TestPage = () => {
  const [cards, setCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [draggedItems, setDraggedItems] = useState(Array(10).fill(null));

  useEffect(() => {
    const fetchCards = async () => {
      const learnedCards = await fetchGetCardsToTest(); // Fetch learned cards from your service
      const randomCards = learnedCards.sort(() => 0.5 - Math.random());
      setCards(randomCards);
      setShuffledCards(randomCards);
    };

    fetchCards();
  }, []);

  const playSound = async (audioUrl) => {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
    await sound.playAsync();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newDraggedItems = Array.from(draggedItems);
    newDraggedItems[result.destination.index] = shuffledCards[result.source.index];
    // setDraggedItems(newDraggedItems);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    for (let i = 0; i < cards.length; i++) {
      if (draggedItems[i] && draggedItems[i].id === cards[i].id) {
        correctCount++;
      }
    }
    alert(`You got ${correctCount} out of 10 correct!`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Test Your Pronunciation
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* <Box display="flex" justifyContent="space-between">
          <Box>
            {cards.map((card, index) => (
              <Box key={card.id} display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => playSound(card.front_audio_url)}>
                  <VolumeUpIcon />
                </IconButton>
                <Box
                  sx={{
                    width: '200px',
                    height: '40px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 2,
                  }}
                >
                  {draggedItems[index] ? draggedItems[index].front_text : ''}
                </Box>
              </Box>
            ))}
          </Box>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  width: '200px',
                  height: '400px',
                  border: '1px solid #ccc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {shuffledCards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          width: '180px',
                          height: '40px',
                          border: '1px solid #ccc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        {card.front_text}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box> */}
      </DragDropContext>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 4 }}>
        Submit
      </Button>
    </Box>
  );
};

export default TestPage;
