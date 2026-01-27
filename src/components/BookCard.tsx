import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  condition: "Like New" | "Good" | "Fair" | "Acceptable";
  category: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

const conditionColors = {
  "Like New": "bg-green-100 text-green-800 border-green-200",
  "Good": "bg-blue-100 text-blue-800 border-blue-200",
  "Fair": "bg-amber-100 text-amber-800 border-amber-200",
  "Acceptable": "bg-gray-100 text-gray-800 border-gray-200",
};

const BookCard = ({
  title,
  author,
  price,
  originalPrice,
  condition,
  category,
  imageUrl,
  isFeatured = false,
}: BookCardProps) => {
  return (
    <div className="group relative">
      {/* Book card styled like vintage book cover */}
      <div className="relative bg-gradient-to-br from-card to-aged-paper rounded-lg overflow-hidden shadow-book hover:shadow-book-hover transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-warm-brown/40 to-transparent" />
        
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute -top-1 -right-1 z-10">
            <div className="bg-muted-gold text-ink-black font-display text-xs px-3 py-1 rounded-bl-lg shadow-lg animate-bookmark-wave">
              ★ Featured
            </div>
          </div>
        )}

        {/* Book cover image */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-secondary to-muted overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-20 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded shadow-lg flex items-center justify-center">
                  <span className="font-display text-2xl text-primary-foreground">{title.charAt(0)}</span>
                </div>
                <div className="space-y-1">
                  <div className="w-20 h-1 mx-auto bg-sepia/30 rounded" />
                  <div className="w-14 h-1 mx-auto bg-sepia/20 rounded" />
                </div>
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-ink-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-cream/90 hover:bg-cream text-ink-black">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Wishlist button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-cream/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-maroon hover:bg-cream transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>

          {/* Page curl effect */}
          <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-cream transform rotate-45 translate-x-12 translate-y-12 shadow-[-2px_-2px_5px_rgba(0,0,0,0.1)]" />
          </div>
        </div>

        {/* Book details */}
        <div className="p-4 space-y-3 relative">
          {/* Decorative line */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-sepia/30 to-transparent" />
          
          {/* Category & Condition */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-elegant text-muted-foreground italic">{category}</span>
            <Badge variant="outline" className={`text-xs font-body ${conditionColors[condition]}`}>
              {condition}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Author */}
          <p className="font-elegant text-sm text-muted-foreground italic">
            by {author}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-sepia/10">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-primary">
                ₹{price}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {originalPrice && (
              <span className="text-xs font-body text-green-600 bg-green-50 px-2 py-1 rounded">
                {Math.round((1 - price / originalPrice) * 100)}% off
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
