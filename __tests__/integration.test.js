const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  it("200: should return an array of objects, each one with slug and description keys", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(4);

        body.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
  it("404: should return an error when given a wrong path", () => {
    return request(app)
      .get("/api/cate4534")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Not Found!");
      });
  });
});

describe("GET /api/reviews/:reviews_id", () => {
  it("200: should return a single object with the corresponding given id and all its keys", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(Array.isArray(body)).toBe(false);

        expect(body).toHaveProperty("review_id", expect.any(Number));
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("category", expect.any(String));
        expect(body).toHaveProperty("designer", expect.any(String));
        expect(body).toHaveProperty("owner", expect.any(String));
        expect(body).toHaveProperty("review_body", expect.any(String));
        expect(body).toHaveProperty("review_img_url", expect.any(String));
        expect(body).toHaveProperty("created_at", expect.any(String));
        expect(body).toHaveProperty("votes", expect.any(Number));
      });
  });
  it("404: should return an error when given an incorrect id", () => {
    return request(app)
      .get("/api/reviews/999999999")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Not Found!");
      });
  });
  it("400: should return an error when given an id with the incorrect format/data type", () => {
    return request(app)
      .get("/api/reviews/helloWorld")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Bad Request!");
      });
  });
});
