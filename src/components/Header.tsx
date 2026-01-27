import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <div className="relative">
              <Input 
                placeholder="Search for books..." 
                className="w-48 lg:w-64 bg-cream border-sepia/30 focus:border-muted-gold pr-10 font-body text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sepia" />
            </div>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-secondary">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-secondary">
              <User className="w-5 h-5" />
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
            <div className="relative">
              <Input 
                placeholder="Search for books..." 
                className="w-full bg-cream border-sepia/30 focus:border-muted-gold pr-10 font-body"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sepia" />
            </div>
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
                <Button variant="outline" className="flex-1 border-sepia/30">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
                <Button variant="outline" className="flex-1 border-sepia/30">
                  <User className="w-4 h-4 mr-2" />
                  Account
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
