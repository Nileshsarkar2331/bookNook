import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            About BookNook
          </h1>
          <p className="font-body text-muted-foreground">
            A cozy marketplace for books with stories to tell.
          </p>
        </div>

        <div className="bg-cream border border-sepia/20 rounded-lg p-6 md:p-8 shadow-page space-y-4">
          <p className="text-sm text-muted-foreground">
            We connect book lovers with pre-loved titles and keep stories in circulation.
          </p>
          <Button className="bg-primary hover:bg-primary/90">Contact Us</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
