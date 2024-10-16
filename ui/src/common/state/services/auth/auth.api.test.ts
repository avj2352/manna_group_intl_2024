import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import AuthAPIClient from "./auth.api";


vi.mock("axios");

describe("AuthAPIClient", () => {
  const mockToken = "test_token";
  
  describe("checkIsAdmin", () => {
    it("should make a GET request to /check-admin & return true for admin", async () => {
      const mockGet = vi.fn().mockResolvedValue({ data: { isAdmin: true } });
      vi.spyOn(axios, "create").mockReturnValue({ get: mockGet } as any);

      const client = new AuthAPIClient(mockToken);
      const response = await client.checkIsAdmin();

      expect(mockGet).toHaveBeenCalledWith("/check-admin");
      expect(response.data).toEqual({ isAdmin: true });
    });

    it("should make a GET request to /check-admin & return false for customer", async () => {
        const mockGet = vi.fn().mockResolvedValue({ data: { isAdmin: false } });
        vi.spyOn(axios, "create").mockReturnValue({ get: mockGet } as any);
  
        const client = new AuthAPIClient(mockToken);
        const response = await client.checkIsAdmin();
  
        expect(mockGet).toHaveBeenCalledWith("/check-admin");
        expect(response.data).toEqual({ isAdmin: false });
    });
  });
});
