import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@atomdrops.com",
    sub: "We reply within 24 hours",
    href: "mailto:support@atomdrops.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+880 1234-567890",
    sub: "Sat – Thu, 10 AM – 8 PM",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Dhaka, Bangladesh",
    sub: "By appointment only",
    href: undefined,
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Sat – Thu",
    sub: "10:00 AM – 8:00 PM BST",
    href: undefined,
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

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
            <span className="text-gray-800 font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-14 text-center">
          <MessageSquare className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Have a question, suggestion, or need help with an order? We'd love
            to hear from you.
          </p>
        </div>
      </div>

      <div className="daraz-container py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            return (
              <Wrapper
                key={item.title}
                {...(item.href ? { href: item.href } : {})}
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm font-medium">
                  {item.detail}
                </p>
                <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
              </Wrapper>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Send us a Message
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition bg-white"
              >
                <option value="">Select a topic</option>
                <option value="order">Order Related</option>
                <option value="product">Product Inquiry</option>
                <option value="return">Return / Refund</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="How can we help you?"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-primary text-white px-8 py-2.5 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
