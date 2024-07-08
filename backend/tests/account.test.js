const supertest = require("supertest");
const app = require("../app");
const server = require("../server");
require("dotenv").config();
const http = require("http-status-codes");
const { password } = require("../config/db.config");


describe("Account Controller Tests", () => {
  let account_id = 0;
  const randomNumber = Math.floor(Math.random() * 100000);
  let testUsername = "testuser" + randomNumber;
  let testPassword = "123456";
  let newTestPassword = "1234567";
  describe("Admin Account Tests", () => {
    test("Should login admin account successfully", async () => {
      await supertest(app)
        .post("/api/accounts/login")
        .send({
          usernameOrEmail: "admin",
          password: process.env.ADMIN_PASSWORD,
        })
        .expect(http.StatusCodes.OK);
    });
  });
  describe("Customer Account Tests", () => {
    test("Should return BAD_REQUEST when create account with duplicated username", async () => {
      await supertest(app)
        .post("/api/accounts")
        .expect(http.StatusCodes.BAD_REQUEST)
        .send({ username: "yuchud", password: "123456", account_role_id: 2 });
    });

    test("Should return BAD_REQUEST when create account with duplicated email", async () => {
      await supertest(app)
        .post("/api/accounts")
        .expect(http.StatusCodes.BAD_REQUEST)
        .send({
          username: "yuchud1",
          email: "dhuynguyen2002@gmail.com",
          password: "123456",
          account_role_id: 2,
        });
    });

    test("Should create account successfully", async () => {
      await supertest(app)
        .post("/api/accounts")
        .expect(http.StatusCodes.CREATED)
        .send({
          username: testUsername,
          password: testPassword,
          account_role_id: 2,
        })
        .then((response) => {
          account_id = response.body.account_id;
          expect(response.body).not.haveError;
        });
    });
    test("Should return account if find account by id", async () => {
      await supertest(app)
        .get(`/api/accounts/${account_id}`)
        .expect(http.StatusCodes.OK)
        .then((response) => {
          expect(response.body).not.haveError;
        });
    });

    test("should return UNAUTHORIZED when login with wrong username or email", async () => {
      await supertest(app)
        .post("/api/accounts/login")
        .send({ usernameOrEmail: "wrongusername", password: "wrongpassword" })
        .expect(http.StatusCodes.UNAUTHORIZED);
    });

    test("Should update password successfully", async () => {
      await supertest(app)
        .put(`/api/accounts/${account_id}/password`)
        .send({ password: newTestPassword })
        .expect(http.StatusCodes.OK);
    });
    
    test("should return UNAUTHORIZED when login with old password", async () => {
      await supertest(app)
        .post("/api/accounts/login")
        .send({ usernameOrEmail: testUsername, password: testPassword })
        .expect(http.StatusCodes.UNAUTHORIZED);
    });

    test("Should login customer account successfully with new password", async () => {
      await supertest(app)
        .post("/api/accounts/login")
        .send({
          usernameOrEmail: testUsername,
          password: newTestPassword
        })
        .expect(http.StatusCodes.OK);
    });
    
    test("Should delete account successfully", async () => {
      await supertest(app)
        .delete(`/api/accounts/${account_id}`)
        .expect(http.StatusCodes.OK);
    });

    test("Should return NOT_FOUND when delete account not found", async () => {
      await supertest(app)
        .delete(`/api/accounts/${account_id}`)
        .expect(http.StatusCodes.NOT_FOUND);
    });

    test("Should return NOT_FOUND when find account by id not found", async () => {
      await supertest(app)
        .get("/api/accounts/-5")
        .expect(http.StatusCodes.NOT_FOUND);
    });
  });
  describe("Get All Account", () => {
    test("Should return accounts when get all accounts", async () => {
      await supertest(app)
        .get("/api/accounts")
        .expect(http.StatusCodes.OK)
        .then((response) => {
          expect(response.body).not.haveError;
        });
    });
    
  });

  afterAll((done) => {
    server.close(done);
  });
});

module.exports = { app, server };
