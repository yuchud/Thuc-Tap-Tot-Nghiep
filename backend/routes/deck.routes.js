const express = require('express');
const deckController = require('../controllers/deck.controller');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', deckController.getAllDecks);
router.get('/course-id/:courseId', deckController.getDecksByCourseId);

router.post('/', upload.single('file'), deckController.createDeck);

router.put('/:id', upload.single('file'), deckController.updateDeck);

router.delete('/:id', deckController.deleteDeck);

module.exports = router;
