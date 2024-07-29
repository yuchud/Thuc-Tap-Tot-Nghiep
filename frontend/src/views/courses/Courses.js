import React, { useState } from 'react';
import CourseItems from './component/CourseItems';
import { fetchGetAllCourses } from '../../services/CourseService';
import { Box } from '@mui/system';
import { Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useParams } from 'react-router';
const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [coursesPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);
  const [learningStateFilter, setLearningStateFilter] = React.useState(useParams().is_public || -1);
  const [isNeedProFilter, setIsNeedProFilter] = React.useState(useParams().is_need_pro || -1);
  const [searchQuery, setSearchQuery] = React.useState(useParams().search || '');

  const navigate = useNavigate();

  const handleFetchCourses = async () => {
    const fetchedCourses = await fetchGetAllCourses(
      currentPage,
      coursesPerPage,
      isNeedProFilter,
      searchQuery,
      learningStateFilter,
    );
    if (fetchedCourses) {
      console.log(fetchedCourses.courses);
      setCourses(fetchedCourses.courses);
      setTotalPages(fetchedCourses.totalPages);
      if (currentPage > fetchedCourses.totalPages) {
        setCurrentPage(fetchedCourses.totalPages);
        return;
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'learningState') {
      setLearningStateFilter(value);
    } else if (name === 'isNeedPro') {
      setIsNeedProFilter(value);
    }
  };

  const handleSearchClick = () => {
    const isNeedPro = isNeedProFilter == -1 ? '' : isNeedProFilter;
    const learningState = learningStateFilter == -1 ? '' : learningStateFilter;
    navigate(
      `/courses?is_need_pro=${isNeedPro}&search_query=${searchQuery}&learning_state=${learningState}`,
    );
  };
  
  React.useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(1);
      return;
    }

    handleFetchCourses();
  }, [currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
    handleFetchCourses();
  }, [location]);

  return (
    <Box>
      <Typography variant="h1">Khóa học</Typography>
      <Box>
        <TextField
          label="Tìm kiếm khóa học theo tên"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal" sx={{ mr: 2 }}>
          <InputLabel id="isNeedPro-label">Cần Pro?</InputLabel>
          <Select
            labelId="isNeedPro-label"
            id="isNeedPro"
            name="isNeedPro"
            value={isNeedProFilter}
            onChange={handleFilterChange}
            label="Is Need Pro"
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            <MenuItem value={1}>Cần Pro</MenuItem>
            <MenuItem value={0}>Miễn phí</MenuItem>
          </Select>
        </FormControl>
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
      <CourseItems courses={courses}></CourseItems>
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
