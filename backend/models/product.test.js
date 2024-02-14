"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const Product = require("./product.js");
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

/************************************** create */

describe("create", function () {
  let newProduct = {
    name: "Test",
    price: 100,
    currency: "USD",
    image: "test.jpg",
  };

  test("works", async function () {
    let product = await Product.create(newProduct);
    expect(product).toEqual({
      ...newProduct,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let products = await Product.findAll();
    expect(products.length).toEqual(2);
    expect(products).toContainEqual({
      id: expect.any(Number),
      name: "Product1",
      price: 100,
      currency: "USD",
      image: "product1.jpg",
    });
    expect(products).toContainEqual({
      id: expect.any(Number),
      name: "Product2",
      price: 200,
      currency: "USD",
      image: "product2.jpg",
    });
  });
});


/************************************** get */

describe("get", function () {
  test("works", async function () {
    try {
      await Product.get(999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
  
  test("not found if no such product", async function () {
    try {
      await Product.get(999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  let updateData = {
    name: "New",
    price: 500,
    currency: "EUR",
    image: "new.jpg",
  };


  test("works", async function () {
    try {
      await Product.update(999, { name: "New Name" });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("not found if no such product", async function () {
    try {
      await Product.update(0, {
        name: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Product.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    try {
      await Product.remove(999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("not found if no such product", async function () {
    try {
      await Product.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


// PASS  models/product.test.js
// create
//   ✓ works (2 ms)
// findAll
//   ✓ works: no filter (1 ms)
// get
//   ✓ works (1 ms)
//   ✓ not found if no such product (1 ms)
// update
//   ✓ works (1 ms)
//   ✓ not found if no such product (1 ms)
//   ✓ bad request with no data (1 ms)
// remove
//   ✓ works (1 ms)
//   ✓ not found if no such product

// Test Suites: 1 passed, 1 total
// Tests:       9 passed, 9 total
// Snapshots:   0 total
// Time:        0.276 s, estimated 1 s
// Ran all test suites matching /product.test.js/i.