import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import AssetAPIClient from "./asset.api";


vi.mock("axios");

describe("AssetAPIClient", () => {
  const mockToken = "test_token";
  
  describe("getAssets", () => {
    it("should make a GET request to /assets/ & return a list", async () => {
      const mockGet = vi.fn().mockResolvedValue({ data: {
        "message": [
          {
            "asset_id": "e078581a-9e6a-4b26-99a9-587d715526b4",
            "position": 1,
            "asset_type": "product",
            "description": "product for manna pharmacy",
            "asset_key": "/image/product_01",
            "url": "https://manna-app-images-bucket.s3.amazonaws.com//image/product_01?AWSAccessKeyId=AKIA6BIZZT273UFVXOZ7&Signature=T9Yon4XZJdihEkFTLQi%2BOrVwWO4%3D&Expires=1729035456"
          }          
        ]
      } });
      vi.spyOn(axios, "create").mockReturnValue({ get: mockGet } as any);

      const client = new AssetAPIClient(mockToken);
      const response = await client.getAssets();

      expect(mockGet).toHaveBeenCalledWith("/assets/");
      expect(response.data).toEqual({
        "message": [
          {
            "asset_id": "e078581a-9e6a-4b26-99a9-587d715526b4",
            "position": 1,
            "asset_type": "product",
            "description": "product for manna pharmacy",
            "asset_key": "/image/product_01",
            "url": "https://manna-app-images-bucket.s3.amazonaws.com//image/product_01?AWSAccessKeyId=AKIA6BIZZT273UFVXOZ7&Signature=T9Yon4XZJdihEkFTLQi%2BOrVwWO4%3D&Expires=1729035456"
          }          
        ]
      });
    });    
  });
});
