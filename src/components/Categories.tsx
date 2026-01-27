import { 
  BookOpen, 
  Heart, 
  Skull, 
  Sparkles, 
  GraduationCap, 
  Baby, 
  Mountain, 
  Lightbulb,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    count: 12500,
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    description: "Timeless stories and modern tales",
  },
  {
    name: "Romance",
    icon: Heart,
    count: 8200,
    color: "from-maroon/20 to-maroon/5",
    borderColor: "border-maroon/30",
    description: "Love stories that warm the heart",
  },
  {
    name: "Mystery & Thriller",
    icon: Skull,
    count: 6800,
    color: "from-ink-black/20 to-ink-black/5",
    borderColor: "border-ink-black/30",
    description: "Page-turners full of suspense",
  },
  {
    name: "Fantasy & Sci-Fi",
    icon: Sparkles,
    count: 9400,
    color: "from-muted-gold/30 to-muted-gold/5",
    borderColor: "border-muted-gold/40",
    description: "Worlds beyond imagination",
  },
  {
    name: "Academic",
    icon: GraduationCap,
    count: 15600,
    color: "from-warm-brown/20 to-warm-brown/5",
    borderColor: "border-warm-brown/30",
    description: "Textbooks and study materials",
  },
  {
    name: "Children's Books",
    icon: Baby,
    count: 7200,
    color: "from-sepia/20 to-sepia/5",
    borderColor: "border-sepia/30",
    description: "Stories for young minds",
  },
  {
    name: "Non-Fiction",
    icon: Mountain,
    count: 11300,
    color: "from-primary/15 to-primary/5",
    borderColor: "border-primary/25",
    description: "Real stories and knowledge",
  },
  {
    name: "Self-Help",
    icon: Lightbulb,
    count: 5400,
    color: "from-muted-gold/25 to-muted-gold/5",
    borderColor: "border-muted-gold/35",
    description: "Books that inspire growth",
  },
];

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-aged-paper/30 to-background relative">
      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sepia/20 to-transparent" />
      
      {/* Ink stain decoration */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-sepia/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-warm-brown/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-muted-gold" />
            <span className="font-elegant text-sm text-muted-foreground italic uppercase tracking-widest">
              Explore by Genre
            </span>
            <div className="w-12 h-0.5 bg-muted-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Browse <span className="text-primary">Categories</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Find your next favorite read from our extensive collection spanning 
            every genre imaginable.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className={`
                  relative overflow-hidden rounded-xl p-6 
                  bg-gradient-to-br ${category.color}
                  border ${category.borderColor}
                  transition-all duration-300
                  hover:shadow-book hover:-translate-y-1
                  cursor-pointer
                `}
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-display text-2xl font-bold text-primary/60">
                    {(category.count / 1000).toFixed(1)}k
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="font-elegant text-sm text-muted-foreground italic">
                  {category.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>

                {/* Page corner effect */}
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-background/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display"
          >
            View All Categories
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
