import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { CartProvider } from "@/app/context/CartContext";
import CustomCursor from "@/app/components/CustomCursor";
import SmoothScroll from "@/app/components/SmoothScroll";
import { Toaster } from "sonner";
import Script from "next/script"; // Import this

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>
              <CustomCursor />
              {children}
              <Toaster theme="dark" position="bottom-right" />
            </SmoothScroll>
          </CartProvider>
        </AuthProvider>

        {/* Razorpay SDK */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}