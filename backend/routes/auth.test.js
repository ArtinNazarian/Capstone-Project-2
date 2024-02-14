"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/token */

describe("POST /auth/token", function () {
  test("works", async function () {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
          password: "password1",
        });
    expect(resp.body).toEqual({
      "token": expect.any(String),
    });
  });

  test("unauth with non-existent user", async function () {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "no-such-user",
          password: "password1",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth with wrong password", async function () {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
          password: "nope",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
        });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: 42,
          password: "above-is-a-number",
        });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** POST /auth/register */

describe("POST /auth/register", function () {
  test("works for anon", async function () {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
          firstName: "first",
          lastName: "last",
          password: "password",
          email: "new@email.com",
        });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      "token": expect.any(String),
    });
  });

  test("bad request with missing fields", async function () {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
        });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
          firstName: "first",
          lastName: "last",
          password: "password",
          email: "not-an-email",
        });
    expect(resp.statusCode).toEqual(400);
  });
});

// Test Suites: 2 passed, 2 total
// Tests:       20 passed, 20 total
// Snapshots:   0 total
// Time:        0.599 s, estimated 1 s
// Ran all test suites matching /auth.test.js/i.
// POST /auth/token 200 160 - 3.272 ms
// POST /auth/token 401 62 - 1.137 ms
// POST /auth/token 401 62 - 1.496 ms
// POST /auth/token 400 78 - 0.512 ms
// POST /auth/token 400 83 - 0.436 ms
// POST /auth/register 201 161 - 3.143 ms
// POST /auth/register 400 202 - 0.535 ms
// POST /auth/register 400 94 - 0.556 ms