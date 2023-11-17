import { authenticate } from "../shopify.server";
import db from "../db.server";
import axios from "axios";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
  );

  // if (!admin) {
  //   // The admin context isn't returned if the webhook fired after a shop was uninstalled.
  //   throw new Response();
  // }

  switch (topic) {
    case "ORDERS_CREATE":
      console.log("Received orders/create webhook", payload);

      axios
        .post(
          "https://41fa-2804-431-c7c7-fc5d-d16b-d7f2-bfc8-7524.ngrok-free.app/shopify",
          payload
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      break;
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
