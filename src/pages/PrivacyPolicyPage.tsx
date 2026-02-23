import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#eff0f5] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="daraz-container py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your data.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="daraz-container py-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          <Section title="1. Information We Collect">
            <p className="mb-3">
              We collect information that you provide directly to us:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong>Account Information:</strong> Name, email address, phone
                number, and password when you create an account.
              </li>
              <li>
                <strong>Shipping Information:</strong> Delivery addresses you
                provide for order fulfillment.
              </li>
              <li>
                <strong>Order Information:</strong> Products purchased, order
                history, and payment transaction IDs.
              </li>
              <li>
                <strong>Communications:</strong> Messages you send us via
                contact forms or email.
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc list-inside space-y-1.5">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website, products, and services</li>
              <li>Prevent fraud and ensure security</li>
              <li>Send promotional communications (with your consent)</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p className="mb-3">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong>Payment Processors:</strong> bKash, to process your
                payments securely.
              </li>
              <li>
                <strong>Delivery Partners:</strong> Logistics providers, to
                deliver your orders.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights.
              </li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>
              We implement industry-standard security measures to protect your
              personal information. All data transmission is encrypted using
              SSL/TLS technology. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </Section>

          <Section title="5. Cookies">
            <p>
              We use essential cookies to keep you logged in and remember your
              cart. For more details, please see our{" "}
              <Link to="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                Access and update your personal information via your account
                settings
              </li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of promotional emails at any time</li>
              <li>Request a copy of the data we hold about you</li>
            </ul>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our services are not intended for individuals under the age of 16.
              We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting a notice on our
              website.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              If you have questions about this Privacy Policy, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>{" "}
              at support@atomdrops.com.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6">
    <h2 className="text-base font-bold text-gray-800 mb-3">{title}</h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

export default PrivacyPolicyPage;
