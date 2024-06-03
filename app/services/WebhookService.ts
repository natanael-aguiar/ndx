import axios from "axios";
import pino from "pino";

export default class WebhookService {
  private static readonly logger = pino(pino.destination("./logger.log"));

  // Target endpoint
  private static readonly URL: string =
    process.env.WEBHOOK_SEND_ENDPOINT ||
    "https://shopify-api-4af3a2fd9f23.herokuapp.com/nft";

  static async sendRequest(payload: Record<string, any>): Promise<any> {
    try {
      const response = await axios.post(WebhookService.URL, payload);
      console.log(`Response status: ${response.status}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        WebhookService.logger.error(
          "Axios error:",
          error.response?.data || error.message,
        );
      } else {
        WebhookService.logger.error("Unexpected error:", error);
      }
    }
  }
}
