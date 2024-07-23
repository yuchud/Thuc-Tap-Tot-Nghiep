const { DEFAULT_COURSE_IMAGE } = require('../config/app.config');
const courseModel = require('../models/course.model');
const azureStorage = require('../utils/azure-storage.util');
const fs = require('fs');

const courseService = {
  getAllCourses: async (page = 1, limit = 10, isPublic = null) => {
    try {
      const offset = (page - 1) * limit;
      const whereClause = {};
      if (isPublic !== null) {
        whereClause.is_public = isPublic;
      }
      const { count, rows } = await courseModel.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });
      return {
        total: count,
        courses: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getCourseById: async (courseId) => {
    try {
      const course = await courseModel.findByPk(courseId);
      return course;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getCourseByName: async (name) => {
    try {
      const course = await courseModel.findOne({
        where: {
          name: name,
        },
      });
      return course;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  isDuplicatedName: async (name, id = -1) => {
    try {
      const course = await courseService.getCourseByName(name);
      if (course === null) {
        return false;
      }

      if (course.id == id) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  createCourse: async ({ name, description, image }) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'courses'), // Azure container name
          image
        );
      }

      if (imageUrl === null) {
        imageUrl = DEFAULT_COURSE_IMAGE;
      }
      const course = await courseModel.create({
        name,
        description,
        image_url: imageUrl,
      });
      return course;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateCourse: async (
    courseId,
    { name, description, image, is_public, is_need_pro }
  ) => {
    try {
      const course = await courseModel.findByPk(courseId);
      if (!course) {
        return null;
      }

      let imageUrl = null;
      if (image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'courses'), // Azure container name
          image // Construct a unique path for the image
        );
      }
      imageUrl = imageUrl || course.image_url;

      await courseModel.update(
        {
          name,
          description,
          image_url: imageUrl,
          is_public,
          is_need_pro,
        },
        {
          where: {
            id: courseId,
          },
        }
      );

      return course;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const course = await courseModel.findByPk(courseId);
      if (!course) {
        return null;
      }
      await courseModel.destroy({
        where: {
          id: courseId,
        },
      });
      return course;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = courseService;
