import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicyPage = () => {
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
            <span className="text-gray-800 font-medium">Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <Cookie className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cookie Policy</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Learn how we use cookies to improve your browsing experience.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="daraz-container py-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          <Section title="What Are Cookies?">
            <p>
              Cookies are small text files that are placed on your device when
              you visit a website. They help the website remember your
              preferences and improve your browsing experience.
            </p>
          </Section>

          <Section title="Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2.5 font-semibold text-gray-700">
                      Cookie
                    </th>
                    <th className="px-4 py-2.5 font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-4 py-2.5 font-semibold text-gray-700">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      auth_token
                    </td>
                    <td className="px-4 py-3">
                      <Badge type="essential" />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Keeps you logged into your account
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      cart_session
                    </td>
                    <td className="px-4 py-3">
                      <Badge type="essential" />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Remembers items in your shopping cart
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      preferences
                    </td>
                    <td className="px-4 py-3">
                      <Badge type="functional" />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Stores your language and region preferences
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Managing Cookies">
            <p>
              Most web browsers allow you to control cookies through their
              settings. You can delete existing cookies, allow or block all
              cookies, and set preferences for certain websites. Please note
              that disabling essential cookies may affect your ability to use
              our services.
            </p>
          </Section>

          <Section title="Third-Party Cookies">
            <p>
              We currently do not use any third-party analytics or advertising
              cookies. All cookies used on Atom Drops are first-party cookies
              set by our own domain.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Cookie Policy from time to time. Changes will
              be reflected on this page with an updated date.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              If you have questions about our use of cookies, please{" "}
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

const Badge = ({ type }: { type: "essential" | "functional" }) => (
  <span
    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
      type === "essential"
        ? "bg-green-50 text-green-700"
        : "bg-blue-50 text-blue-700"
    }`}
  >
    {type === "essential" ? "Essential" : "Functional"}
  </span>
);

export default CookiePolicyPage;
