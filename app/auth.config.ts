import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 1. ALWAYS allow API auth routes
      if (nextUrl.pathname.startsWith("/api/auth")) return true;

      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";

      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
      const isCheckoutPage = nextUrl.pathname.startsWith("/checkout");
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      // 2. Protect Admin Section
      if (isAdminPage) {
        if (isLoggedIn && isAdmin) return true;
        return false; 
      }

      // 3. Protect User Sections (Dashboard & Checkout)
      if (isDashboardPage || isCheckoutPage) {
        if (isLoggedIn) return true;
        return false; 
      }

      // 4. Redirect logged-in users away from Auth pages
      if (isAuthPage && isLoggedIn) {
        const redirectUrl = isAdmin ? "/admin" : "/dashboard";
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      return true; 
    },
  },
  providers: [], 
} satisfies NextAuthConfig;