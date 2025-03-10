
import { useCallback, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Camera, X } from 'lucide-react';

interface WebcamCaptureProps {
  onCapture: (imageUrl: string) => void;
  onCancel: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user" 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      toast({
        title: "Webcam Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
      onCancel();
    }
  }, [onCancel]);
  
  const stopWebcam = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);
  
  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const imageUrl = canvas.toDataURL('image/png');
        onCapture(imageUrl);
        
        // Stop the webcam
        stopWebcam();
      }
    }
  }, [onCapture, stopWebcam]);
  
  // Start webcam when component mounts
  useState(() => {
    startWebcam();
    
    // Cleanup when component unmounts
    return () => {
      stopWebcam();
    };
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg mb-4">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto"
          onCanPlay={() => setIsStreaming(true)}
        />
        
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 bg-background/30 backdrop-blur-sm"
          onClick={() => {
            stopWebcam();
            onCancel();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={takePhoto}
          disabled={!isStreaming}
          className="px-6"
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            stopWebcam();
            onCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
