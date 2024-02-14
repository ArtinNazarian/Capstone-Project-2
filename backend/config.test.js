"use strict";

describe("config can come from env", function () {
  test("works", function() {
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("other");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;

    process.env.NODE_ENV = "test";
    expect(config.getDatabaseUri()).toEqual("mode_test");

    delete process.env.DATABASE_URL;

    process.env.NODE_ENV = "production";
    expect(() => config.getDatabaseUri()).toThrowError("DATABASE_URL must be set in production");
  });
})


// PASS  ./config.test.js
// config can come from env
//   ✓ works (23 ms)

// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        0.167 s, estimated 1 s
// Ran all test suites matching /config.test.js/i.