import { BASE_API_URL } from '../constants/api';

export const fetchGetCourseById = async (courseId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/courses/${courseId}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGetAllCourses = async (page = 1, limit = 12) => {
  try {
    const response = await fetch(`${BASE_API_URL}/courses/public?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
