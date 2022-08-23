import { postToShopify } from "util/shopify";
import {} from ".//.//util/shopify";

export default async function handler(_req, res) {
  const data = await postToShopify({
    query: `{
        products(first: 50) {
          edges {
            node {
              id
              title
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              featuredImage {
                id
                url
              }
            }
          }
        }
      }`,
    variables: {},
  });
  res.status(200).json(data);
}
