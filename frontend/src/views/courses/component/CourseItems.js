import React from 'react';
import CourseItem from './CourseItem';
import Grid from '@mui/material/Grid';
import '../../../assets/css/modal-style.css';

const CourseItems = ({ courses }) => {
  console.log(courses);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
      className="grid-container flex-center"
    >
      {courses.map((course, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <CourseItem sx={{ height: '100%' }} course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseItems;
