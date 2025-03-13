
import { Button } from "@/components/ui/button";

interface SampleImagesProps {
  onSelectSample: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSelectSample }) => {
  const samples = [
    {
      id: 1,
      url: "/lovable-uploads/e73d3c23-c84c-4ac5-b21a-479591596b9e.png",
      alt: "Sample face 1",
    },
    {
      id: 2,
      url: "/lovable-uploads/cc2db866-001e-48e7-aab1-d371f1498bfe.png",
      alt: "Sample face 2",
    },
    {
      id: 3,
      url: "/lovable-uploads/b5cbf11b-0493-48e9-8a32-0bca69ea1b39.png",
      alt: "Sample face 3",
    },
    {
      id: 4,
      url: "/lovable-uploads/c4e8d067-4753-42f9-b4cf-7a760ca80572.png",
      alt: "Sample face 4",
    },
    {
      id: 5,
      url: "/lovable-uploads/d71d3170-318b-408b-8815-852eec52cd2b.png",
      alt: "Sample face 5",
    },
    {
      id: 6,
      url: "/lovable-uploads/92918e30-b37a-4585-b79b-8b9e09fca9c7.png",
      alt: "Sample face 6",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {samples.map((sample) => (
        <div key={sample.id} className="flex flex-col items-center">
          <div 
            className="w-full aspect-square mb-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-border"
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
            className="w-full"
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
