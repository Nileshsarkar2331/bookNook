import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useCart } from "@/lib/cart";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useUser();
  const { items } = useCart();
  const displayName = user?.fullName || user?.username || "Reader";
  const email = user?.primaryEmailAddress?.emailAddress || "Not provided";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Your Account
          </h1>
          <p className="font-body text-muted-foreground">
            Manage your profile, orders, and saved items.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="bg-cream border border-sepia/20 rounded-lg p-6 md:p-8 shadow-page space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl text-foreground">Profile</h2>
              <p className="text-sm text-muted-foreground">Your public details.</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Name</p>
                <p className="text-sm font-body text-foreground">{displayName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="text-sm font-body text-foreground">{email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Member Since</p>
                <p className="text-sm font-body text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
          </section>

          <aside className="space-y-6">
            <div className="bg-parchment border border-sepia/20 rounded-lg p-6 shadow-page space-y-4">
              <h3 className="font-display text-xl text-foreground">Recent Orders</h3>
              <p className="text-sm text-muted-foreground">
                You haven’t placed any orders yet.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/browse">Browse books</Link>
              </Button>
            </div>

            <div className="bg-parchment border border-sepia/20 rounded-lg p-6 shadow-page space-y-3">
              <h3 className="font-display text-xl text-foreground">Saved Cart</h3>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <div className="space-y-2">
                  {items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.title}</span>
                      <span className="text-muted-foreground">× {item.quantity}</span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>
              )}
              <Button asChild variant="outline">
                <Link to="/checkout">Go to checkout</Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
