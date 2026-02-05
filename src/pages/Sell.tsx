import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Sell = () => {
  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    []
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    originalPrice: "",
    condition: "",
    category: "",
    imageUrl: "",
    description: "",
    sellerEmail: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/sell`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          originalPrice: Number(formData.originalPrice),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to submit listing.");
      }

      setStatus("success");
      setMessage("Your listing was submitted! We'll review and publish it soon.");
      setFormData({
        title: "",
        author: "",
        originalPrice: "",
        condition: "",
        category: "",
        imageUrl: "",
        description: "",
        sellerEmail: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Sell Your Books
          </h1>
          <p className="font-body text-muted-foreground">
            List your books and give them a new home.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream border border-sepia/20 rounded-lg p-6 md:p-8 shadow-page space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={event => updateField("title", event.target.value)}
                placeholder="The Great Gatsby"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={event => updateField("author", event.target.value)}
                placeholder="F. Scott Fitzgerald"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                min="0"
                value={formData.originalPrice}
                onChange={event => updateField("originalPrice", event.target.value)}
                placeholder="599"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select value={formData.condition} onValueChange={value => updateField("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Acceptable">Acceptable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={event => updateField("category", event.target.value)}
                placeholder="Classic Fiction"
                required
              />
            </div>
          </div>

          <div className="bg-parchment border border-sepia/20 rounded-lg p-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Selling Price</span>
              <span className="font-display text-foreground">
                ₹
                {(() => {
                  const original = Number(formData.originalPrice);
                  const map: Record<string, number> = {
                    "Like New": 0.35,
                    Good: 0.28,
                    Fair: 0.23,
                    Acceptable: 0.15,
                  };
                  const multiplier = map[formData.condition] ?? 0;
                  if (!Number.isFinite(original) || original <= 0 || !multiplier) return "—";
                  return Math.round(original * multiplier);
                })()}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Cover Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={event => updateField("imageUrl", event.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellerEmail">Seller Email</Label>
              <Input
                id="sellerEmail"
                type="email"
                value={formData.sellerEmail}
                onChange={event => updateField("sellerEmail", event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={event => updateField("description", event.target.value)}
              placeholder="Tell buyers about the book’s condition, highlights, or notes."
              rows={5}
            />
          </div>

          {message && (
            <div
              className={`text-sm ${
                status === "success" ? "text-green-700" : status === "error" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit Listing"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
