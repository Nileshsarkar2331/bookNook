import { useState } from "react";
import { Upload, BookPlus, IndianRupee, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  {
    icon: BookPlus,
    title: "List Your Book",
    description: "Add your book details with photos",
  },
  {
    icon: IndianRupee,
    title: "Set Your Price",
    description: "Choose a fair price for your book",
  },
  {
    icon: Truck,
    title: "Ship & Earn",
    description: "We handle pickup, you get paid",
  },
];

const SellBooksSection = () => {
  const [selectedCondition, setSelectedCondition] = useState("");

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-muted-gold/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sepia/20 to-transparent" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-muted-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-muted-gold" />
            <span className="font-elegant text-sm text-muted-foreground italic uppercase tracking-widest">
              Give Books New Life
            </span>
            <div className="w-12 h-0.5 bg-muted-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sell Your <span className="text-primary">Books</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Turn your pre-loved books into someone else's treasure. 
            It's simple, quick, and rewarding.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border shadow-page hover:shadow-book transition-shadow">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-muted-gold text-ink-black rounded-full flex items-center justify-center font-display font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-sepia/30" />
              )}
            </div>
          ))}
        </div>

        {/* Sell form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-book overflow-hidden">
            {/* Form header with handwritten accent */}
            <div className="bg-gradient-to-r from-primary/10 to-muted-gold/10 p-6 md:p-8 border-b border-border">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Quick Listing Form
              </h3>
              <p className="font-elegant text-muted-foreground italic">
                "Every book deserves a reader who will cherish it..."
              </p>
            </div>

            <form className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-display font-medium">
                    Book Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Pride and Prejudice"
                    className="bg-background border-border focus:border-primary font-body"
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author" className="font-display font-medium">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    placeholder="e.g., Jane Austen"
                    className="bg-background border-border focus:border-primary font-body"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-display font-medium">
                    Category *
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery & Thriller</SelectItem>
                      <SelectItem value="fantasy">Fantasy & Sci-Fi</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="children">Children's Books</SelectItem>
                      <SelectItem value="self-help">Self-Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <Label htmlFor="condition" className="font-display font-medium">
                    Condition *
                  </Label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="bg-background border-border font-body">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="acceptable">Acceptable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-display font-medium">
                    Your Price (₹) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 299"
                    className="bg-background border-border focus:border-primary font-body"
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="font-display font-medium">
                    Original Price (₹)
                  </Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    placeholder="e.g., 599"
                    className="bg-background border-border focus:border-primary font-body"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-display font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell potential buyers about your book's condition, any highlights or notes, special editions..."
                  rows={4}
                  className="bg-background border-border focus:border-primary font-body resize-none"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <Label className="font-display font-medium">Book Photos</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/50">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-body text-muted-foreground">
                    <span className="text-primary font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="font-elegant text-sm text-muted-foreground mt-1 italic">
                    PNG, JPG up to 5MB (max 4 photos)
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg shadow-book hover:shadow-book-hover transition-all"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  List Your Book
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-secondary font-display"
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBooksSection;
