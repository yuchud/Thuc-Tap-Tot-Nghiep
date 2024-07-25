import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../../assets/css/flashcard.css'; // Ensure this path is correct

const Flashcard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={toggleFlip}>
      <div className="flashcard-inner">
        <div className="front">
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {frontText}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="back">
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {backText}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
