
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-15 -z-20"></div>
        
        <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            FASHION & BEAUTY EXPERTISE
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-6 animate-fade-in">
            Elevate Your Style Journey
          </h1>
          <p className="max-w-[600px] text-muted-foreground text-lg mb-10 animate-fade-in delay-100">
            Discover curated fashion collections and beauty products that reflect your unique style. Our expert consultants are here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
            <Button size="lg" className="rounded-full px-8">
              Explore Collections
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Book Consultation
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 border border-border">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Simple content section to demonstrate the page */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
              Our Premium Services
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground">
              Personalized experiences tailored to elevate your style and beauty routine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personal Styling",
                description: "Curated fashion recommendations based on your preferences and body type."
              },
              {
                title: "Makeup Consultation",
                description: "Professional advice on products and techniques that enhance your natural beauty."
              },
              {
                title: "Skincare Analysis",
                description: "Customized skincare routines designed for your specific skin concerns."
              }
            ].map((service, index) => (
              <div key={index} className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <ChatBot initialOpen={false} />
    </div>
  );
};

export default Index;
