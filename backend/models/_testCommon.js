const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testProductIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM products");
  await db.query("DELETE FROM transactions");

  const product1 = await db.query(
    `INSERT INTO products (name, price, currency, image)
     VALUES ('Product1', 10, 'USD', 'product1.jpg')
     RETURNING id`
  );

  const product2 = await db.query(
    `INSERT INTO products (name, price, currency, image)
     VALUES ('Product2', 20, 'USD', 'product2.jpg')
     RETURNING id`
  );

  testProductIds.push(product1.rows[0].id, product2.rows[0].id);

  await db.query(
    `
    INSERT INTO users(username, password, first_name, last_name, email)
    VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
           ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
    RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(
    `
    INSERT INTO transactions (user_id, product_id, quantity, total_price)
    VALUES ('u1', $1, 2, 200),
           ('u1', $2, 1, 100)`,
    testProductIds
  );
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProductIds,
};
