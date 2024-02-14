"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for products. */

class Product {
  /** 
   * Data should be { name, price, currency, image }
   *
   * Returns { id, name, price, currency, image }
   **/

  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        name,
                        price,
                        currency,
                        image
                 FROM products`;
    let whereExpressions = [];
    let queryValues = [];
  
    const { search } = searchFilters;
  
    if (search) {
      queryValues.push(`%${search}%`, `%${search}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length - 1}`, `price::text ILIKE $${queryValues.length}`);
    }
  
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" OR ");
    }
  
    // Finalize query and return results
    query += " ORDER BY id";
    const productsRes = await db.query(query, queryValues);
    return productsRes.rows;
}

  

  static async create(data) {
    const result = await db.query(
          `INSERT INTO products (name,
                                price,
                                currency,
                                image)
           VALUES ($1, $2, $3, $4)
           RETURNING id, name, price, currency, image`,
        [
          data.name,
          data.price,
          data.currency,
          data.image,
        ]);
    let product = result.rows[0];

    return product;
  }

  /** 
   * Returns { id, name, price, currency, image }
   *   where product is { name, price, currency, image }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const productRes = await db.query(
          `SELECT id,
                  name,
                  price,
                  currency,
                  image
           FROM products
           WHERE id = $1`, [id]);

    const product = productRes.rows[0];

    if (!product) throw new NotFoundError(`No product: ${id}`);

    return product;
  }

  /** Update product data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { name, price, currency }
   *
   * Returns { id, name, price, currency, image }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE products 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                name, 
                                price, 
                                currency,
                                image`;
    const result = await db.query(querySql, [...values, id]);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No product: ${id}`);

    return product;
  }

  /** Delete given product from database; returns undefined.
   *
   * Throws NotFoundError if product not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM products
           WHERE id = $1
           RETURNING id`, [id]);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No product: ${id}`);
  }
}


module.exports = Product;