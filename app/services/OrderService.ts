import { type RestResources } from "@shopify/shopify-api/rest/admin/2024-04";
import { type AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import getFeaturedImage from "~/repositories/OrderRepository";
import pino from "pino";

export default class OrderService {
  private static readonly logger = pino(pino.destination("./logger.log"));

  // Function to obtain product IDs
  static async getProductsIDs(
    payload: Record<string, any>,
    listItens: { product_id: number }[],
    adminAuth: AdminApiContext<RestResources>,
  ): Promise<Record<string, any> | undefined> {
    try {
      const ids = listItens.map((item) => item.product_id);
      return await getFeaturedImage(adminAuth, ids, payload);
    } catch (error) {
      OrderService.logger.error("Error obtaining product ID:", error);
    }
  }

  // Set featured Image and other details in Product Payload
  static async setFeaturedImagePayload(
    payload: Record<string, any>,
    productDetails: any[],
  ): Promise<Record<string, any> | undefined> {
    try {
      const lineItems = payload.line_items;
      // Create a product detail map for quick reference
      const productDetailsMap = new Map(
        productDetails.map((detail) => [
          detail.data.product.id,
          detail.data.product,
        ]),
      );

      // Iterate over the payload line_items
      for (let item of lineItems) {
        const productID = `gid://shopify/Product/${item.product_id}`;
        // If matching details are found on the map, add to product
        if (productDetailsMap.has(productID)) {
          const productDetail = productDetailsMap.get(productID);
          item.featuredImage = productDetail.featuredImage;
          item.description = productDetail.description;
          item.tags = productDetail.tags;
          item.category = productDetail.category;
        }
      }
      return payload;
    } catch (error) {
      console.error("Error setting product details in payload:", error);
    }
  }
}
