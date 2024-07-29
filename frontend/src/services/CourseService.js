import { BASE_API_URL } from '../constants/api';
import { GetCurrentAccountId } from './AuthService';
export const fetchGetCourseById = async (courseId) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/courses/${courseId}?account_id=${GetCurrentAccountId()}`,
      {
        method: 'GET',
      },
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGetAllCourses = async (
  page = 1,
  limit = 12,
  isNeedProFilter,
  searchQuery,
  learningStateFilter,
) => {
  try {
    // console.log(
    //   `${BASE_API_URL}/courses/public?page=${page}&limit=${limit}&is_need_pro=${isNeedProFilter}&search_query=${searchQuery}&account_id=${GetCurrentAccountId()}&learning_state=${learningStateFilter}`,
    // );
    const response = await fetch(
      `${BASE_API_URL}/courses/public?page=${page}&limit=${limit}&is_need_pro=${isNeedProFilter}&search_query=${searchQuery}&account_id=${GetCurrentAccountId()}&learning_state=${learningStateFilter}`,
      {
        method: 'GET',
      },
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
