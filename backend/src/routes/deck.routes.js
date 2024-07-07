const express = require('express');
const deckController = require('../../controllers/deck.controller');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const appConfig = require('../../config/app.config');

router.get('/', deckController.getAllDecks);
router.get('/:id', deckController.getDeckById);

router.post('/', authenticate, authorize([appConfig.USER_ROLES.ADMIN]), deckController.createDeck);

router.delete('/:id', deckController.deleteDeck);

module.exports = router;