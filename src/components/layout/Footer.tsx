import {
  ArrowUp,
  ChevronRight,
  Droplets,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /** For protected links: navigate if logged in, otherwise send to login with a redirect back */
  const handleProtectedClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string,
  ) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate(`/login?redirect=${encodeURIComponent(to)}`);
    }
  };

  return (
    <footer className="mt-12">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-sm py-3 transition-colors"
      >
        <span className="flex items-center justify-center gap-1.5">
          <ArrowUp className="w-4 h-4" /> Back to top
        </span>
      </button>

      {/* Main Footer */}
      <div className="bg-[#232f3e] text-gray-300">
        <div className="daraz-container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-end gap-1 mb-4 group">
                <Droplets className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-white tracking-tight">
                  Atom<span className="text-primary">Drops</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Your favourite destination for quality products at the best
                prices. Fast delivery across Bangladesh.
              </p>
              <div className="space-y-2.5 text-sm">
                <a
                  href="mailto:support@atomdrops.com"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-gray-500" />{" "}
                  support@atomdrops.com
                </a>
                <a
                  href="tel:+8801234567890"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-gray-500" /> +880 1234-567890
                </a>
                <span className="flex items-center gap-2.5 text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500" /> Dhaka, Bangladesh
                </span>
              </div>
            </div>

            {/* Get to Know Us */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Get to Know Us
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", to: "/about" },
                  { label: "All Products", to: "/products" },
                  { label: "FAQ", to: "/faq" },
                  { label: "Contact", to: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Customer Service
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Track Your Order", to: "/orders", protected: true },
                  { label: "My Profile", to: "/profile", protected: true },
                  { label: "My Addresses", to: "/addresses", protected: true },
                  { label: "My Reviews", to: "/my-reviews", protected: true },
                  { label: "Return & Refund Policy", to: "/return-policy" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={
                        link.protected
                          ? (e) => handleProtectedClick(e, link.to)
                          : undefined
                      }
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment & Legal */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Payment
              </h4>
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 bg-[#e2136e] text-white px-4 py-2 rounded-lg">
                  <span className="font-bold text-base tracking-wide">
                    bKash
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Secure payments via bKash
                </p>
              </div>

              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Terms & Conditions", to: "/terms" },
                  { label: "Privacy Policy", to: "/privacy" },
                  { label: "Cookie Policy", to: "/cookies" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131a22]">
        <div className="daraz-container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © {year} Atom Drops. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link
                to="/privacy"
                className="hover:text-gray-300 transition-colors"
              >
                Privacy
              </Link>
              <span className="text-gray-700">·</span>
              <Link
                to="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Terms
              </Link>
              <span className="text-gray-700">·</span>
              <Link to="/faq" className="hover:text-gray-300 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
