
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ImageUploader from "@/components/ImageUploader";
import WebcamCapture from "@/components/WebcamCapture";
import SampleImages from "@/components/SampleImages";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  
  const handleImageSelected = useCallback((imageUrl: string) => {
    setImage(imageUrl);
    toast({
      title: "Image selected",
      description: "Your image is ready for analysis",
    });
  }, []);
  
  const handleWebcamCapture = useCallback((capturedImage: string) => {
    setImage(capturedImage);
    setShowWebcam(false);
    toast({
      title: "Image captured",
      description: "Your photo is ready for analysis",
    });
  }, []);
  
  const handleContinue = useCallback(() => {
    if (image) {
      // Store image in sessionStorage to pass between routes
      sessionStorage.setItem("analysisImage", image);
      navigate("/analysis");
    } else {
      toast({
        title: "No image selected",
        description: "Please upload an image or take a photo first",
        variant: "destructive",
      });
    }
  }, [image, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-display font-medium tracking-tight mb-6">
            Facial Analysis & Virtual Makeover
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Analyze your face shape, try on virtual makeup, and experiment with hair colors
            using our AI-powered platform.
          </p>
          
          <div className="grid gap-8">
            {!showWebcam && !image && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => setShowWebcam(false)}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Image
                  </Button>
                  <ImageUploader onImageSelected={handleImageSelected} />
                </Card>
                
                <Card className="p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => setShowWebcam(true)}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Take Photo
                  </Button>
                </Card>
              </div>
            )}
            
            {showWebcam && !image && (
              <Card className="p-6">
                <WebcamCapture onCapture={handleWebcamCapture} onCancel={() => setShowWebcam(false)} />
              </Card>
            )}
            
            {image && (
              <div className="flex flex-col items-center">
                <div className="max-w-md mb-6">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-auto rounded-lg shadow-md" 
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => {
                    setImage(null);
                    setShowWebcam(false);
                  }}>
                    Choose Another
                  </Button>
                  
                  <Button onClick={handleContinue}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {!image && (
              <div className="mt-10">
                <h2 className="text-xl font-medium mb-6">Or try with a sample image</h2>
                <SampleImages onSelectSample={handleImageSelected} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
