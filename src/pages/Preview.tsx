
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, Undo2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface EditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  foundation: number;
  blush: number;
  lipstick: number;
  hairColor: string;
}

const Preview = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  const [settings, setSettings] = useState<EditSettings | null>(null);
  
  useEffect(() => {
    // Retrieve the image, face shape, and edit settings from sessionStorage
    const storedImage = sessionStorage.getItem("analysisImage");
    const storedFaceShape = sessionStorage.getItem("faceShape");
    const storedSettings = sessionStorage.getItem("editSettings");
    
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
    setFaceShape(storedFaceShape);
    
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, [navigate]);
  
  const handleDownload = () => {
    if (!image) return;
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = image;
    a.download = "facial-analysis-result.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Image downloaded",
      description: "Your edited image has been saved to your device",
    });
  };
  
  const handleShare = async () => {
    if (!image) return;
    
    try {
      // Convert base64 to blob
      const response = await fetch(image);
      const blob = await response.blob();
      
      if (navigator.share) {
        await navigator.share({
          title: "My Facial Analysis Result",
          files: [new File([blob], "facial-analysis-result.jpg", { type: "image/jpeg" })],
        });
      } else {
        toast({
          title: "Sharing not supported",
          description: "Your browser doesn't support the Web Share API",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error sharing",
        description: "Could not share your image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/edit")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            
            <h1 className="text-2xl font-display font-medium">Preview & Download</h1>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 col-span-2">
              <div className="aspect-square rounded-lg overflow-hidden mb-6">
                {image && settings && (
                  <img 
                    src={image} 
                    alt="Final Result" 
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`,
                    }}
                  />
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                
                <Button variant="ghost" onClick={() => navigate("/")}>
                  <Undo2 className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Face Analysis Summary</h2>
                
                {faceShape ? (
                  <div className="space-y-2">
                    <p>
                      <span className="text-muted-foreground">Face Shape:</span>{" "}
                      <span className="font-medium">{faceShape}</span>
                    </p>
                    
                    <p className="text-sm text-muted-foreground">
                      {faceShape === "Oval" && "This versatile face shape works well with most styles."}
                      {faceShape === "Round" && "Elongating styles help complement your rounded features."}
                      {faceShape === "Square" && "Softer styles help balance your strong jawline."}
                      {faceShape === "Heart" && "Styles that add width to the chin area balance your features."}
                      {faceShape === "Diamond" && "Styles that add width at the forehead and jawline work well."}
                      {faceShape === "Rectangle" && "Styles that add width to the sides create balance."}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No face shape detected.</p>
                )}
              </Card>
              
              {settings && (
                <Card className="p-6">
                  <h2 className="text-lg font-medium mb-4">Applied Enhancements</h2>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Brightness:</span>
                      <span>{settings.brightness}%</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Contrast:</span>
                      <span>{settings.contrast}%</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Saturation:</span>
                      <span>{settings.saturation}%</span>
                    </p>
                    
                    {settings.foundation > 0 && (
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Foundation:</span>
                        <span>{settings.foundation}%</span>
                      </p>
                    )}
                    
                    {settings.blush > 0 && (
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Blush:</span>
                        <span>{settings.blush}%</span>
                      </p>
                    )}
                    
                    {settings.lipstick > 0 && (
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Lipstick:</span>
                        <span>{settings.lipstick}%</span>
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Hair Color:</span>
                      <div 
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: settings.hairColor }}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
