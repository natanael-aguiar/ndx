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
          productType
          options {
            name
            position
            values
          }
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

  const { data: {
    shop: {
      productTags: {
        edges: _tags
      }
    }
  } } = await tags.json()

  return json({ nodes, tags: _tags.map(o => o.node) });
};
