import { type RestResources } from "@shopify/shopify-api/rest/admin/2024-04";
import { type AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import OrderService from "~/services/OrderService";
import WebhookService from "~/services/WebhookService";
import pino from "pino";

export default class OrderController {

  private static readonly logger = pino(pino.destination("./logger.log"));

  static async index(
    payload: Record<string, any>,
    lineItems: any[],
    adminAuth: AdminApiContext<RestResources>,
    shop: string,
  ) {
    // const logger = pino();

    if (!adminAuth) {
      throw new Response("Unauthorized", { status: 401 });
    }

    if (!payload || Object.keys(payload).length === 0) {
      OrderController.logger.error(`Payload not provided: ${shop}`);
      return;
    }

    // Get  updated payload
    const productPayload = OrderService.getProductsIDs(
      payload,
      lineItems,
      adminAuth,
    );

    // Send Request
    WebhookService.sendRequest(productPayload);
  }
}
