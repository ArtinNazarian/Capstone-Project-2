"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const Product = require("../models/product.js");

const testProductIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM products");
  await db.query("DELETE FROM transactions");


  testProductIds[0] = (await Product.create(
      { name: "test", price: 3200, currency: "USD", image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg" })).id;
  testProductIds[1] = (await Product.create(
      { name: "test2", price: 900, currency: "USD", image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg" })).id;
  testProductIds[2] = (await Product.create(
      { name: "test3", price: 20000, currency: "USD", image: "https://epic-projects.nyc3.digitaloceanspaces.com/react-ecommerce/basic-tee-sienna.jpeg" })).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });
  await User.register({
    username: "admin",
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@user.com",
    password: "admin",
    isAdmin: true,
  });

  await User.addTransaction("u1", {  
    productId: testProductIds[0],
    quantity: 2,
    totalPrice: 3200,
  });
  
  await User.addTransaction("u1", {  
    productId: testProductIds[1],
    quantity: 1,
    totalPrice: 3200,
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const u3Token = createToken({ username: "u3", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProductIds,
  u1Token,
  u2Token,
  u3Token,
  adminToken,
};
