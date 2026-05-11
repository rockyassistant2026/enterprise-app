import { GET as getProfile, PUT as updateProfile } from "@/app/api/users/profile/route";
import { GET as getAllUsers } from "@/app/api/users/route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    preferences: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/middleware/auth", () => ({
  verifyToken: jest.fn(async (request: any) => {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }
    return { userId: "user-1", sessionId: "session-1", iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 900 };
  }),
}));

describe("User API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users/profile", () => {
    it("should return user profile for authenticated user", async () => {
      const mockRequest = new NextRequest(
        "http://localhost/api/users/profile",
        {
          method: "GET",
          headers: new Headers({
            authorization: `Bearer token`,
          }),
        }
      );

      const mockUser = {
        id: "user-1",
        email: "user@example.com",
        name: "John Doe",
        avatar_url: "https://example.com/avatar.jpg",
        role: "USER",
        is_active: true,
        created_at: new Date(),
        preferences: {},
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await getProfile(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user.email).toBe("user@example.com");
      expect(data.user.name).toBe("John Doe");
    });

    it("should return 401 for missing authorization", async () => {
      const mockRequest = new NextRequest(
        "http://localhost/api/users/profile",
        {
          method: "GET",
        }
      );

      const response = await getProfile(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain("Unauthorized");
    });

    it("should return 404 for non-existent user", async () => {
      const mockRequest = new NextRequest(
        "http://localhost/api/users/profile",
        {
          method: "GET",
          headers: new Headers({
            authorization: `Bearer token`,
          }),
        }
      );

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await getProfile(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain("not found");
    });
  });

  describe("PUT /api/users/profile", () => {
    it("should update user profile", async () => {
      const mockRequest = new NextRequest(
        "http://localhost/api/users/profile",
        {
          method: "PUT",
          headers: new Headers({
            authorization: `Bearer token`,
            "content-type": "application/json",
          }),
          body: JSON.stringify({
            name: "Jane Doe",
            avatar_url: "https://example.com/new-avatar.jpg",
          }),
        }
      );

      const mockUpdatedUser = {
        id: "user-1",
        email: "user@example.com",
        name: "Jane Doe",
        avatar_url: "https://example.com/new-avatar.jpg",
        role: "USER",
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const response = await updateProfile(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user.name).toBe("Jane Doe");
    });

    it("should return 401 for missing authorization", async () => {
      const mockRequest = new NextRequest(
        "http://localhost/api/users/profile",
        {
          method: "PUT",
          body: JSON.stringify({ name: "Jane Doe" }),
        }
      );

      const response = await updateProfile(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/users (Admin)", () => {
    it("should return list of users for admin", async () => {
      const mockRequest = new NextRequest("http://localhost/api/users", {
        method: "GET",
        headers: new Headers({
          authorization: `Bearer token`,
        }),
      });

      const mockAdminUser = {
        id: "user-1",
        role: "ADMIN",
      };

      const mockUsers = [
        {
          id: "user-2",
          email: "user2@example.com",
          name: "User Two",
          role: "USER",
          is_active: true,
          created_at: new Date(),
        },
      ];

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockAdminUser);
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);
      (prisma.user.count as jest.Mock).mockResolvedValue(1);

      const response = await getAllUsers(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users.length).toBe(1);
      expect(data.pagination).toBeDefined();
    });

    it("should return 403 for non-admin user", async () => {
      const mockRequest = new NextRequest("http://localhost/api/users", {
        method: "GET",
        headers: new Headers({
          authorization: `Bearer token`,
        }),
      });

      const mockNonAdminUser = {
        id: "user-1",
        role: "USER",
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(
        mockNonAdminUser
      );

      const response = await getAllUsers(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain("Admin");
    });
  });
});
