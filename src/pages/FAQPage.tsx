import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How do I place an order?",
        a: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, provide a shipping address, and complete payment via bKash.",
      },
      {
        q: "How can I track my order?",
        a: 'After placing an order, go to "My Orders" in your account dashboard. You\'ll see the current status of each order, including tracking information once your order has been shipped.',
      },
      {
        q: "How long does delivery take?",
        a: "Delivery within Dhaka typically takes 1-3 business days. For other districts, it can take 3-7 business days depending on the location.",
      },
      {
        q: "Do you deliver outside Dhaka?",
        a: "Yes! We deliver to all 64 districts of Bangladesh. Delivery times and charges may vary based on your location.",
      },
      {
        q: "What are the shipping charges?",
        a: "Shipping charges are calculated at checkout based on your location and order weight. Orders over ৳2,000 within Dhaka get free shipping.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Currently, we accept bKash as our primary payment method. We are working on adding more payment options in the near future.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All payments are processed through bKash's secure payment gateway. We never store your financial information on our servers.",
      },
      {
        q: "When will I be charged?",
        a: "You will be charged immediately upon completing the bKash payment during checkout. The amount is reserved and captured once the order is confirmed.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy for most products. Items must be unused, in their original packaging, and in the same condition you received them. Please visit our Return Policy page for full details.",
      },
      {
        q: "How do I initiate a return?",
        a: 'Go to "My Orders", select the order you want to return, and click "Request Return". Our team will review your request and get back to you within 24 hours.',
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your returned item, refunds are processed within 3-5 business days. The refund will be sent to your bKash account.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "How do I create an account?",
        a: 'Click "Sign Up" at the top of the page and provide your email address and a password. You can also sign up during the checkout process.',
      },
      {
        q: "I forgot my password. What do I do?",
        a: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a link to reset your password.',
      },
      {
        q: "How do I update my profile information?",
        a: 'Log in to your account and go to "My Profile". From there, you can update your name, email, phone number, and manage your addresses.',
      },
    ],
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (key: string) =>
    setOpenIndex((prev) => (prev === key ? null : key));

  const filteredFaq = searchQuery.trim()
    ? faqData
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.a.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : faqData;

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
            <span className="text-gray-800 font-medium">FAQ</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Find answers to the most common questions about shopping with Atom
            Drops.
          </p>
          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question..."
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-primary focus:bg-white/15 transition"
            />
          </div>
        </div>
      </div>

      <div className="daraz-container py-12 max-w-3xl mx-auto space-y-8">
        {filteredFaq.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No questions match your search. Try different keywords.
            </p>
          </div>
        ) : (
          filteredFaq.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {cat.category}
              </h2>
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 overflow-hidden">
                {cat.items.map((item, idx) => {
                  const key = `${cat.category}-${idx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span
                          className={`text-sm font-medium ${isOpen ? "text-primary" : "text-gray-700"}`}
                        >
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 shrink-0 ml-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-3">Still have questions?</p>
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

export default FAQPage;
