import { describe, it, expect, vi, afterEach } from "vitest";
import AssetPublicAPIClient from "./asset.public.api";

describe("AssetAPIClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("getAssets", () => {
    it("should make a GET request to /assets/ & return a list", async () => {
      const mockData = {
        message: [
          {
            asset_id: "e078581a-9e6a-4b26-99a9-587d715526b4",
            position: 1,
            asset_type: "product",
            description: "product for manna pharmacy",
            asset_key: "/image/product_01",
            url: "https://manna-app-images-bucket.s3.amazonaws.com//image/product_01?AWSAccessKeyId=AKIA6BIZZT273UFVXOZ7&Signature=T9Yon4XZJdihEkFTLQi%2BOrVwWO4%3D&Expires=1729035456",
          },
        ],
      };
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue(mockData) };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

      const client = new AssetPublicAPIClient();
      const response = await client.getAssets();

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/assets/",
        expect.objectContaining({ method: "GET" })
      );
      expect(response.data).toEqual(mockData);
    });
  });
});
