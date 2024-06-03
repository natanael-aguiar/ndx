import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import OrderController from "~/controllers/OrderController";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin, payload } =
    await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "ORDERS_CREATE":

      OrderController.index(payload, payload.line_items, admin, shop);
      break;

    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      break;

    case "CUSTOMERS_DATA_REQUEST":
      return new Response("Request received", { status: 200 });

    case "CUSTOMERS_REDACT":
      return new Response("Request received", { status: 200 });

    case "SHOP_REDACT":
      return new Response("Request received", { status: 200 });

    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
