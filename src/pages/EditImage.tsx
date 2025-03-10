
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Palette, Sparkles, Brush } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const EditImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  
  // Color correction states
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  // Makeup states
  const [foundation, setFoundation] = useState(0);
  const [blush, setBlush] = useState(0);
  const [lipstick, setLipstick] = useState(0);
  
  // Hair color state
  const [hairColor, setHairColor] = useState("#000000");
  
  useEffect(() => {
    // Retrieve the image and face shape from sessionStorage
    const storedImage = sessionStorage.getItem("analysisImage");
    const storedFaceShape = sessionStorage.getItem("faceShape");
    
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
  }, [navigate]);
  
  const handleContinue = () => {
    // Store editing settings in sessionStorage for the preview page
    sessionStorage.setItem("editSettings", JSON.stringify({
      brightness,
      contrast,
      saturation,
      foundation,
      blush,
      lipstick,
      hairColor,
    }));
    
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/analysis")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-2xl font-display font-medium">Image Editor</h1>
            
            <Button onClick={handleContinue}>
              Preview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image preview */}
            <Card className="p-6 overflow-hidden">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                {image && (
                  <img 
                    src={image} 
                    alt="Editor Preview" 
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                    }}
                  />
                )}
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  {faceShape ? `Face Shape: ${faceShape}` : "Face shape not detected"}
                </p>
                
                <Button variant="outline" size="sm">
                  <Sparkles className="mr-2 h-3 w-3" />
                  Auto Enhance
                </Button>
              </div>
            </Card>
            
            {/* Editor controls */}
            <Card className="p-6">
              <Tabs defaultValue="color">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="color">
                    <Palette className="mr-2 h-4 w-4" />
                    Color
                  </TabsTrigger>
                  <TabsTrigger value="makeup">
                    <Brush className="mr-2 h-4 w-4" />
                    Makeup
                  </TabsTrigger>
                  <TabsTrigger value="hair">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a6 6 0 0 0-6-6h-6a6 6 0 0 0-6 6v1Z"/>
                      <path d="M6 15v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4"/>
                    </svg>
                    Hair
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="color" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Brightness</label>
                      <span className="text-sm text-muted-foreground">{brightness}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      value={[brightness]}
                      onValueChange={(vals) => setBrightness(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Contrast</label>
                      <span className="text-sm text-muted-foreground">{contrast}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      value={[contrast]}
                      onValueChange={(vals) => setContrast(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Saturation</label>
                      <span className="text-sm text-muted-foreground">{saturation}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      value={[saturation]}
                      onValueChange={(vals) => setSaturation(vals[0])}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="makeup" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Foundation</label>
                      <span className="text-sm text-muted-foreground">{foundation}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[foundation]}
                      onValueChange={(vals) => setFoundation(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Blush</label>
                      <span className="text-sm text-muted-foreground">{blush}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[blush]}
                      onValueChange={(vals) => setBlush(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Lipstick</label>
                      <span className="text-sm text-muted-foreground">{lipstick}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[lipstick]}
                      onValueChange={(vals) => setLipstick(vals[0])}
                    />
                    
                    <div className="flex gap-2 mt-2">
                      {["#FF6B6B", "#FF85A1", "#D63964", "#9C0F48", "#541690"].map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full cursor-pointer border border-border"
                          style={{ backgroundColor: color }}
                          onClick={() => setLipstick(Math.max(20, lipstick))}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="hair" className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Hair Color</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["#000000", "#5E3719", "#A84D31", "#D4B37F", "#AAAAAA"].map((color) => (
                        <div
                          key={color}
                          className={`w-full aspect-square rounded-md cursor-pointer border-2 ${hairColor === color ? 'border-primary' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setHairColor(color)}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <label className="text-sm font-medium">Custom:</label>
                      <input
                        type="color"
                        value={hairColor}
                        onChange={(e) => setHairColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditImage;
