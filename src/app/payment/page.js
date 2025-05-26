"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCartItem } from "@/context/cartcontext";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, clearCart, numberOfCartItems } = useCartItem();

  const [paymentType, setPaymentType] = useState("single");
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "loading") return;

    const titleParam = searchParams.get("title");
    const priceParam = searchParams.get("price");
    const sourceParam = searchParams.get("source");

    if (sourceParam === "cart") {
      setPaymentType("cart");
    } else if (titleParam && priceParam) {
      setPaymentType("single");
      setSingleProduct({
        title: titleParam,
        price: Number(priceParam),
        quantity: 1
      });
    } else if (numberOfCartItems > 0) {
      setPaymentType("cart");
    } else {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [searchParams, status, numberOfCartItems, router]);

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentType === "cart") {
        clearCart();
      }
      
      alert("Payment successful! Thank you for your purchase.");
      router.push("/");
      
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "save10") {
      setDiscount(0.1); // 10% discount
      alert("Discount code applied successfully! 10% off");
    } else if (discountCode.toLowerCase() === "save20") {
      setDiscount(0.2); // 20% discount
      alert("Discount code applied successfully! 20% off");
    } else if (discountCode.trim() !== "") {
      alert("Invalid discount code!");
      setDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    if (paymentType === "single" && singleProduct) {
      return singleProduct.price * singleProduct.quantity;
    } else if (paymentType === "cart") {
      return cartItems.reduce((total, item) => total + (item.price || 0), 0);
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * discount;
    return subtotal - discountAmount;
  };

  const getItemsCount = () => {
    if (paymentType === "single") return 1;
    return numberOfCartItems;
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">Pembayaran</h1>
          <p className="text-center text-gray-600">
            {paymentType === "cart" 
              ? `Checkout ${numberOfCartItems} item dari keranjang` 
              : "single product checkout"
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="space-y-4">
              {paymentType === "single" && singleProduct ? (
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{singleProduct.title}</h3>
                      <p className="text-sm text-gray-500">Quantity: {singleProduct.quantity}</p>
                    </div>
                    <span className="font-semibold">${singleProduct.price.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.cart_id} className="flex justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.descript?.substring(0, 40)}...
                        </p>
                      </div>
                      <span className="font-semibold">
                        ${item.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Section */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({getItemsCount()} items)</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({(discount * 100)}%)</span>
                    <span>-${(calculateSubtotal() * discount).toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <div className="space-y-4">
              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select className="w-full p-3 border rounded-lg">
                  <option>Bank Transfer</option>
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              {/* Order Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Order Notes</label>
                <textarea
                  value={orderDescription}
                  onChange={(e) => setOrderDescription(e.target.value)}
                  placeholder="Add special notes for your order (optional)"
                  className="w-full p-3 border rounded-lg h-20 resize-none"
                />
              </div>

              {/* Discount Voucher */}
              <div>
                <label className="block text-sm font-medium mb-2">Discount Voucher Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter voucher code"
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <button
                    onClick={applyDiscount}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Try: "SAVE10" or "SAVE20"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg"
              disabled={processing}
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                `Pay $ ${calculateTotal().toFixed(2)}`
              )}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 text-center mt-4">
            By continuing, you agree to our Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}