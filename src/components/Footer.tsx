import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary/5 to-primary/10 relative">
      {/* Decorative top border styled like book page edge */}
      <div className="h-4 bg-gradient-to-b from-background to-transparent" />
      <div className="border-t border-sepia/20" />

      {/* Quote section - like final page of a book */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block p-6 bg-card rounded-lg shadow-page border border-border relative page-curl">
            <Quote className="absolute -top-3 -left-3 w-8 h-8 text-muted-gold opacity-50" />
            <blockquote className="font-elegant text-xl md:text-2xl text-foreground italic leading-relaxed">
              "A room without books is like a body without a soul."
            </blockquote>
            <footer className="mt-4 font-display text-muted-foreground">
              — Marcus Tullius Cicero
            </footer>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <span className="font-display text-xl font-bold text-foreground">
                  BookNook
                </span>
                <p className="font-elegant text-xs text-muted-foreground italic">
                  Where Stories Find New Homes
                </p>
              </div>
            </Link>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              A cozy corner of the internet where pre-loved books find 
              loving new readers. Join our community of bibliophiles today.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/nilesh_sarkar2331/" 
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Browse Books", "Sell Your Books", "How It Works", "Pricing", "FAQs"].map((link) => (
                <li key={link}>
                  <Link 
                    to="#" 
                    className="font-body text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-muted-gold mr-0 group-hover:mr-2 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Categories
            </h4>
            <ul className="space-y-2">
              {["Fiction", "Non-Fiction", "Academic", "Children's Books", "Romance", "Mystery"].map((category) => (
                <li key={category}>
                  <Link 
                    to="#" 
                    className="font-body text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-muted-gold mr-0 group-hover:mr-2 transition-all" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Stay Updated
            </h4>
            <p className="font-body text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest arrivals and book recommendations.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email"
                placeholder="Your email"
                className="bg-background border-border focus:border-primary font-body text-sm"
              />
              <Button className="bg-primary hover:bg-primary/90 shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>

            {/* Contact info */}
            <div className="space-y-2 pt-4">
              <a href="mailto:nonvegcoder@gmail.com" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                nonvegcoder@gmail.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 8899115550
              </a>
              <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Uttarkhand, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - styled like book end page */}
      <div className="border-t border-sepia/20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-elegant text-sm text-muted-foreground italic">
              © 2026 BookNook. Crafted with ♥ for book lovers everywhere.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>

          {/* Decorative end flourish */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-sepia/20" />
            <span className="font-elegant text-sm text-sepia/40 italic">~ Made by Nilesh Sarkar~</span>
            <div className="w-16 h-px bg-sepia/20" />
          </div>
            <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-sepia/20" />
            <span className="font-elegant text-sm text-sepia/40 italic">~ The End ~</span>
            <div className="w-16 h-px bg-sepia/20" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Quote component for the footer
const Quote = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

export default Footer;
