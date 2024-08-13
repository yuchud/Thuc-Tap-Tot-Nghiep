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
import { Button } from 'bootstrap';

import { fetchGetAccount } from '../../../services/AccountService';

import LinearProgress from '@mui/material/LinearProgress';
import Badge from '@mui/material/Badge';

import { formatDate } from '../../../utilities/Date';
const CourseItem = ({ course }) => {
  const renderCardDescription = (description) => {
    if (description === null) return '';
    return description.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));
  };
  const navigate = useNavigate();
  const openCourse = async (courseId) => {
    const account = await fetchGetAccount();
    console.log(account);
    if (course.is_need_pro && !account.is_pro) {
      return navigate(`/pro-plans`);
    }
    navigate(`/courses/${courseId}/decks`);
  };

  return (
    <Box>
      {course.is_need_pro && <Badge color="warning" badgeContent="Pro" />}
      <Card
        sx={{
          maxWidth: 345,
          border:
            course.learned_deck_count === course.deck_count &&
            course.learned_card_count === course.card_count
              ? '2px solid green'
              : course.learned_deck_count !== 0
              ? '2px solid orange'
              : course.is_need_pro
              ? '2px solid yellow'
              : '2px solid black',
        }}
      >
        <CardActionArea onClick={() => openCourse(course.id)}>
          <CardMedia image={course.image_url} className="course-image" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.name}
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
              {renderCardDescription(course.description)}
            </Typography>
            <Box>
              <LinearProgress
                variant="determinate"
                value={course.deck_progress}
                sx={{ marginTop: '10px' }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                {course.learned_deck_count} / {course.public_deck_count} bộ thẻ đã học
              </Typography>
            </Box>
            <Box>
              <LinearProgress
                variant="determinate"
                value={course.card_progress}
                sx={{ marginTop: '10px' }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                {course.learned_card_count} / {course.public_card_count} thẻ đã học
              </Typography>
            </Box>
            {course.last_reviewed_at && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                  Lần học cuối: {formatDate(course.last_reviewed_at)}
                </Typography>
              </Box>
            )}
            <hr />
            <Typography variant="body2" color="text.secondary">
              Số người học: {course.learned_account_count}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CourseItem;
