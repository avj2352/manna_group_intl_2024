import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import PublicAPIClient from "./public.api";

vi.mock("axios");

describe("PublicAPIClient", () => {
  let client: PublicAPIClient;  

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
    client = new PublicAPIClient('http://localhost:8000/auth');
  });

  describe("constructor", () => {    

    it("should call setupInterceptors", () => {
      const setupInterceptorsSpy = vi.spyOn(
        PublicAPIClient.prototype as any,
        "setupInterceptors"
      );
      new PublicAPIClient('http://localhost:8000/auth');
      expect(setupInterceptorsSpy).toHaveBeenCalled();
    });
  });  
  
});
