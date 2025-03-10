
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

const FacialAnalysis = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    // Retrieve the image from sessionStorage
    const storedImage = sessionStorage.getItem("analysisImage");
    
    if (!storedImage) {
      toast({
        title: "No image found",
        description: "Please upload an image first",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setImage(storedImage);
    
    // Simulate face shape analysis
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const shapes = ["Oval", "Round", "Square", "Heart", "Diamond", "Rectangle"];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      setFaceShape(randomShape);
      setIsAnalyzing(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleContinue = () => {
    if (faceShape) {
      // Store face shape in sessionStorage
      sessionStorage.setItem("faceShape", faceShape);
      navigate("/edit");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-2xl font-display font-medium">Face Analysis</h1>
            
            <Button 
              onClick={handleContinue}
              disabled={isAnalyzing || !faceShape}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {image && (
              <Card className="p-6 overflow-hidden">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <img 
                    src={image} 
                    alt="Face Analysis" 
                    className="w-full h-full object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </Card>
            )}
            
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-medium mb-4">Face Shape Analysis</h2>
                
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LoadingSpinner size="sm" />
                    <span>Analyzing face shape...</span>
                  </div>
                ) : faceShape ? (
                  <div className="space-y-4">
                    <p className="text-lg">
                      Your face shape: <span className="font-semibold">{faceShape}</span>
                    </p>
                    <FaceShapeDescription shape={faceShape} />
                  </div>
                ) : (
                  <p className="text-muted-foreground">Unable to detect face shape. Please try another image.</p>
                )}
              </Card>
              
              {faceShape && (
                <Card className="p-6">
                  <h2 className="text-xl font-medium mb-4">Recommended Styles</h2>
                  <RecommendationsForFaceShape shape={faceShape} />
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface FaceShapeDescriptionProps {
  shape: string;
}

const FaceShapeDescription: React.FC<FaceShapeDescriptionProps> = ({ shape }) => {
  const descriptions: Record<string, string> = {
    Oval: "Oval faces are slightly longer than they are wide with a rounded jawline. This is considered the most versatile face shape.",
    Round: "Round faces have soft curves with the width and length of the face having similar measurements.",
    Square: "Square faces have a strong, angular jawline with a similarly wide forehead.",
    Heart: "Heart-shaped faces have a wider forehead and cheekbones with a narrow chin.",
    Diamond: "Diamond faces have narrow foreheads and jawlines with the cheekbones as the widest part of the face.",
    Rectangle: "Rectangle faces are longer than they are wide with a long straight cheek line.",
  };
  
  return <p className="text-muted-foreground">{descriptions[shape] || "No description available."}</p>;
};

interface RecommendationsForFaceShapeProps {
  shape: string;
}

const RecommendationsForFaceShape: React.FC<RecommendationsForFaceShapeProps> = ({ shape }) => {
  const recommendations: Record<string, { hairstyle: string, makeup: string }> = {
    Oval: {
      hairstyle: "Most hairstyles suit this face shape. Try layered cuts, waves, or straight styles.",
      makeup: "Subtle contouring on the cheekbones and a balanced approach to makeup work well.",
    },
    Round: {
      hairstyle: "Longer cuts with layers that fall below the chin. Side-swept bangs and volume at the crown.",
      makeup: "Contour the sides of the face and highlight the center to create the illusion of length.",
    },
    Square: {
      hairstyle: "Soft layers, side-swept styles, and wispy ends to soften angular features.",
      makeup: "Soften the jawline with contour and highlight the center of the forehead and chin.",
    },
    Heart: {
      hairstyle: "Medium to long styles with volume at the jawline. Side-parts work well.",
      makeup: "Highlight the jawline and chin. Contour the forehead slightly to balance proportions.",
    },
    Diamond: {
      hairstyle: "Hairstyles that add width at the jawline. Chin-length bobs or styles with volume around the jaw.",
      makeup: "Highlight the forehead and jawline to add width. Light contouring on cheekbones.",
    },
    Rectangle: {
      hairstyle: "Styles with volume and fullness around the sides of the face. Avoid excessive height on top.",
      makeup: "Contour the top of the forehead and bottom of the chin to shorten the face. Highlight the cheeks.",
    },
  };
  
  const { hairstyle, makeup } = recommendations[shape] || { hairstyle: "", makeup: "" };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-1">Recommended Hairstyles:</h3>
        <p className="text-muted-foreground">{hairstyle || "No recommendations available."}</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Makeup Tips:</h3>
        <p className="text-muted-foreground">{makeup || "No recommendations available."}</p>
      </div>
    </div>
  );
};

export default FacialAnalysis;
