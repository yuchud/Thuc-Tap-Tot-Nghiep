const express = require('express');
const courseController = require('../controllers/course.controller');
const deckController = require('../controllers/deck.controller');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/:id/decks', deckController.getDecksByCourseId);

router.post('/', upload.single('file'), courseController.createCourse);

router.put('/:id', upload.single('file'), courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);
module.exports = router;
