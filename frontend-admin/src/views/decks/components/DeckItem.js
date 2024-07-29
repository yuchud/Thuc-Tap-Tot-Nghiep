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
import Stack from '@mui/material/Stack';

import Chip from '@mui/material/Chip';
import { formatDate } from '../../../utilities/Date';

const DeckItem = ({ deck, onUpdateDeckClick, onDeleteDeckClick }) => {
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
  const navigate = useNavigate();

  const openDeck = (deckId) => {
    navigate(`/courses/${deck.course_id}/decks/${deckId}/cards`);
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
          <Stack sx={{ mt: 1 }}>
            <DeckTags is_public={deck.is_public} />
          </Stack>
        </CardContent>

        <CardActionsStyled>
          <BottomNavigation showLabels sx={{ width: '100%' }}>
            <BottomNavigationActionStyled
              label="Xem thẻ"
              icon={<LaunchIcon />}
              onClick={() => openDeck(deck.id)}
            />
            <BottomNavigationActionStyled
              label="Chỉnh sửa"
              icon={<UpdateIcon />}
              onClick={() => onUpdateDeckClick(deck)}
            />
            <BottomNavigationActionStyled
              label="Xóa"
              icon={<DeleteForeverIconStyled />}
              onClick={() => onDeleteDeckClick(deck.id)}
            />
          </BottomNavigation>
        </CardActionsStyled>
        <Box sx={{ m: 1 }}>
          <Chip label={`${deck.card_count} thẻ`} sx={{ mr: 1 }} />
          <Chip label={`${deck.learned_account_count} người học`} />
          <Divider sx={{ m: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Chỉnh sửa lần cuối: {formatDate(deck.updated_at)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default DeckItem;
