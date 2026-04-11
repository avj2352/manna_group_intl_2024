import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ProtectedAPIClient from "./protected.api";

describe("ProtectedAPIClient", () => {
  let client: ProtectedAPIClient;
  const mockToken = "test_token";

  beforeEach(() => {
    client = new ProtectedAPIClient(mockToken, "http://localhost:8000/auth");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("constructor", () => {
    it("should initialize with a token and create a fetchClient", () => {
      expect(client.token).toBe(mockToken);
      expect(client.fetchClient).toBeDefined();
    });

    it("should send Authorization header in requests", async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ isAdmin: true }) };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

      await client.fetchClient.get("/check-admin");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/auth/check-admin",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });
  });
});
