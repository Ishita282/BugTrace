const request = require("supertest");
const app = require("../index");
const Bug = require("../models/bugModel");

// ==============================
// MOCKS
// ==============================

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../middleware/authMiddleware", () => (req, res, next) => {
  req.user = { userId: "testUser123" };
  next();
});

jest.mock("../middleware/validateBug", () => (req, res, next) => next());

jest.mock("../models/bugModel", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndDelete: jest.fn(),
}));

// reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/share/:token", () => {
  it("should return bug by share token", async () => {
    const mockBug = {
      _id: "1",
      title: "Shared Bug",
      shareToken: "abc123",
    };

    Bug.findOne.mockResolvedValue(mockBug);

    const res = await request(app).get("/api/share/abc123");

    console.log("RESPONSE:", res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Shared Bug");
  });

  it("should return 404 for invalid token", async () => {
    Bug.findOne.mockResolvedValue(null);

    const res = await request(app).get("/api/share/wrongtoken");

    expect(res.statusCode).toBe(404);
  });
});

// ==============================
// CREATE BUG
// ==============================
describe("POST /bugs", () => {
  it("should create a bug", async () => {
    Bug.create.mockResolvedValue({
      _id: "1",
      title: "Test Bug",
      description: "Desc",
      steps: [],
      user: "testUser123",
    });

    const res = await request(app).post("/bugs").send({
      title: "Test Bug",
      description: "Desc",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Bug");
  });

  it("should fail if title missing", async () => {
    const res = await request(app).post("/bugs").send({
      description: "no title",
    });

    expect(res.statusCode).toBe(400);
  });
});

// ==============================
// ADD STEP
// ==============================
describe("POST /bugs/:id/steps", () => {
  it("should add step", async () => {
    const mockBug = {
      steps: [],
      save: jest.fn().mockResolvedValue(true),
    };

    Bug.findOne.mockResolvedValue(mockBug);

    const res = await request(app)
      .post("/bugs/1/steps")
      .send({ title: "step1", description: "desc" });

    expect(res.statusCode).toBe(200);
    expect(mockBug.steps.length).toBe(1);
  });
});

// ==============================
// GET BUG
// ==============================
describe("GET /bugs/:id", () => {
  it("should return bug", async () => {
    Bug.findOne.mockResolvedValue({
      _id: "1",
      title: "Bug",
      steps: [],
    });

    const res = await request(app).get("/bugs/1");

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe("1");
  });
});

// ==============================
// UPDATE STEP
// ==============================
describe("PUT /bugs/:bugId/steps/:stepId", () => {
  it("should update step", async () => {
    const mockStep = { _id: "s1", title: "old" };

    const mockBug = {
      steps: {
        id: jest.fn().mockReturnValue(mockStep),
      },
      save: jest.fn().mockResolvedValue(true),
    };

    Bug.findOne.mockResolvedValue(mockBug);

    const res = await request(app)
      .put("/bugs/1/steps/s1")
      .send({ title: "new" });

    expect(res.statusCode).toBe(200);
    expect(mockStep.title).toBe("new");
  });
});

// ==============================
// DELETE STEP
// ==============================
describe("DELETE /bugs/:bugId/steps/:stepId", () => {
  it("should delete step", async () => {
    const mockBug = {
      steps: [{ _id: "s1" }, { _id: "s2" }],
      save: jest.fn().mockResolvedValue(true),
    };

    Bug.findOne.mockResolvedValue(mockBug);

    const res = await request(app).delete("/bugs/1/steps/s1");

    expect(res.statusCode).toBe(200);
    expect(mockBug.steps.length).toBe(1);
  });
});
