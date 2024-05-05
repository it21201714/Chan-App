const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Mock the required modules
jest.mock("bcrypt", () => ({
  genSalt: jest.fn().mockResolvedValue("salt"),
  hash: jest.fn().mockResolvedValue("hashedPassword"),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("../models/user", () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mockToken"),
}));

jest.mock("../models/user", () => ({
  findOne: jest.fn(),
  save: jest.fn().mockResolvedValue({}),
}));

const userController = require("../controllers/userController");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("should return an error if user already exists", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      User.findOne.mockResolvedValue({ email: "john@example.com" });
      await userController.register(req, res);
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists",
      });
    });
  });

  describe("login", () => {
    test("should log in a user", async () => {
      req.body = {
        email: "john@example.com",
        password: "password123",
      };
      const mockUser = {
        email: "john@example.com",
        password: "hashedPassword",
        generateAuthToken: jest.fn().mockReturnValue("mockToken"),
      };
      User.findOne.mockResolvedValue(mockUser);
      await userController.login(req, res);
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: "mockToken",
        message: "Login successful",
      });
    });

    test("should return an error if user does not exist", async () => {
      req.body = {
        email: "john@example.com",
        password: "password123",
      };
      User.findOne.mockResolvedValue(null);
      await userController.login(req, res);
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User does not exist",
      });
    });

    test("should return an error if password is incorrect", async () => {
      req.body = {
        email: "john@example.com",
        password: "password123",
      };
      const mockUser = {
        email: "john@example.com",
        password: "hashedPassword",
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);
      await userController.login(req, res);
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });
  });
});
