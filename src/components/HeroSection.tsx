import { BookOpen, ShoppingBag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with open book effect */}
      <div className="absolute inset-0 paper-texture" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-sepia">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-48 h-48 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-warm-brown">
          <rect x="10" y="10" width="80" height="80" fill="currentColor" />
        </svg>
      </div>

      {/* Book spine decoration on left */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-warm-brown/20 to-transparent book-spine" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            {/* Bookmark accent */}
            <div className="inline-flex items-center gap-2 bg-maroon/10 border border-maroon/20 rounded-full px-4 py-2 animate-bookmark-wave">
              <div className="w-2 h-6 bg-maroon rounded-t-full" />
              <span className="font-elegant text-sm text-maroon italic">
                Discover Your Next Chapter
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ink-black leading-tight text-shadow-vintage">
              Where Old Books
              <span className="block text-primary">Find New Readers</span>
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into a cozy digital haven where beloved stories await new homes. 
              Buy treasured tales or share your literary companions with fellow book lovers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg px-8 py-6 shadow-book hover:shadow-book-hover transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-page-flip" />
                Browse Books
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display text-lg px-8 py-6 transition-all duration-300"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Sell Your Books
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-sepia/20 mt-8">
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">50K+</div>
                <div className="font-elegant text-sm text-muted-foreground italic">Books Available</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">12K+</div>
                <div className="font-elegant text-sm text-muted-foreground italic">Happy Readers</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="font-elegant text-sm text-muted-foreground italic">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Stacked books illustration */}
            <div className="relative w-80 h-96">
              {/* Back book */}
              <div className="absolute bottom-0 left-0 w-56 h-72 bg-gradient-to-br from-maroon to-maroon/80 rounded-lg shadow-book transform -rotate-6 animate-float-book">
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-maroon/80 rounded-l-lg book-spine" />
                <div className="p-6 pt-10">
                  <div className="w-12 h-1 bg-muted-gold/60 mb-4" />
                  <div className="w-20 h-1 bg-cream/40" />
                </div>
              </div>
              
              {/* Middle book */}
              <div className="absolute bottom-8 left-12 w-56 h-72 bg-gradient-to-br from-warm-brown to-warm-brown/80 rounded-lg shadow-book transform rotate-3 animate-float-book animation-delay-200">
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-warm-brown/80 rounded-l-lg book-spine" />
                <div className="p-6 pt-10">
                  <div className="w-16 h-1 bg-muted-gold/60 mb-4" />
                  <div className="w-24 h-1 bg-cream/40" />
                </div>
              </div>
              
              {/* Front book (open) */}
              <div className="absolute bottom-16 left-24 w-64 h-80 perspective-1000">
                <div className="relative w-full h-full">
                  {/* Left page */}
                  <div className="absolute left-0 w-1/2 h-full bg-cream rounded-l-lg shadow-page p-4 transform origin-right">
                    <div className="h-full flex flex-col justify-center gap-2">
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-4/5 h-1 bg-sepia/20" />
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-3/4 h-1 bg-sepia/20" />
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-2/3 h-1 bg-sepia/20" />
                    </div>
                  </div>
                  {/* Right page */}
                  <div className="absolute right-0 w-1/2 h-full bg-gradient-to-r from-cream to-aged-paper rounded-r-lg shadow-page p-4 page-curl">
                    <div className="h-full flex flex-col justify-center gap-2">
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-3/5 h-1 bg-sepia/20" />
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-4/5 h-1 bg-sepia/20" />
                      <div className="w-full h-1 bg-sepia/20" />
                      <div className="w-1/2 h-1 bg-sepia/20" />
                    </div>
                  </div>
                  {/* Book cover behind */}
                  <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-primary to-primary/80 rounded-lg -translate-y-2">
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-primary/80 rounded-l-lg book-spine" />
                  </div>
                </div>
              </div>

              {/* Floating bookmark */}
              <div className="absolute -top-4 right-8 w-8 h-24 bg-gradient-to-b from-muted-gold to-muted-gold/80 rounded-b-lg shadow-lg animate-bookmark-wave">
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-muted-gold/80 clip-path-triangle" 
                  style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} />
              </div>

              {/* Reading glasses */}
              <div className="absolute -bottom-8 right-4 opacity-60">
                <svg className="w-24 h-12 text-warm-brown/60" viewBox="0 0 100 40" fill="none">
                  <ellipse cx="25" cy="20" rx="20" ry="15" stroke="currentColor" strokeWidth="2" />
                  <ellipse cx="75" cy="20" rx="20" ry="15" stroke="currentColor" strokeWidth="2" />
                  <path d="M45 20 L55 20" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 15 L0 10" stroke="currentColor" strokeWidth="2" />
                  <path d="M95 15 L100 10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-aged-paper/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-32 h-1 bg-sepia/30 rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;
