const request = require("supertest");

const app = require("./app");
const db = require("./db");


test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

test("not found for site 404 (test stack print)", async function () {
  process.env.NODE_ENV = "";
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
  delete process.env.NODE_ENV;
});

afterAll(function () {
  db.end();
});


// PASS  ./app.test.js
// ✓ not found for site 404 (17 ms)
// ✓ not found for site 404 (test stack print) (18 ms)

// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        0.606 s
// Ran all test suites matching /app.test.js/i.