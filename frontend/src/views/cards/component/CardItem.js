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
import '../../../assets/css/modal-style.css';
import '../../../assets/css/course-card.css';

import Divider from '@mui/material/Divider';
//import CourseTags from './CourseTags';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';

import CardActionArea from '@mui/material/CardActionArea';
const CourseItem = ({ card }) => {
  const navigate = useNavigate();

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
        <CardActionArea>
          <CardMedia image={card.front_image} className="course-image" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.front_text}
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
              {renderCardDescription(card.back_text)}
            </Typography>
            <Divider />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CourseItem;
