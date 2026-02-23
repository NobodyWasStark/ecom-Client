import {
  Droplets,
  Heart,
  Package,
  Shield,
  Target,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Every product on Atom Drops goes through rigorous quality checks before reaching our customers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We partner with the best logistics providers to ensure your orders arrive quickly and safely.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Our dedicated support team is available to help you with any questions or concerns.",
  },
  {
    icon: Zap,
    title: "Best Prices",
    description:
      "We work directly with brands to offer you the most competitive prices in Bangladesh.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Listed" },
  { value: "64", label: "Districts Covered" },
  { value: "99%", label: "Positive Reviews" },
];

const AboutPage = () => {
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
            <span className="text-gray-800 font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#232f3e] to-[#37475a] text-white">
        <div className="daraz-container py-16 md:py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Droplets className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            About Atom<span className="text-primary">Drops</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make online shopping simple, reliable, and
            enjoyable for everyone in Bangladesh.
          </p>
        </div>
      </div>

      <div className="daraz-container py-12 space-y-12">
        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Atom Drops was born from a simple observation: online shopping
                in Bangladesh could be so much better. We saw customers
                struggling with unreliable delivery, questionable product
                quality, and poor customer service.
              </p>
              <p>
                So we decided to build something different — an e-commerce
                platform that puts the customer experience first. From
                hand-picking our product catalog to building a logistics network
                that delivers fast and reliably, every decision we make starts
                with one question: "Is this good for our customers?"
              </p>
              <p>
                Today, Atom Drops serves thousands of happy customers across
                Bangladesh, offering a curated selection of electronics,
                fashion, beauty, and lifestyle products — all backed by our
                quality guarantee and dedicated support team.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            We're a passionate team of engineers, designers, and e-commerce
            veterans based in Dhaka, Bangladesh. We love what we do, and we're
            always looking for talented people to join us.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            <Package className="w-4 h-4" /> Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
