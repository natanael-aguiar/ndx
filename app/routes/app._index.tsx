import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, Text, Card, BlockStack, List } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    The Fashion NDX
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Free to install. Additional charges may apply.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Connect your store to The Fashion NDX to ensure authenticity
                    and enhance customer trust.
                  </Text>
                  <Text as="p" variant="bodyMd">
                    The Fashion NDX offers the world's first global luxury
                    database (NDX), providing a single source of truth for the
                    authenticity of luxury goods. Our seamless SAAS product for
                    designers and effortless customer experience for buyers and
                    sellers ensures unparalleled precision in authenticating
                    goods.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Key Benefits:
                  </Text>
                  <List type="bullet">
                    <List.Item>
                      DEDICATED PUBLIC DATABASE FOR AUTHENTIC LUXURY GOODS:
                      Access a comprehensive database to verify the authenticity
                      of luxury items.
                    </List.Item>
                    <List.Item>
                      FULLY AUTOMATED AT POS: Enjoy automated authenticity
                      checks at the point of sale, reducing manual effort and
                      errors.
                    </List.Item>
                    <List.Item>
                      REDUCE COUNTERFEIT GOODS: Protect your brand and customers
                      by minimizing the risk of counterfeit goods.
                    </List.Item>
                    <List.Item>
                      REDUCE SLIPPAGE: Improve inventory management and reduce
                      losses.
                    </List.Item>
                    <List.Item>
                      PEACE OF MIND FOR CUSTOMERS: Enhance customer confidence
                      with verified authenticity.
                    </List.Item>
                    <List.Item>
                      IMPROVED BRAND REPUTATION: Build a reputation for
                      reliability and trustworthiness.
                    </List.Item>
                    <List.Item>
                      FREE TO INSTALL: Get started without any installation
                      costs.
                    </List.Item>
                  </List>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    How It Works:
                  </Text>
                  <List type="bullet">
                    <List.Item>
                      Tracks Lifetime of Originals: Monitor the history and
                      authenticity of luxury items throughout their lifecycle.
                    </List.Item>
                    <List.Item>
                      Quick Install & Frictionless Registration Process: Set up
                      effortlessly with an easy-to-follow installation and
                      registration process.
                    </List.Item>
                    <List.Item>
                      Fully Automated; Sales and Re-sales: Automate authenticity
                      verification for both sales and resales.
                    </List.Item>
                    <List.Item>
                      Certificates of Authenticity: Ensure authenticity with
                      certificates only registered by pre-approved brands and
                      retailers.
                    </List.Item>
                    <List.Item>
                      Tailored Certificates: Customize certificates of
                      authenticity to match your brand’s requirements.
                    </List.Item>
                    <List.Item>
                      Secure Transfer: Certificates of authenticity cannot be
                      sold or transferred separately from their physical
                      counterparts.
                    </List.Item>
                    <List.Item>
                      Privacy Assured: No additional privacy measures needed;
                      fully approved by Shopify.
                    </List.Item>
                  </List>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Free to Install: Start using The Fashion NDX at no
                    additional cost.
                  </Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodyMd">
                      Transform your store with The Fashion NDX, your trusted
                      partner in luxury goods authentication, ensuring the
                      highest standards of authenticity and customer trust.
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
