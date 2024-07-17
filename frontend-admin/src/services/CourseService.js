import { BASE_API_URL } from '../constants/api';
// import axios from 'axios';
import http from 'http-status-codes';
export const fetchGetAllCourses = async (page = 1, limit = 10) => {
  try {
    //const response = await axios.get(`${BASE_API_URL}/courses?page=${page}&limit=${limit}`);
    const response = await fetch(`${BASE_API_URL}/courses?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGetCourseById = async (courseId) => {
  try {
    //const response = await axios.get(`${BASE_API_URL}/courses/${courseId}`);
    const response = await fetch(`${BASE_API_URL}/courses/${courseId}`, {
      method: 'GET',
    });
    console.log(response);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchUpdateCourse = async (courseId, courseData) => {
  try {
    //const result = await axios.put(`${BASE_API_URL}/courses/${courseId}`, courseData);
    const response = await fetch(`${BASE_API_URL}/courses/${courseId}`, {
      method: 'PUT',
      body: courseData,
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    // console.log(error);
    return { error: error.message };
  }
};

export const fetchCreateCourse = async (courseData) => {
  try {
    //const result = await axios.post(`${BASE_API_URL}/courses`, courseData);
    const response = await fetch(`${BASE_API_URL}/courses`, {
      method: 'POST',
      body: courseData,
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const fetchDeleteCourse = async (courseId) => {
  try {
    //const result = await axios.delete(`${BASE_API_URL}/courses/${courseId}`);
    const response = await fetch(`${BASE_API_URL}/courses/${courseId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      if (response.status === http.BAD_REQUEST) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    }
    return response.json();
  } catch (error) {
    return { error: error.message };
  }
};
