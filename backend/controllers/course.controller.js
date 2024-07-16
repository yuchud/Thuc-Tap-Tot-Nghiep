const courseService = require('../services/course.service');
const http = require('http-status-codes');
const objectName = require('../utils/props-and-objects.util').OBJECTS.COURSE;
const actionCreate = require('../utils/props-and-objects.util').ACTIONS.CREATE;
const actionUpdate = require('../utils/props-and-objects.util').ACTIONS.UPDATE;
const actionDelete = require('../utils/props-and-objects.util').ACTIONS.DELETE;
const nameProp = require('../utils/props-and-objects.util').PROS.NAME;
const requestMessageUtil = require('../utils/requestMessage.util');

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const courses = await courseService.getAllCourses(+page, +limit);
      res.status(http.StatusCodes.OK).json(courses);
    } catch (error) {
      console.log(error);
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  createCourse: async (req, res) => {
    const { name, description } = req.body;
    const image = req.file;
    try {
      if (!name.trim()) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.requiredObject(nameProp, objectName),
        });
      }

      const isDuplicatedName = await courseService.isDuplicatedName(name);
      if (isDuplicatedName) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.duplicatedObject(nameProp, objectName),
        });
      }

      await courseService.createCourse({
        name,
        description,
        image,
      });
      res.status(http.StatusCodes.CREATED).json({
        message: requestMessageUtil.successActionObject(
          actionCreate,
          objectName
        ),
      });
    } catch (error) {
      console.log(error);
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  updateCourse: async (req, res) => {
    const { id } = req.params;
    const { name, description, is_need_pro, is_public } = req.body;
    const image = req.file;
    try {
      if (!name) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.requiredObject(nameProp, objectName),
        });
      }
      const isDuplicatedName = await courseService.isDuplicatedName(name, id);
      if (isDuplicatedName) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.duplicatedObject(nameProp, objectName),
        });
      }
      await courseService.updateCourse(id, {
        name,
        description,
        image,
        is_public,
        is_need_pro,
      });
      res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(
          actionUpdate,
          objectName
        ),
      });
    } catch (error) {
      console.log(error);
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  deleteCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCourse = await courseService.deleteCourse(id);
      if (!deletedCourse) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(
          actionDelete,
          objectName
        ),
      });
    } catch (error) {
      console.log(error);
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
};

module.exports = courseController;
