
import { Button } from "@/components/ui/button";

interface SampleImagesProps {
  onSelectSample: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSelectSample }) => {
  const samples = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      alt: "Sample face 1",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop",
      alt: "Sample face 2",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
      alt: "Sample face 3",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {samples.map((sample) => (
        <div key={sample.id} className="flex flex-col items-center">
          <div 
            className="w-full aspect-square mb-3 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onSelectSample(sample.url)}
          >
            <img 
              src={sample.url} 
              alt={sample.alt} 
              className="w-full h-full object-cover"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSelectSample(sample.url)}
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SampleImages;
