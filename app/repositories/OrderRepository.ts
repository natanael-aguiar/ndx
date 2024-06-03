import { type RestResources } from "@shopify/shopify-api/rest/admin/2024-04";
import { type AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import OrderService from "~/services/OrderService";
import pino from "pino";

class OrderRepository {
  private static readonly logger = pino(pino.destination("./logger.log"));

  // Function to search for product images
  static async getFeaturedImage(
    adminAuth: AdminApiContext<RestResources>,
    ids: number[],
    payload: Record<string, any>,
  ): Promise<Record<string, any> | undefined> {
    try {
      const featuredImage = await Promise.all(
        ids.map(function (id) {
          return OrderRepository.queryFeaturedImage(adminAuth, id);
        }),
      );
      let response = await OrderService.setFeaturedImagePayload(
        payload,
        featuredImage,
      );
      return response;
    } catch (error) {
      OrderRepository.logger.error(
        "Error when searching for product images:",
        error,
      );
    }
  }

  // Function to search for a product
  static async queryFeaturedImage(
    adminAuth: AdminApiContext<RestResources>,
    id: number,
  ): Promise<any> {
    try {
      const query = `
        query {
          product(id: "gid://shopify/Product/${id}") {
            id
            description
            category {
              name
            }
            tags
            productType
            onlineStoreUrl
            featuredImage {
              altText
              height
              url
              width
            }
          }
        }
      `;

      const response = await adminAuth.graphql(query);

      if (!response.ok) {
        OrderRepository.logger.error(
          `Error when searching for product with ID ${id}: ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      OrderRepository.logger.error(
        `Error when searching for product with ID ${id}:`,
        error,
      );
    }
  }
}

export default OrderRepository.getFeaturedImage;
