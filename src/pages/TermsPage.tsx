import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsPage = () => {
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
            <span className="text-gray-800 font-medium">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="daraz-container py-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing and using the Atom Drops website and services, you
              accept and agree to be bound by these Terms & Conditions. If you
              do not agree to these terms, please do not use our services.
            </p>
          </Section>

          <Section title="2. Account Registration">
            <p>
              To make purchases, you must create an account with accurate and
              complete information. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
          </Section>

          <Section title="3. Products & Pricing">
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                All prices are listed in Bangladeshi Taka (৳) and include
                applicable taxes.
              </li>
              <li>
                We reserve the right to modify prices at any time without prior
                notice.
              </li>
              <li>
                Product images are for illustration purposes; actual products
                may vary slightly.
              </li>
              <li>
                We make every effort to display accurate product information but
                do not guarantee that descriptions are error-free.
              </li>
            </ul>
          </Section>

          <Section title="4. Orders & Payments">
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                Placing an order constitutes an offer to purchase. We reserve
                the right to accept or decline orders.
              </li>
              <li>
                Payment must be completed via bKash at the time of order
                placement.
              </li>
              <li>
                Orders are confirmed only after successful payment verification.
              </li>
              <li>We reserve the right to cancel orders suspected of fraud.</li>
            </ul>
          </Section>

          <Section title="5. Shipping & Delivery">
            <p>
              We aim to deliver products within the estimated timeframes, but
              delivery dates are not guaranteed. Atom Drops is not responsible
              for delays caused by events outside our control, including natural
              disasters, strikes, or logistics issues.
            </p>
          </Section>

          <Section title="6. Returns & Refunds">
            <p>
              Our return and refund policy is detailed on our{" "}
              <Link
                to="/return-policy"
                className="text-primary hover:underline"
              >
                Return & Refund Policy
              </Link>{" "}
              page. By making a purchase, you agree to the terms outlined there.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              All content on this website — including logos, text, images, and
              software — is the property of Atom Drops and is protected by
              copyright and intellectual property laws. You may not reproduce,
              distribute, or use any content without our written permission.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Atom Drops shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of our services or inability to use
              our services.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              We may update these Terms & Conditions from time to time. Changes
              will be posted on this page with an updated "Last updated" date.
              Continued use of our services after changes constitutes acceptance
              of the new terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              If you have any questions about these terms, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
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

export default TermsPage;
