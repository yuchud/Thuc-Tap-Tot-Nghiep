const express = require('express');
const deckController = require('../controllers/deck.controller');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware');
const authorize = require('../middlewares/authorize.middleware');
const appConfig = require('../config/app.config');

router.get('/', deckController.getAllDecks);
router.get('/:id', deckController.getDeckById);

router.post('/', authenticate, authorize([appConfig.USER_ROLE.ADMIN]), deckController.createDeck);

router.delete('/:id', deckController.deleteDeck);

module.exports = router;