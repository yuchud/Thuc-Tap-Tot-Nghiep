import React, { useState } from 'react';
import CourseItems from './component/CourseItems';
import { fetchGetAllCourses } from '../../services/CourseService';
import { Box } from '@mui/system';
import { Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [coursesPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);

  const navigate = useNavigate();

  const handleFetchCourses = async () => {
    const fetchedCourses = await fetchGetAllCourses(currentPage, coursesPerPage);
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
  }, [location]);

  return (
    <Box>
      <Typography variant="h1">Khóa học</Typography>
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
