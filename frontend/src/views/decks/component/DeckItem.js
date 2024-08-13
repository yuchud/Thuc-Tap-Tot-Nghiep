import React from 'react';

// MATERIAL UI COMPONENTS
import { Box, Card, CardContent, CardMedia, LinearProgress, Typography } from '@mui/material';

// STYLE COMPONENTS
import '../../../assets/css/modal-style.css';
import '../../../assets/css/course-card.css';

import Divider from '@mui/material/Divider';
//import CourseTags from './CourseTags';
import { useNavigate } from 'react-router';

import CardActionArea from '@mui/material/CardActionArea';
import { formatDate } from 'src/utilities/Date';
const CourseItem = ({ deck }) => {
  const navigate = useNavigate();

  const openDeck = () => {
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
      <Card
        sx={{
          maxWidth: 345,
          border:
            deck.learned_card_count === deck.public_card_count
              ? '2px solid green'
              : deck.public_card_count !== 0
              ? '2px solid orange'
              : '2px solid black',
        }}
      >
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
            {/* <p>{deck.process}</p> */}
            <LinearProgress
              variant="determinate"
              value={deck.progress}
              sx={{ marginTop: '10px' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
              {deck.learned_card_count} / {deck.public_card_count} thẻ đã học
            </Typography>
            {deck.last_reviewed_at && (
              <Box>
                <Divider />
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                  Lần học cuối: {formatDate(deck.last_reviewed_at)}
                </Typography>
              </Box>
            )}
            <hr />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
              Số người học: {deck.learned_account_count}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CourseItem;
