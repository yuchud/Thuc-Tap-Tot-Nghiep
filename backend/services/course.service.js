const { DEFAULT_COURSE_IMAGE } = require('../config/app.config');
const courseModel = require('../models/course.model');
const azureStorage = require('../utils/azure-storage.util');
const accountCourseDetailModel = require('../models/account-course-detail.model');
const { Op } = require('sequelize');

const courseService = {
  getAllCourses: async (
    page = 1,
    limit = 10,
    isPublic = -1,
    isNeedPro = -1,
    searchQuery = null,
    accountId = null,
    learning_state = -1
  ) => {
    try {
      if (page < 1) {
        page = 1;
      }
      // console.log(isPublic, isNeedPro, searchQuery);
      const offset = (page - 1) * limit;
      const whereClause = {};
      if (isPublic && isPublic != -1) {
        whereClause.is_public = isPublic;
      }
      console.log(isPublic, isPublic != -1);
      if (isNeedPro && isNeedPro != -1) {
        whereClause.is_need_pro = isNeedPro;
      }
      if (searchQuery) {
        whereClause.name = { [Op.like]: `%${searchQuery}%` };
      }
      // let orderClause = null;
      // if (!accountId) {
      //   orderClause = [['updated_at', 'DESC']];
      // }
      let { count, rows } = await courseModel.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
        // order: orderClause,
      });
      if (accountId) {
        const filteredCourse = await Promise.all(
          rows.map(async (course) => {
            const accountCourseDetail = await accountCourseDetailModel.findOne({
              where: {
                account_id: accountId,
                course_id: course.id,
              },
            });
            course.dataValues.learned_deck_count = accountCourseDetail ? accountCourseDetail.learned_deck_count : 0;
            course.dataValues.learned_card_count = accountCourseDetail ? accountCourseDetail.learned_card_count : 0;
            course.dataValues.deck_progress = accountCourseDetail
              ? (accountCourseDetail.learned_deck_count / course.public_deck_count) * 100
              : 0;
            course.dataValues.card_progress = accountCourseDetail
              ? (accountCourseDetail.learned_card_count / course.public_card_count) * 100
              : 0;
            course.dataValues.last_reviewed_at = accountCourseDetail ? accountCourseDetail.last_reviewed_at : null;

            let isLearning = false;
            let isLearned = false;

            if (accountCourseDetail) {
              if (
                accountCourseDetail.learned_card_count > 0 &&
                accountCourseDetail.learned_card_count < course.card_count
              ) {
                isLearning = true;
              }
              if (accountCourseDetail.learned_card_count == course.card_count) {
                isLearned = true;
              }
            }

            course.dataValues.isLearning = isLearning;
            course.dataValues.isLearned = isLearned;
            return course;
          })
        );
        rows = filteredCourse.filter((course) => {
          if (learning_state == -1) {
            return true;
          }
          if (learning_state == 0) {
            return !course.dataValues.isLearning && !course.dataValues.isLearned;
          }
          if (learning_state == 1) {
            return course.dataValues.isLearning;
          }
          if (learning_state == 2) {
            return course.dataValues.isLearned;
          }
        });
      }
      // console.log(rows);
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
  getCourseById: async (courseId, accountId) => {
    try {
      const course = await courseModel.findByPk(courseId);
      if (!course) {
        return null;
      }
      if (accountId) {
        const accountCourseDetail = await accountCourseDetailModel.findOne({
          where: {
            account_id: accountId,
            course_id: courseId,
          },
        });
        course.dataValues.learned_deck_count = accountCourseDetail ? accountCourseDetail.learned_deck_count : 0;
        course.dataValues.learned_card_count = accountCourseDetail ? accountCourseDetail.learned_card_count : 0;
        course.dataValues.deck_progress = accountCourseDetail
          ? (accountCourseDetail.learned_deck_count / course.public_deck_count) * 100
          : 0;
        course.dataValues.card_progress = accountCourseDetail
          ? (accountCourseDetail.learned_card_count / course.public_card_count) * 100
          : 0;
      }
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

  updateCourse: async (courseId, { name, description, image, is_public, is_need_pro }) => {
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
          updated_at: new Date(),
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
