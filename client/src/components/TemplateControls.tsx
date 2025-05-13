import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";

type FormData = {
  productName: string;
  productPrice: string;
  originalPrice: string;
  productLink: string;
  productImage: File | null;
  backgroundColor: string;
  primaryColor: string;
  accentColor: string;
};

interface TemplateControlsProps {
  formData: FormData;
  onChange: (name: keyof FormData, value: any) => void;
}

export default function TemplateControls({ formData, onChange }: TemplateControlsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Imagem do Produto</h3>
        <ImageUpload 
          currentImage={formData.productImage}
          onImageSelect={(file) => onChange('productImage', file)}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Informações do Produto</h3>
        <div className="space-y-2">
          <Label htmlFor="productName">Nome do Produto</Label>
          <Textarea
            id="productName"
            value={formData.productName}
            onChange={(e) => onChange('productName', e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="productPrice">Preço Atual</Label>
            <Input
              id="productPrice"
              value={formData.productPrice}
              onChange={(e) => onChange('productPrice', e.target.value)}
              placeholder="Ex: R$ 99,90"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Preço Original</Label>
            <Input
              id="originalPrice"
              value={formData.originalPrice}
              onChange={(e) => onChange('originalPrice', e.target.value)}
              placeholder="Ex: R$ 149,90"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="productLink">Link Afiliado</Label>
          <Input
            id="productLink"
            value={formData.productLink}
            onChange={(e) => onChange('productLink', e.target.value)}
            placeholder="Ex: bit.ly/produto"
          />
        </div>
      </div>
    </div>
  );
}
