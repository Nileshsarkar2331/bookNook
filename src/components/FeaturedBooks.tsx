import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCard from "./BookCard";

const featuredBooks = [
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
    author: "Emily Brontë",
    price: 329,
    originalPrice: 599,
    condition: "Like New" as const,
    category: "Gothic Romance",
  },
];

const FeaturedBooks = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-aged-paper/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sepia/30 to-transparent" />
      <div className="absolute top-10 right-20 opacity-10">
        <Sparkles className="w-24 h-24 text-muted-gold" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-muted-gold" />
              <span className="font-elegant text-sm text-muted-foreground italic uppercase tracking-widest">
                Handpicked Selection
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Featured <span className="text-primary">Treasures</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-lg">
              Discover carefully curated books that have captured the hearts of readers 
              and are now seeking new homes.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="border-sepia/30 hover:bg-secondary hover:border-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="border-sepia/30 hover:bg-secondary hover:border-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Books carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredBooks.map((book, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] snap-start animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Button 
            variant="link" 
            className="font-display text-primary hover:text-primary/80 text-lg group"
          >
            View All Featured Books
            <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
