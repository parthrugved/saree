"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key?: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const taxAmount = cartTotal * 0.05; // 5% GST
  const finalTotal = cartTotal + taxAmount;
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep("cart"), 300);
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal, cart: cart, shippingDetails }),
      });
      
      if (!res.ok) {
        let errorMsg = "Failed to create order";
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // Ignore JSON parse error and use default message
        }
        throw new Error(errorMsg);
      }
      const { orderId, amount, currency } = await res.json();
      
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount,
        currency,
        name: "Sareekraft",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          
          if (verifyRes.ok) {
            alert("Payment successful!");
            clearCart();
            handleClose();
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: shippingDetails.name || "Test User",
          email: shippingDetails.email || "test@example.com",
          contact: shippingDetails.phone || "9999999999"
        },
        theme: {
          color: "#d97706"
        }
      };
      
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded. Please try again.");
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Something went wrong";
      alert(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === "cart" ? (
            cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-4">
                <ShoppingBag className="h-16 w-16 opacity-20" />
                <p>Your cart is empty.</p>
                <button 
                  onClick={handleClose}
                  className="text-amber-600 font-medium hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div className="h-24 w-20 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                      {/* Placeholder div if image not ready, next/image requires valid path */}
                      {item.image ? (
                          <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                          />
                      ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-4">Shipping Details</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Full Name" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.name} onChange={e => setShippingDetails({...shippingDetails, name: e.target.value})} />
                <input type="email" placeholder="Email Address" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.email} onChange={e => setShippingDetails({...shippingDetails, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.phone} onChange={e => setShippingDetails({...shippingDetails, phone: e.target.value})} />
                <textarea placeholder="Full Address" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900 h-24 resize-none" value={shippingDetails.address} onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.city} onChange={e => setShippingDetails({...shippingDetails, city: e.target.value})} />
                  <input type="text" placeholder="State" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.state} onChange={e => setShippingDetails({...shippingDetails, state: e.target.value})} />
                </div>
                <input type="text" placeholder="PIN Code" required className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-900" value={shippingDetails.pincode} onChange={e => setShippingDetails({...shippingDetails, pincode: e.target.value})} />
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-950">
            <div className="flex justify-between text-base font-medium mb-2">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
              <span>Tax (5% GST)</span>
              <span>₹{taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6 border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>
            
            {step === "cart" ? (
              <button 
                onClick={() => setStep("shipping")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium transition-colors shadow-md shadow-amber-600/20"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep("cart")}
                  className="w-1/3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-4 rounded-full font-medium transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !shippingDetails.name || !shippingDetails.phone || !shippingDetails.address}
                  className="w-2/3 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium transition-colors shadow-md shadow-amber-600/20 disabled:opacity-50"
                >
                  {isCheckingOut ? "Processing..." : "Pay with Razorpay"}
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-center text-sm text-gray-500">
              <span className="flex items-center gap-2">
                Secured by Razorpay
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
