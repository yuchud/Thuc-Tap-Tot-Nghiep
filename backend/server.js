require('dotenv').config();
const http = require('http');
const app = require('./app');
const appConfig = require('./config/app.config');
const jestConfig = require('./config/jest.config');
const { checkProPlanExpiration } = require('./jobs/pro-plan-expiration.job');

let port;
if (process.env.NODE_ENV === 'test') {
  port = jestConfig.testPort || appConfig.TEST_PORT;
} else {
  port = appConfig.DEV_PORT;
}

const server = http.createServer(app);
const socketIo = require('socket.io');

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// console.log(io);

server.listen(port, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
    io.on('connection', (socket) => {
      console.log('A user connected');
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    checkProPlanExpiration();
  }
});

// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// checkProPlanExpiration();

// module.exports = io;
module.exports = { server, io };
const router = require('./routes/index.routes');
app.use('/api', router);
