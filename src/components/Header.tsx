import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, removeItem, clear } = useCart();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/browse?query=${encodeURIComponent(query)}` : "/browse");
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-sm border-b border-sepia/20 shadow-page">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-muted-gold rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold text-primary tracking-wide">
                BookNook
              </span>
              <span className="hidden md:block text-[10px] text-muted-foreground font-elegant italic -mt-1">
                Where Stories Find New Homes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-body text-foreground hover:text-primary transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/browse" 
              className="font-body text-foreground hover:text-primary transition-colors relative group"
            >
              Browse Books
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/sell" 
              className="font-body text-foreground hover:text-primary transition-colors relative group"
            >
              Sell Books
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/about" 
              className="font-body text-foreground hover:text-primary transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                placeholder="Search for books..."
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                className="w-48 lg:w-64 bg-cream border-sepia/30 focus:border-muted-gold pr-10 font-body text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sepia" />
            </form>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary hover:bg-secondary relative"
                onClick={() => setIsCartOpen(open => !open)}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
              {isCartOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-cream border border-sepia/20 shadow-page rounded-lg p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-lg text-foreground">Your Cart</span>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={clear}>
                      Clear
                    </Button>
                  </div>
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                  ) : (
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-body text-foreground line-clamp-1">{item.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.author} · {item.quantity} × ₹{item.price}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-maroon"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-sepia/20 flex items-center justify-between">
                        <span className="text-sm font-body text-muted-foreground">Total</span>
                        <span className="font-display text-lg text-foreground">₹{totalPrice}</span>
                      </div>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                          Checkout
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button asChild variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-secondary">
              <Link to="/account">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-foreground"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                placeholder="Search for books..."
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                className="w-full bg-cream border-sepia/30 focus:border-muted-gold pr-10 font-body"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sepia" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 animate-fade-in-up">
            <div className="flex flex-col gap-4 pt-4 border-t border-sepia/20">
              <Link 
                to="/" 
                className="font-body text-lg text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className="font-body text-lg text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Books
              </Link>
              <Link 
                to="/sell" 
                className="font-body text-lg text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Books
              </Link>
              <Link 
                to="/about" 
                className="font-body text-lg text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex gap-4 pt-4 border-t border-sepia/20">
                <Button asChild variant="outline" className="flex-1 border-sepia/30">
                  <Link to="/checkout" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {totalItems > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-sepia/30">
                  <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
