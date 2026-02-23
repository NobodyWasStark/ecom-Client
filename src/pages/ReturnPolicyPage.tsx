import {
  AlertTriangle,
  CheckCircle,
  Clock,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const ReturnPolicyPage = () => {
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
              Return & Refund Policy
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <RotateCcw className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Return & Refund Policy
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            We want you to be 100% happy with your purchase. If something isn't
            right, we'll make it right.
          </p>
        </div>
      </div>

      <div className="daraz-container py-12 max-w-3xl mx-auto space-y-6">
        {/* Quick Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5 text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-semibold text-gray-800 text-sm">7-Day Returns</p>
            <p className="text-xs text-gray-500 mt-1">
              From the date of delivery
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5 text-center">
            <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-semibold text-gray-800 text-sm">Free Returns</p>
            <p className="text-xs text-gray-500 mt-1">
              For defective or wrong items
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5 text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-semibold text-gray-800 text-sm">
              3-5 Day Refunds
            </p>
            <p className="text-xs text-gray-500 mt-1">
              After return is received
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          <Section title="Eligible for Returns">
            <ul className="space-y-2">
              {[
                "Product received is damaged or defective",
                "Wrong product or size delivered",
                "Product is significantly different from the description",
                "Product is unused, unwashed, and in its original packaging",
                "Return is requested within 7 days of delivery",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Not Eligible for Returns">
            <ul className="space-y-2">
              {[
                "Products that have been used, washed, or altered",
                "Innerwear, lingerie, and personal hygiene products",
                "Perishable goods (food, flowers, etc.)",
                "Downloadable or digital products",
                "Products returned after the 7-day window",
                "Products without original packaging or tags",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="How to Return">
            <ol className="space-y-3">
              {[
                'Log in to your account and go to "My Orders".',
                "Select the order containing the item you want to return.",
                'Click "Request Return" and provide the reason.',
                "Our team will review your request within 24 hours.",
                "If approved, we will arrange pickup or provide return instructions.",
                "Once received and inspected, your refund will be processed.",
              ].map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="w-6 h-6 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Refund Process">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Refunds are processed within <strong>3-5 business days</strong>{" "}
                after we receive and inspect the returned item. The refund will
                be sent back to your bKash account.
              </p>
              <div className="flex items-start gap-2.5 bg-amber-50 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-amber-700 text-xs">
                  Shipping charges are non-refundable unless the return is due
                  to our error (wrong/defective item).
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-3">Need help with a return?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Contact Support
          </Link>
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
    <h2 className="text-base font-bold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default ReturnPolicyPage;
