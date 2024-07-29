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

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { set } from 'lodash';

const Courses = () => {
  const account_id = localStorage.getItem('id');
  const courseId = useParams().courseId;
  const [course, setCourse] = useState({});
  const [decks, setDecks] = useState([]);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [coursesPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);

  const [learningStateFilter, setLearningStateFilter] = React.useState(useParams().is_public || -1);
  const [isNeedProFilter, setIsNeedProFilter] = React.useState(useParams().is_need_pro || -1);
  const [searchQuery, setSearchQuery] = React.useState(useParams().search || '');

  const navigate = useNavigate();
  const handleFetchDecks = async () => {
    const fetchedDecks = await fetchGetDecksByCourseId(
      courseId,
      currentPage,
      coursesPerPage,
      searchQuery,
      learningStateFilter,
    );
    if (fetchedDecks) {
      // console.log(fetchedDecks);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'learningState') {
      setLearningStateFilter(value);
    }
  };

  const handleSearchClick = () => {
    const learningState = learningStateFilter == -1 ? '' : learningStateFilter;
    navigate(
      `/courses/${courseId}/decks?search_query=${searchQuery}&learning_state=${learningState}`,
    );
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
    handleFetchDecks();
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
      <Box>
        <TextField
          label="Tìm kiếm khóa học theo tên"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal">
          <InputLabel id="learningState-label">Trạng thái học</InputLabel>
          <Select
            labelId="learningState-label"
            id="learningState"
            name="learningState"
            value={learningStateFilter}
            onChange={handleFilterChange}
            label="Learning State"
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            <MenuItem value={2}>Đã học</MenuItem>
            <MenuItem value={1}>Đang học</MenuItem>
            <MenuItem value={0}>Chưa học</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          sx={{ ml: 2, mt: 2 }}
        >
          Tìm kiếm và lọc
        </Button>
      </Box>
      <Typography variant="h2" sx={{ textAlign: 'center', margin: '10px' }}>
        Đã học {course.learned_deck_count} / {course.deck_count} bộ thẻ
      </Typography>
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
