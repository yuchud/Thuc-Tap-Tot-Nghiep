const express = require('express');
const deckController = require('../controllers/DeckController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const appConfig = require('../config/appConfig');

router.get('', deckController.getAllDecks);
router.get('/id/:id', deckController.getDeckById);
router.post('', authenticate, authorize([1]), deckController.createDeck);
router.delete('/id/:id', deckController.deleteDeck);
module.exports = router;