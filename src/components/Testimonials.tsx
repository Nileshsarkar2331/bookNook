import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Book Collector",
    quote: "BookNook feels like walking into my grandmother's library. The vintage aesthetic and personal touch make every purchase feel special.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Mehta",
    role: "Student",
    quote: "I've saved thousands on textbooks! The condition ratings are accurate, and the sellers are genuine book lovers.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Ananya Reddy",
    role: "Seller",
    quote: "Selling my old books was so easy. The platform connects me with people who truly appreciate literature.",
    rating: 5,
    avatar: "AR",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sepia/20 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-muted-gold" />
            <span className="font-elegant text-sm text-muted-foreground italic uppercase tracking-widest">
              Reader Stories
            </span>
            <div className="w-12 h-0.5 bg-muted-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Community</span> Says
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Join thousands of book lovers who have found their literary treasures with us.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-full bg-card rounded-xl p-6 md:p-8 border border-border shadow-page hover:shadow-book transition-all duration-300 relative overflow-hidden">
                {/* Quote decoration */}
                <div className="absolute -top-2 -right-2 text-sepia/10">
                  <Quote className="w-20 h-20" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-muted-gold text-muted-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-body text-foreground mb-6 relative z-10 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                    <span className="font-display text-primary-foreground font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="font-elegant text-sm text-muted-foreground italic">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Page curl effect on hover */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-aged-paper transform rotate-45 translate-x-16 translate-y-16 shadow-[-2px_-2px_8px_rgba(0,0,0,0.08)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
