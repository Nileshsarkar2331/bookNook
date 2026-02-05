import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookCard from "@/components/BookCard";

const books = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 299,
    originalPrice: 599,
    condition: "Like New" as const,
    category: "Classic Fiction",
    isFeatured: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 249,
    originalPrice: 450,
    condition: "Good" as const,
    category: "Classic Fiction",
    isFeatured: true,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 349,
    originalPrice: 550,
    condition: "Like New" as const,
    category: "Literary Fiction",
    isFeatured: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 199,
    originalPrice: 399,
    condition: "Good" as const,
    category: "Dystopian",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 279,
    originalPrice: 499,
    condition: "Fair" as const,
    category: "Coming of Age",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Bronte",
    price: 329,
    originalPrice: 599,
    condition: "Like New" as const,
    category: "Gothic Romance",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 199,
    originalPrice: 349,
    condition: "Good" as const,
    category: "Inspirational",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 399,
    originalPrice: 699,
    condition: "Like New" as const,
    category: "Non-fiction",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 349,
    originalPrice: 650,
    condition: "Good" as const,
    category: "Self-Help",
  },
  {
    title: "Ikigai",
    author: "Hector Garcia",
    price: 249,
    originalPrice: 499,
    condition: "Fair" as const,
    category: "Self-Help",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 289,
    originalPrice: 549,
    condition: "Good" as const,
    category: "Fantasy",
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 319,
    originalPrice: 599,
    condition: "Like New" as const,
    category: "Thriller",
  },
];

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(books.map(book => book.category)))],
    []
  );

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY;

    return books
      .filter(book => {
        const matchesQuery =
          !q ||
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q);
        const matchesCategory = category === "all" || book.category === category;
        const matchesCondition = condition === "all" || book.condition === condition;
        const matchesPrice = book.price >= min && book.price <= max;
        return matchesQuery && matchesCategory && matchesCondition && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "title") return a.title.localeCompare(b.title);
        return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
      });
  }, [query, category, condition, minPrice, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Browse Books
          </h1>
          <p className="font-body text-muted-foreground">
            {query ? `Showing results for "${query}".` : "Discover your next great read."}
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="bg-cream border border-sepia/20 rounded-lg p-6 shadow-page space-y-6 h-fit">
            <div className="space-y-3">
              <h2 className="font-display text-lg text-foreground">Filters</h2>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(item => (
                      <SelectItem key={item} value={item}>
                        {item === "all" ? "All" : item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Condition</label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="All conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Acceptable">Acceptable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Price Range</label>
                <div className="flex gap-3">
                  <Input
                    value={minPrice}
                    onChange={event => setMinPrice(event.target.value)}
                    type="number"
                    min="0"
                    placeholder="Min"
                  />
                  <Input
                    value={maxPrice}
                    onChange={event => setMaxPrice(event.target.value)}
                    type="number"
                    min="0"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Sort By</label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCategory("all");
                  setCondition("all");
                  setMinPrice("");
                  setMaxPrice("");
                  setSort("featured");
                }}
              >
                Reset Filters
              </Button>
            </div>
            <div className="pt-4 border-t border-sepia/20">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </aside>

          <section>
            {filteredBooks.length === 0 ? (
              <div className="bg-parchment border border-sepia/20 rounded-lg p-6 shadow-page">
                <p className="text-sm text-muted-foreground">
                  No books match your filters yet. Try adjusting the selections.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={`${book.title}-${book.author}`} {...book} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
