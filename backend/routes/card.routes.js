const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', cardController.getAllCards);

router.post('/', upload.single('file'), cardController.createCard);
router.post('/upload', upload.single('file'), cardController.updateCard);

router.put('/:id', upload.single('file'), cardController.updateCard);

router.delete('/:id', cardController.deleteCard);
module.exports = router;
