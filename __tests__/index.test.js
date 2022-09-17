const supertest = require('supertest');
const createServer = require('../src/server').createServer;
const startServer = require('../src/server').startServer;
const stopServer = require('../src/server').stopServer;
const app = createServer();
const server = startServer(app);

afterAll(async () => {
	await stopServer(server);
})

describe("/", () => {
  it("should return 200", async () => {
    await supertest(app).get('/').expect(200);
  });
});
