const express = require('express');
const courseController = require('../controllers/course.controller');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', courseController.getAllCourses);

router.post('/', upload.single('file'), courseController.createCourse);

router.put('/:id', upload.single('file'), courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);
module.exports = router;
