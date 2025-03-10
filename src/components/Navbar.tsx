
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-medium tracking-tight">
            FacialAI
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" className="hidden sm:flex">
            <Link to="/analysis">Analysis</Link>
          </Button>
          <Button variant="ghost" className="hidden md:flex">
            <Link to="/edit">Editor</Link>
          </Button>
          <Button className="bg-primary text-primary-foreground">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
