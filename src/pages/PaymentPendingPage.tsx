import { CheckCircle, Clock, Copy, MessageCircle, Phone } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../store/useCart";

const BKASH_NUMBER = "01997125063";

const PaymentPendingPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const amount = searchParams.get("amount");
  const whatsappURL = searchParams.get("whatsapp");
  const { items, removeItem } = useCart();

  // Clear cart after order is placed
  useEffect(() => {
    if (items.length > 0) {
      items.forEach((item) => removeItem(item.id));
    }
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const formattedAmount = amount ? `৳${Number(amount).toLocaleString()}` : "৳0";

  return (
    <div className="daraz-container py-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-card p-8 text-center mb-6">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed — Payment Pending
        </h1>
        <p className="text-gray-500">
          Your order has been created. Complete payment via bKash to confirm it.
        </p>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
        {/* bKash Header */}
        <div className="bg-[#e2136e] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md px-3 py-1">
              <span className="font-bold text-[#e2136e] text-lg">bKash</span>
            </div>
            <div className="text-white">
              <h2 className="font-semibold text-lg">Send Money via bKash</h2>
              <p className="text-pink-100 text-sm">
                Complete payment to confirm your order
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Step 1: bKash Number */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#e2136e] text-white flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">
                Send money to this bKash number:
              </p>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <Phone className="w-5 h-5 text-[#e2136e]" />
                <span className="text-xl font-bold text-gray-800 tracking-wide font-mono">
                  {BKASH_NUMBER}
                </span>
                <button
                  onClick={() => copyToClipboard(BKASH_NUMBER, "bKash number")}
                  className="ml-auto p-1.5 hover:bg-gray-200 rounded-md transition-colors"
                  title="Copy number"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Amount */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#e2136e] text-white flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">Amount to send:</p>
              <div className="flex items-center gap-3 bg-pink-50 border border-pink-200 rounded-lg px-4 py-3">
                <span className="text-2xl font-bold text-[#e2136e]">
                  {formattedAmount}
                </span>
                <button
                  onClick={() => copyToClipboard(amount || "0", "Amount")}
                  className="ml-auto p-1.5 hover:bg-pink-100 rounded-md transition-colors"
                  title="Copy amount"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Notify via WhatsApp */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#e2136e] text-white flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">
                After sending, tap below to notify us via WhatsApp:
              </p>
              <a
                href={
                  whatsappURL
                    ? decodeURIComponent(whatsappURL)
                    : `https://wa.me/8801997125063`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-lg shadow-md"
              >
                <MessageCircle className="w-6 h-6" />
                Confirm on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Order Reference */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
            {orderId && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Order:</span>
                <code className="bg-gray-200 px-2 py-0.5 rounded text-xs font-mono text-gray-700">
                  {orderId.slice(0, 12)}...
                </code>
                <button
                  onClick={() => copyToClipboard(orderId, "Order ID")}
                  className="p-0.5 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            )}
            {paymentId && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Ref:</span>
                <code className="bg-gray-200 px-2 py-0.5 rounded text-xs font-mono text-gray-700">
                  {paymentId}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          What happens next?
        </h3>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>
            Send <strong>{formattedAmount}</strong> to bKash{" "}
            <strong>{BKASH_NUMBER}</strong>
          </li>
          <li>
            Send us your payment screenshot or Transaction ID via WhatsApp
          </li>
          <li>
            We'll verify and confirm your order within{" "}
            <strong>15 minutes</strong>
          </li>
          <li>You'll receive an order confirmation notification</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/orders">
          <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            View My Orders
          </button>
        </Link>
        <Link to="/">
          <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPendingPage;
