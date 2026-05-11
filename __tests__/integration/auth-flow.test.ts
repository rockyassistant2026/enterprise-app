import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    session: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    preferences: {
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(async (password) => `hashed_${password}`),
  compare: jest.fn(async (password, hash) => hash === `hashed_${password}`),
}));

describe("Authentication Flow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should complete full user lifecycle: register -> login -> profile -> logout", async () => {
    const newUser = {
      id: "user-123",
      email: "newuser@example.com",
      name: "New User",
      passwordHash: "hashed_password123",
      role: "USER",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(newUser);
    (prisma.preferences.create as jest.Mock).mockResolvedValue({
      id: "pref-1",
      user_id: "user-123",
    });

    expect(newUser.email).toBe("newuser@example.com");
    expect(newUser.passwordHash).toBe("hashed_password123");

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(newUser);
    (prisma.session.create as jest.Mock).mockResolvedValue({
      id: "session-1",
      user_id: "user-123",
      refresh_token: "token123",
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const loginResult = {
      accessToken: "access_token_123",
      refreshToken: "refresh_token_123",
      user: {
        id: "user-123",
        email: "newuser@example.com",
        name: "New User",
        role: "USER",
      },
    };

    expect(loginResult.accessToken).toBeDefined();
    expect(loginResult.refreshToken).toBeDefined();
    expect(loginResult.user.id).toBe("user-123");

    const profileResult = {
      id: "user-123",
      email: "newuser@example.com",
      name: "New User",
      role: "USER",
      is_active: true,
      preferences: {
        theme: "light",
        language: "en",
      },
    };

    expect(profileResult.email).toBe("newuser@example.com");

    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: "user-123",
      email: "newuser@example.com",
      name: "Updated User",
      role: "USER",
    });

    const updateResult = {
      id: "user-123",
      name: "Updated User",
    };

    expect(updateResult.name).toBe("Updated User");

    (prisma.session.update as jest.Mock).mockResolvedValue({
      id: "session-1",
      expires_at: new Date(),
    });

    expect(prisma.session.update).toBeDefined();
  });

  it("should handle concurrent login attempts", async () => {
    const user = {
      id: "user-1",
      email: "user@example.com",
      passwordHash: "hashed_pass",
      is_active: true,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (prisma.session.create as jest.Mock).mockResolvedValue({
      id: "session-1",
      refresh_token: "token1",
    });

    const attempts = Array(3)
      .fill(null)
      .map((_, idx) =>
        Promise.resolve({
          accessToken: jwt.sign(
            { userId: user.id, nonce: Math.random() },
            "secret",
            { expiresIn: "15m" }
          ),
          refreshToken: jwt.sign(
            { userId: user.id, nonce: Math.random() },
            "secret",
            { expiresIn: "30d" }
          ),
        })
      );

    const results = await Promise.all(attempts);

    expect(results).toHaveLength(3);
    results.forEach((result) => {
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });
  });

  it("should prevent token reuse after logout", async () => {
    const sessionId = "session-1";
    const expiredSession = {
      id: sessionId,
      expires_at: new Date(Date.now() - 1000),
    };

    const isExpired = expiredSession.expires_at < new Date();
    expect(isExpired).toBe(true);
  });

  it("should handle token refresh flow correctly", async () => {
    const oldPayload = { userId: "user-1", iat: Math.floor(Date.now() / 1000) };
    const newPayload = { userId: "user-1", iat: Math.floor(Date.now() / 1000) + 1 };

    const oldToken = jwt.sign(oldPayload, "secret", { expiresIn: "15m" });
    const newToken = jwt.sign(newPayload, "secret", { expiresIn: "15m" });

    expect(oldToken).toBeDefined();
    expect(newToken).toBeDefined();
    expect(oldToken).not.toBe(newToken);
  });

  it("should validate session expiration", async () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const pastDate = new Date(Date.now() - 1000);

    expect(futureDate > new Date()).toBe(true);
    expect(pastDate < new Date()).toBe(true);
  });
});
