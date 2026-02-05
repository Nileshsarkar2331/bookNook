import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Index from "./pages/Index";
import SignInPage from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import About from "./pages/About";
import Account from "./pages/Account";

export default function App() {
  return (
    <Routes>
      {/* 🔑 SIGN IN */}
      <Route path="/sign-in/*" element={<SignInPage />} />

      {/* 🔐 PROTECTED HOME */}
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Index />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* 📚 BROWSE */}
      <Route
        path="/browse"
        element={
          <>
            <SignedIn>
              <Browse />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* 📝 SELL */}
      <Route
        path="/sell"
        element={
          <>
            <SignedIn>
              <Sell />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* ℹ️ ABOUT */}
      <Route
        path="/about"
        element={
          <>
            <SignedIn>
              <About />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* 👤 ACCOUNT */}
      <Route
        path="/account"
        element={
          <>
            <SignedIn>
              <Account />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* 🧾 CHECKOUT */}
      <Route
        path="/checkout"
        element={
          <>
            <SignedIn>
              <Checkout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
