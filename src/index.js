const createServer = require('./server').createServer;
const startServer = require('./server').startServer;

const app = createServer();
startServer(app);
