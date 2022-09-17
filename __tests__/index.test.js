const supertest = require("supertest");
const createServer = require("../src/server").createServer;
const startServer = require("../src/server").startServer;
const stopServer = require("../src/server").stopServer;
const app = createServer();
const server = startServer(app);
let id;

afterAll(async () => {
  await stopServer(server);
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
});

describe("/", () => {
  it("should return 200", async () => {
    await supertest(app).get("/").expect(200);
  });
});

describe("post", () => {
  it("should return 201", async () => {
    const test = await supertest(app)
      .post("/")
      .send({
        name: "adi",
        age: 22,
      })
      .expect(201);

    id = test.body._id;
  });
});

describe("get", () => {
  it("should return 200", async () => {
    await supertest(app).get(`/${id}`).expect(200);
  });
});

describe("put", () => {
  it("should return 200", async () => {
    await supertest(app)
      .put(`/${id}`)
      .send({
        name: "aditya",
        age: 23,
      })
      .expect(201);
  });
});

describe("delete", () => {
  it("should return 200", async () => {
    await supertest(app).delete(`/${id}`).expect(200);
  });
});
