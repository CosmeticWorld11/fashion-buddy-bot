
import { Button } from "@/components/ui/button";

interface SampleImagesProps {
  onSelectSample: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSelectSample }) => {
  const samples = [
    {
      id: 1,
      url: "/lovable-uploads/8b55faa7-69cb-413b-bbe9-003441301c7a.png",
      alt: "Sample face 1",
    },
    {
      id: 2,
      url: "/lovable-uploads/cf828c8e-c9cd-473c-9672-b80b2b54a352.png",
      alt: "Sample face 2",
    },
    {
      id: 3,
      url: "/lovable-uploads/47af077d-80aa-4d52-81ad-2d6da5caffb1.png",
      alt: "Sample face 3",
    },
    {
      id: 4,
      url: "/lovable-uploads/491b4b2f-6fe1-47ba-bfcf-faf1f3b0ce20.png",
      alt: "Sample face 4",
    },
    {
      id: 5,
      url: "/lovable-uploads/64f883e3-ece7-4273-ab8d-345c3a9a8d4e.png",
      alt: "Sample face 5",
    },
    {
      id: 6,
      url: "/lovable-uploads/3699828c-be48-4fdc-9a02-9d99e54da30d.png",
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
