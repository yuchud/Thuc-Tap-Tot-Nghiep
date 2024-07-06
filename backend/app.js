const express = require('express');
require('dotenv').config();
const accountRoutes = require('./routes/AccountRoutes');
//const proPlansRoutes = require('./routes/ProPlanRoutes');
const deckRoutes = require('./routes/DeckRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const appConfig = require('./config/appConfig');
  
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/accounts', accountRoutes);
//app.use('/pro-plans', proPlansRoutes);
app.use('/decks', deckRoutes);
app.use('/customers', customerRoutes);

const server = app.listen(appConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${appConfig.PORT}`);
  });          

module.exports = {app, server}; // Export the app object for testing