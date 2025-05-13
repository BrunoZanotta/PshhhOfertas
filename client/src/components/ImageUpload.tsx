import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Image, X } from "lucide-react";

interface ImageUploadProps {
  currentImage: File | null;
  onImageSelect: (file: File | null) => void;
}

export default function ImageUpload({ currentImage, onImageSelect }: ImageUploadProps) {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageSelect(file);
  };
  
  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageSelect(null);
  };
  
  return (
    <div className="space-y-2">
      {previewUrl ? (
        <Card className="relative overflow-hidden">
          <CardContent className="p-2">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-contain rounded-md"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <label htmlFor="imageUpload">
          <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <ImagePlus className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Clique para carregar uma imagem do produto
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG ou WEBP (máx. 5MB)
              </p>
            </CardContent>
          </Card>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
