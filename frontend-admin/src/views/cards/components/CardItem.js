import React from 'react';

// MATERIAL UI COMPONENTS
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

// ICONS
import UpdateIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';

// STYLE COMPONENTS
import styled from '@mui/material/styles/styled';
import '../../../assets/css/courseCard.css';

import Divider from '@mui/material/Divider';
import DeckTags from '../../courses/components/CourseTags';
import { useNavigate } from 'react-router';
import WordClassChip from './WordClassChip';
import Stack from '@mui/material/Stack';

import Chip from '@mui/material/Chip';

import { formatDate } from '../../../utilities/Date';
const CardItem = ({ card, wordClasses, onUpdateCardClick, onDeleteCardClick }) => {
  const CardActionsStyled = styled(CardActions)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  });
  const BottomNavigationActionStyled = styled(BottomNavigationAction)({
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  });
  const DeleteForeverIconStyled = styled(DeleteForeverIcon)({
    color: 'red',
  });

  const findWordClassById = (wordClassId) => {
    return wordClasses.find((wordClass) => wordClass.id === wordClassId);
  };
  const navigate = useNavigate();

  //   const openDeck = (deckId) => {
  //     navigate(`/courses/${deck.course_id}/decks/${deckId}/cards`);
  //   };

  //   const renderCardDescription = (description) => {
  //     if (description === null) return '';
  //     return description.split('\n').map((line, index, array) => (
  //       <React.Fragment key={index}>
  //         {line}
  //         {index !== array.length - 1 && <br />}
  //       </React.Fragment>
  //     ));
  //   };

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia image={card.front_image} className="course-image" title={card.front_text} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.front_text}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {card.front_pronunciation}
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
            {card.back_text}
          </Typography>
          <Divider />
          <Stack direction={'row'} sx={{ mt: 1 }}>
            <DeckTags is_public={card.is_public} />
            <WordClassChip wordClass={findWordClassById(card.word_class_id)} />
          </Stack>
        </CardContent>

        <CardActionsStyled>
          <BottomNavigation showLabels sx={{ width: '100%' }}>
            <BottomNavigationActionStyled
              label="Chỉnh sửa"
              icon={<UpdateIcon />}
              onClick={() => onUpdateCardClick(card)}
            />
            <BottomNavigationActionStyled
              label="Xóa"
              icon={<DeleteForeverIconStyled />}
              onClick={() => onDeleteCardClick(card.id)}
            />
          </BottomNavigation>
        </CardActionsStyled>
        <Box sx={{ m: 1 }}>
          <Chip label={`${card.learned_account_count} người học`} />
          <Divider sx={{ m: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Chỉnh sửa lần cuối: {formatDate(card.updated_at)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default CardItem;
