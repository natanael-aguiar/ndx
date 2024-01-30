import { json } from "@remix-run/node";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    {
      products(first: 25) {
        nodes {
          title
          description
          tags
          vendor
        }
      }
    }`);

  const tags = await admin.graphql(`
    {
      shop{
        productTags(first: 250){
          edges{
            cursor
            node
          }
        }
      }
    }`);

  const {
    data: {
      products: { nodes },
    },
  } = await response.json();

  return json({ nodes, tags: await tags.json() });
};
