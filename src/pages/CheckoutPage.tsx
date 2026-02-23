import { Check, MapPin, MessageCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useCart } from "../store/useCart";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = 60;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await api.get("/addresses");
      const addressList = data.data || data || [];
      setAddresses(addressList);
      // Auto-select default address
      const defaultAddr = addressList.find((a: Address) => a.is_default);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      else if (addressList.length > 0) setSelectedAddressId(addressList[0].id);
    } catch (error) {
      console.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setProcessing(true);
    try {
      // Step 1: Create order from cart
      const orderRes = await api.post("/orders/from-cart", {
        shipping_address_id: selectedAddressId,
      });
      const order = orderRes.data.data || orderRes.data;

      // Step 2: Initialize bKash payment (get WhatsApp link)
      const paymentRes = await api.post("/payments/init", {
        order_id: order.id,
      });
      const paymentData = paymentRes.data.data || paymentRes.data;

      // Step 3: Navigate to pending payment page with order details
      navigate(
        `/payment/pending?orderId=${order.id}&paymentId=${paymentData.paymentID}&amount=${paymentData.amount}&whatsapp=${encodeURIComponent(paymentData.whatsappURL)}`,
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed to place order",
      );
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="daraz-container py-10">
        <div className="bg-white rounded-sm shadow-card p-10 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <button onClick={() => navigate("/")} className="daraz-btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="daraz-container py-6">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Address & Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Shipping Address */}
          <div className="bg-white rounded-sm shadow-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Shipping Address
              </h2>
              <button
                onClick={() => navigate("/addresses")}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Manage Addresses
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">No shipping address found</p>
                <button
                  onClick={() => navigate("/addresses")}
                  className="daraz-btn-outline"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-3 border rounded-sm cursor-pointer transition-colors ${
                      selectedAddressId === addr.id
                        ? "border-primary bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {addr.full_name}
                        </span>
                        {addr.is_default && (
                          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{addr.phone}</p>
                      <p className="text-sm text-gray-600">
                        {addr.address_line1}, {addr.city} {addr.postal_code}
                      </p>
                    </div>
                    {selectedAddressId === addr.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Order Items Preview */}
          <div className="bg-white rounded-sm shadow-card p-4">
            <h2 className="font-medium text-gray-800 mb-4">
              Order Items ({items.length})
            </h2>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm border border-gray-100"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-primary">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="bg-white rounded-sm shadow-card p-4 sticky top-20">
            <h2 className="font-medium text-gray-800 mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>৳ {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>৳ {shippingFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-primary">
                  ৳ {(totalAmount + shippingFee).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
              <div className="flex items-center gap-3 p-3 border border-[#e2136e] rounded-sm bg-pink-50">
                <div className="bg-[#e2136e] text-white px-3 py-1 rounded font-bold text-sm">
                  bKash
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-700 font-medium">
                    Send Money via bKash
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pay via WhatsApp — we'll confirm your order manually
                  </p>
                </div>
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={processing || !selectedAddressId}
              className="w-full mt-6 bg-primary text-white py-3 uppercase font-bold text-sm rounded-sm hover:bg-primary-hover shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Processing..." : "Place Order & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
