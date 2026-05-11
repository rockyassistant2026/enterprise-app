import { POST as registerHandler } from "@/app/api/auth/register/route";
import { POST as loginHandler } from "@/app/api/auth/login/route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    preferences: {
      create: jest.fn(),
    },
    session: {
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(async (password) => `hashed_${password}`),
  compare: jest.fn(async (password, hash) =>
    hash === `hashed_${password}`
  ),
}));

describe("Authentication API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should create a new user with valid credentials", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        }),
      });

      const mockUser = {
        id: "user-1",
        email: "test@example.com",
        name: "Test User",
        role: "USER",
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.preferences.create as jest.Mock).mockResolvedValue({});

      const response = await registerHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.user.email).toBe("test@example.com");
    });

    it("should reject password less than 8 characters", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "short",
        }),
      });

      const response = await registerHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("at least 8 characters");
    });

    it("should prevent duplicate email registration", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: "existing@example.com",
          password: "password123",
        }),
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-1",
        email: "existing@example.com",
      });

      const response = await registerHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toContain("already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return tokens for valid credentials", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
        headers: new Headers({
          "user-agent": "test-browser",
        }),
      });

      const mockUser = {
        id: "user-1",
        email: "test@example.com",
        name: "Test User",
        role: "USER",
        passwordHash: "hashed_password123",
        is_active: true,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.session.create as jest.Mock).mockResolvedValue({
        id: "session-1",
      });

      const response = await loginHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.accessToken).toBeDefined();
      expect(data.refreshToken).toBeDefined();
      expect(data.user.email).toBe("test@example.com");
    });

    it("should reject invalid credentials", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "wrongpassword",
        }),
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await loginHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain("Invalid credentials");
    });

    it("should reject inactive users", async () => {
      const mockRequest = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const mockUser = {
        id: "user-1",
        email: "test@example.com",
        passwordHash: "hashed_password123",
        is_active: false,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await loginHandler(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain("inactive");
    });
  });
});
