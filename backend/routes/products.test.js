"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProductIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /products */

describe("POST /products", function () {
  test("ok for admin", async function () {
    const resp = await request(app)
        .post(`/products`)
        .send({
          name: "test",
          price: 3200,
          currency: "USD",
          image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      product: {
        id: expect.any(Number),
        name: "test",
        price: 3200,
        currency: "USD",
        image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg",
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
        .post(`/products`)
        .send({
          name: "test",
          price: 3200,
          currency: "USD",
          image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post(`/products`)
        .send({
          price: "not-a-number",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post(`/products`)
        .send({
          name: "test",
          price: "not-a-number",
          currency: "USD",
          image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-black.jpeg",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

});

/************************************** GET /products */

describe("GET /products", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/products`);
    expect(resp.body).toHaveProperty("products");
    expect(resp.body.products).toBeInstanceOf(Array);
    resp.body.products.forEach(product => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("currency");
      expect(product).toHaveProperty("image");
    });
  });

  test("Responds with a 404 if it cannot find the product in question", async function () {
    const resp = await request(app).get(`/products/9999`);
    expect(resp.statusCode).toBe(404);
  });
});

/************************************** GET /products/:id */

describe("GET /products/:id", function () {
    test("works for anon", async function () {
      const resp = await request(app).get(`/products/${testProductIds[0]}`);
      expect(resp.body).toEqual({
        product: {
          id: testProductIds[0],
          name: "test",
          price: expect.any(Number),
          currency: "USD",
          image: expect.any(String),
        },
      });
    });
  
    test("not found for no such product", async function () {
      const resp = await request(app).get(`/products/0`);
      expect(resp.statusCode).toEqual(404);
    });
  });

/************************************** PATCH /products/:id */

describe("PATCH /products/:id", function () {
    test("works for admin", async function () {
      const resp = await request(app)
          .patch(`/products/${testProductIds[0]}`)
          .send({
            name: "P-New",
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.body).toEqual({
        product: {
          id: testProductIds[0],
          name: "P-New",
          price: expect.any(Number),
          currency: "USD",
          image: expect.any(String),
        },
      });
    });
  
    test("unauth for others", async function () {
      const resp = await request(app)
          .patch(`/products/${testProductIds[0]}`)
          .send({
            name: "P-New",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .patch(`/products/${testProductIds[0]}`)
          .send({
            price: "not-a-number",
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(400);
    });
  });

/************************************** DELETE /products/:id */

describe("DELETE /products/:id", function () {
    test("works for admin", async function () {
      const resp = await request(app)
          .delete(`/products/${testProductIds[0]}`)
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.body).toEqual({ deleted: testProductIds[0] });
    });
  
    test("unauth for others", async function () {
      const resp = await request(app)
          .delete(`/products/${testProductIds[0]}`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("unauth for anon", async function () {
      const resp = await request(app)
          .delete(`/products/${testProductIds[0]}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("not found for no such product", async function () {
      const resp = await request(app)
          .delete(`/products/0`)
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(404);
    });
  });


//   PASS  routes/products.test.js
//   POST /products
//     ✓ ok for admin (16 ms)
//     ✓ unauth for users (3 ms)
//     ✓ bad request with missing data (2 ms)
//     ✓ bad request with invalid data (2 ms)
//   GET /products
//     ✓ ok for anon (3 ms)
//     ✓ Responds with a 404 if it cannot find the product in question (2 ms)
//   GET /products/:id
//     ✓ works for anon (2 ms)
//     ✓ not found for no such product (2 ms)
//   PATCH /products/:id
//     ✓ works for admin (3 ms)
//     ✓ unauth for others (2 ms)
//     ✓ bad request with invalid data (2 ms)
//   DELETE /products/:id
//     ✓ works for admin (1 ms)
//     ✓ unauth for others (2 ms)
//     ✓ unauth for anon (2 ms)
//     ✓ not found for no such product (2 ms)

// Test Suites: 1 passed, 1 total
// Tests:       15 passed, 15 total
// Snapshots:   0 total
// Time:        0.466 s, estimated 1 s
// Ran all test suites matching /products.test.js/i.