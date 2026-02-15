import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Listing = {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  condition: "Like New" | "Good" | "Fair" | "Acceptable";
  category: string;
  description?: string;
  imageUrl?: string;
  sellerEmail: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
};

type AdminUser = {
  id: string;
  email: string;
  name: string;
};

const Admin = () => {
  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    []
  );

  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [priceEdits, setPriceEdits] = useState<Record<string, string>>({});

  const ordersChart = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, idx) => {
      const day = new Date(now);
      day.setDate(now.getDate() - (6 - idx));
      const key = day.toISOString().slice(0, 10);
      return { key, label: day.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: 0 };
    });

    const map = new Map(days.map(day => [day.key, day]));
    orders.forEach(order => {
      const key = new Date(order.createdAt).toISOString().slice(0, 10);
      const entry = map.get(key);
      if (entry) entry.count += 1;
    });

    return days;
  }, [orders]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/sell`);
      if (!response.ok) return;
      const data = await response.json();
      setListings(data.listings ?? []);
    } catch {
      // Ignore until backend is ready.
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/orders`);
      if (!response.ok) return;
      const data = await response.json();
      setOrders(data.orders ?? []);
    } catch {
      // Ignore until backend is ready.
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/users`);
      if (!response.ok) return;
      const data = await response.json();
      setUsers(data.users ?? []);
    } catch {
      // Ignore until backend is ready.
    }
  };

  useEffect(() => {
    fetchListings();
    fetchOrders();
    fetchUsers();
    const interval = setInterval(() => {
      fetchListings();
      fetchOrders();
      fetchUsers();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateListing = async (id: string, payload: Partial<Listing>) => {
    await fetch(`${apiBaseUrl}/api/sell/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    fetchListings();
  };

  const statusBadge = (status: Listing["status"]) => {
    if (status === "approved") return "bg-green-100 text-green-700 border-green-200";
    if (status === "rejected") return "bg-red-100 text-red-700 border-red-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16 space-y-10">
        <div className="space-y-2">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">Admin Panel</h1>
          <p className="font-body text-muted-foreground">
            Live overview of listings, orders, and users.
          </p>
        </div>

        <section className="bg-cream border border-sepia/20 rounded-lg p-6 shadow-page">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-foreground">Listings</h2>
            <span className="text-sm text-muted-foreground">{listings.length} total</span>
          </div>
          <div className="space-y-4">
            {listings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No listings yet.</p>
            ) : (
              listings.map(listing => (
                <div
                  key={listing.id}
                  className="border border-sepia/20 rounded-lg p-4 bg-parchment space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-display text-lg text-foreground">{listing.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {listing.author} · {listing.category} · {listing.condition}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Seller: {listing.sellerEmail}
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${statusBadge(listing.status)}`}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span>Original: ₹{listing.originalPrice}</span>
                    <span>Selling: ₹{listing.price}</span>
                    <span>Created: {new Date(listing.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => updateListing(listing.id, { status: "approved" })}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateListing(listing.id, { status: "rejected" })}
                    >
                      Reject
                    </Button>
                    <div className="flex items-center gap-2">
                      <Input
                        className="w-28"
                        placeholder="New price"
                        value={priceEdits[listing.id] ?? ""}
                        onChange={event =>
                          setPriceEdits(prev => ({ ...prev, [listing.id]: event.target.value }))
                        }
                      />
                      <Button
                        onClick={() => {
                          const value = Number(priceEdits[listing.id]);
                          if (!Number.isFinite(value) || value <= 0) return;
                          updateListing(listing.id, { price: value });
                          setPriceEdits(prev => ({ ...prev, [listing.id]: "" }));
                        }}
                      >
                        Update Price
                      </Button>
                    </div>
                  </div>
                  {listing.description && (
                    <p className="text-sm text-muted-foreground">{listing.description}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-cream border border-sepia/20 rounded-lg p-6 shadow-page">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-foreground">Orders (Last 7 Days)</h2>
            <span className="text-sm text-muted-foreground">{ordersChart.reduce((sum, d) => sum + d.count, 0)} total</span>
          </div>
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-64"
          >
            <BarChart data={ordersChart} margin={{ left: -10, right: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="count" name="Orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-cream border border-sepia/20 rounded-lg p-6 shadow-page space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-foreground">Orders</h2>
              <span className="text-sm text-muted-foreground">{orders.length} total</span>
            </div>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border border-sepia/20 rounded-lg p-3 bg-parchment">
                    <div className="text-sm text-foreground">Order #{order.id}</div>
                    <div className="text-xs text-muted-foreground">
                      ₹{order.total} · {order.status} · {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-cream border border-sepia/20 rounded-lg p-6 shadow-page space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-foreground">Users</h2>
              <span className="text-sm text-muted-foreground">{users.length} total</span>
            </div>
            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users yet.</p>
            ) : (
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="border border-sepia/20 rounded-lg p-3 bg-parchment">
                    <div className="text-sm text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
