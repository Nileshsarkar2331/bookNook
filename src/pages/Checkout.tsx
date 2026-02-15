import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { useUser } from "@clerk/clerk-react";

const Checkout = () => {
  const { items, totalItems, totalPrice, clear } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData(event.currentTarget);
      const shipping = {
        fullName: String(form.get("fullName") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        address1: String(form.get("address1") || ""),
        address2: String(form.get("address2") || ""),
        city: String(form.get("city") || ""),
        state: String(form.get("state") || ""),
        postal: String(form.get("postal") || ""),
        country: String(form.get("country") || ""),
        notes: String(form.get("notes") || ""),
      };

      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to place order.");
      }

      clear();
      setIsSubmitting(false);
      alert("Order placed! We'll email your shipping confirmation shortly.");
    } catch (err) {
      setIsSubmitting(false);
      alert(err instanceof Error ? err.message : "Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Shipping Details
          </h1>
          <p className="font-body text-muted-foreground mt-2">
            Tell us where to deliver your books.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-cream border border-sepia/20 rounded-lg p-6 md:p-8 shadow-page space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="Alex Johnson" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="+91 98765 43210" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  defaultValue={user?.primaryEmailAddress?.emailAddress ?? ""}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" name="address1" placeholder="Flat / House no., Street" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address Line 2</Label>
                <Input id="address2" name="address2" placeholder="Area, Landmark (optional)" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Bengaluru" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" placeholder="Karnataka" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input id="postal" name="postal" placeholder="560001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" placeholder="India" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Delivery Instructions</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Gate code, preferred delivery time, etc."
                  rows={4}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting || items.length === 0}
            >
              {items.length === 0 ? "Cart is empty" : isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </form>

          <aside className="bg-parchment border border-sepia/20 rounded-lg p-6 md:p-8 shadow-page h-fit">
            <h2 className="font-display text-2xl text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items in your cart yet.</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-body text-foreground text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.author} · {item.quantity} × ₹{item.price}
                      </div>
                    </div>
                    <div className="text-sm font-body text-foreground">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Separator className="my-4 bg-sepia/20" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Items</span>
              <span className="text-sm font-body text-foreground">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-display text-foreground">₹{totalPrice}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
