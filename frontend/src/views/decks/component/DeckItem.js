import React from 'react';

// MATERIAL UI COMPONENTS
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

// STYLE COMPONENTS
import '../../../assets/css/modal-style.css';
import '../../../assets/css/course-card.css';

import Divider from '@mui/material/Divider';
//import CourseTags from './CourseTags';
import { useNavigate } from 'react-router';

import CardActionArea from '@mui/material/CardActionArea';
const CourseItem = ({ deck }) => {
  const navigate = useNavigate();

  const openDeck = (deckId) => {
    console.log(deckId);
    navigate(`/courses/${deck.course_id}/decks/${deck.id}/cards`);
  };

  const renderCardDescription = (description) => {
    if (description === null) return '';
    return description.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={openDeck}>
          <CardMedia image={deck.image_url} className="course-image" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {deck.name}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.5em',
                maxHeight: '4.5em',
              }}
            >
              {renderCardDescription(deck.description)}
            </Typography>
            <Divider />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CourseItem;
