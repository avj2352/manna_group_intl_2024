import { describe, it, expect, vi, afterEach } from "vitest";
import AuthAPIClient from "./auth.api";

describe("AuthAPIClient", () => {
  const mockToken = "test_token";

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("checkIsAdmin", () => {
    it("should make a GET request to /check-admin & return true for admin", async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ isAdmin: true }) };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

      const client = new AuthAPIClient(mockToken);
      const response = await client.checkIsAdmin();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/check-admin"),
        expect.objectContaining({ method: "GET" })
      );
      expect(response.data).toEqual({ isAdmin: true });
    });

    it("should make a GET request to /check-admin & return false for customer", async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ isAdmin: false }) };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

      const client = new AuthAPIClient(mockToken);
      const response = await client.checkIsAdmin();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/check-admin"),
        expect.objectContaining({ method: "GET" })
      );
      expect(response.data).toEqual({ isAdmin: false });
    });
  });
});
