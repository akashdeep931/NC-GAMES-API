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

describe("GET /api/reviews", () => {
  it("200: should return an array of objects, each object with the correct keys", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;

        expect(reviews).toHaveLength(13);

        reviews.forEach((review) => {
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("comment_count", expect.any(String));
        });
      });
  });
  it("200: should response with a sorted array by date in a descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;

        expect(reviews).toHaveLength(13);
        expect(reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  it("200: should return an array of objects with the corresponding given id and the correct keys", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;

        expect(comments).toHaveLength(3);

        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("review_id", expect.any(Number));
        });
      });
  });
  it("200: should response with a sorted array by date in a descending order", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;

        expect(comments).toHaveLength(3);
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("200: should response with an empty array if given id exists but does not have any comment associated", () => {
    return request(app)
      .get("/api/reviews/4/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;

        expect(comments).toEqual([]);
      });
  });
  it("404: should return an error when given an incorrect id", () => {
    return request(app)
      .get("/api/reviews/999999999/comments")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Not Found!");
      });
  });
  it("400: should return an error when given an id with the incorrect format/data type", () => {
    return request(app)
      .get("/api/reviews/helloWorld/comments")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Bad Request!");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  it("201: should create and response with the new item inserted by the user", () => {
    return request(app)
      .post("/api/reviews/4/comments")
      .send({ username: "bainesface", body: "Nice picture!" })
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;

        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("review_id", expect.any(Number));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(String));

        expect(comment.review_id).toBe(4);
        expect(comment.author).toBe("bainesface");
        expect(comment.body).toBe("Nice picture!");
      });
  });
  it("201: should ignore unnecessary properties passed by the client and focus on just username and body", () => {
    return request(app)
      .post("/api/reviews/4/comments")
      .send({
        username: "bainesface",
        body: "Nice picture!",
        name: "Bains",
        age: 22,
      })
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;

        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("review_id", expect.any(Number));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(String));

        expect(comment.review_id).toBe(4);
        expect(comment.author).toBe("bainesface");
        expect(comment.body).toBe("Nice picture!");
      });
  });
  it("400: should return an error when given a malformed item/body to insert", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Bad Request!");
      });
  });
  it("404: should return an error when given an object with wrong value, specially username", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "kAKASHi", body: "This should response with an error" })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Not Found!");
      });
  });
  it("404: should return an error when given an incorrect id", () => {
    return request(app)
      .post("/api/reviews/9999999/comments")
      .send({ username: "bainesface", body: "Nice picture!" })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Not Found!");
      });
  });
  it("400: should return an error when given an id with the incorrect format/data type", () => {
    return request(app)
      .post("/api/reviews/helloWorld/comments")
      .send({ username: "bainesface", body: "Nice picture!" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toBe("Bad Request!");
      });
  });
});
