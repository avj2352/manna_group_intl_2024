import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PublicAPIClient from "./public.api";

describe("PublicAPIClient", () => {
  let client: PublicAPIClient;

  beforeEach(() => {
    client = new PublicAPIClient("http://localhost:8000/auth");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("constructor", () => {
    it("should initialize baseURL and fetchClient", () => {
      expect(client.baseURL).toBe("http://localhost:8000/auth");
      expect(client.fetchClient).toBeDefined();
    });

    it("should send Content-Type header on GET requests", async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ ok: true }) };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

      await client.fetchClient.get("/test");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/auth/test",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({ "Content-Type": "application/json" }),
        })
      );
    });
  });
});
