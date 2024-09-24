import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import ProtectedAPIClient from "./protected.api";

vi.mock("axios");

describe("ProtectedAPIClient", () => {
  let client: ProtectedAPIClient;
  const mockToken = "test_token";

  beforeEach(() => {
    vi.resetAllMocks();
    // Mock axios.create to return a mock instance
    const mockAxiosInstance = {
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
    };
    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any);
    client = new ProtectedAPIClient(mockToken, 'http://localhost:8000/auth');
  });

  describe("constructor", () => {
    it("should initialize with a token and create an axios instance", () => {
      expect(client["token"]).toBe(mockToken);      
    });

    it("should call setupInterceptors", () => {
      const setupInterceptorsSpy = vi.spyOn(
        ProtectedAPIClient.prototype as any,
        "setupInterceptors"
      );
      new ProtectedAPIClient(mockToken, 'http://localhost:8000/auth');
      expect(setupInterceptorsSpy).toHaveBeenCalled();
    });
  });  
  
});
