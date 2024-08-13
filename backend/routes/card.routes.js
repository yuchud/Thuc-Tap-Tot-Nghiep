const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', cardController.getAllCards);

router.post(
  '/',
  upload.fields([{ name: 'front_image_file' }, { name: 'front_audio_file' }]),
  cardController.createCard
);
router.put(
  '/:id',
  upload.fields([{ name: 'front_image_file' }, { name: 'front_audio_file' }]),
  cardController.updateCard
);

router.delete('/:id', cardController.deleteCard);
module.exports = router;
