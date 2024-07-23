import React, { useState } from 'react';
import CourseItems from './component/DeckItems';
import { Box } from '@mui/system';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { fetchGetDecksByCourseId } from '../../services/DeskService';

import { Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { fetchGetCourseById } from 'src/services/CourseService';
import { set } from 'lodash';

const Courses = () => {
  const account_id = localStorage.getItem('id');
  const courseId = useParams().courseId;
  const [course, setCourse] = useState({});
  const [decks, setDecks] = useState([]);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [coursesPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);

  const navigate = useNavigate();
  const handleFetchDecks = async () => {
    const fetchedDecks = await fetchGetDecksByCourseId(courseId, currentPage);
    if (fetchedDecks) {
      setDecks(fetchedDecks.decks);
      setTotalPages(fetchedDecks.totalPages);
      if (currentPage > fetchedDecks.totalPages) {
        setCurrentPage(fetchedDecks.totalPages);
        return;
      }
    }
  };

  const fetchCourse = async () => {
    const fetchedCourses = await fetchGetCourseById(courseId);
    if (fetchedCourses) {
      setCourse(fetchedCourses);
    }
  };

  React.useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(Math.min(currentPage, totalPages));
      return;
    }
    fetchCourse();
    handleFetchDecks();
  }, [currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
  }, [location]);

  return (
    <Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}>
            <Card>
              <CardMedia
                component="img"
                image={course.image_url}
                alt={course.name}
                sx={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent sx={{ maxHeight: '200px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h1">Bộ thẻ</Typography>
      <CourseItems decks={decks}></CourseItems>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => navigate(`/courses?page=${page}`)}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </Box>
  );
};

export default Courses;
