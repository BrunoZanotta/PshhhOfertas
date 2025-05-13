import { useEffect, useState, useRef } from "react";
import TemplateControls from "@/components/TemplateControls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, ChevronLeft, Save } from "lucide-react";
import { Link } from "wouter";

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

// Calculate discount percentage
function calculateDiscountPercentage(originalPrice: string, currentPrice: string): string {
  // Extract numeric values (assuming format like "R$ 1.899,90")
  const original = parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  const current = parseFloat(currentPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  
  if (isNaN(original) || isNaN(current) || original <= current) {
    return "0%";
  }
  
  const discount = Math.round(((original - current) / original) * 100);
  return `${discount}%`;
}

export default function Editor() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    productName: "Smartphone Ultra Premium XZ200 128GB",
    productPrice: "R$ 1.299,90",
    originalPrice: "R$ 1.899,90",
    productLink: "bit.ly/oferta-xz200",
    productImage: null,
    backgroundColor: "#FFFFFF",
    primaryColor: "#FF4B91",
    accentColor: "#4CBB17",
  });

  // Update image preview when product image changes
  useEffect(() => {
    if (formData.productImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviewUrl(e.target.result.toString());
        }
      };
      reader.readAsDataURL(formData.productImage);
    }
  }, [formData.productImage]);

  const handleFormChange = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTemplate = async () => {
    setIsSaving(true);
    try {
      // In a production app, we would save to the server here
      toast({
        title: "Template salvo!",
        description: "Seu template foi salvo com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o template.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportTemplate = async () => {
    if (!canvasRef.current) return;
    
    setIsExporting(true);
    try {
      // Create a capture of the template div using html-to-image or similar library
      // For now, we'll just show a success message
      toast({
        title: "Template exportado!",
        description: "Seu template foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar o template.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate discount
  const discountPercentage = calculateDiscountPercentage(formData.originalPrice, formData.productPrice);

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b">
        <div className="container mx-auto py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
            </Link>
            <h1 className="text-xl font-bold">
              <span className="text-[#FF4B91]">Pshhh</span>
              <span className="text-gray-800">OFERTAS</span> - Editor de Template
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveTemplate}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-1" /> 
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleExportTemplate}
              disabled={isExporting}
              className="bg-[#FF4B91] hover:bg-[#ff2a7f]"
            >
              <Download className="h-4 w-4 mr-1" /> 
              {isExporting ? "Exportando..." : "Exportar"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 p-4 flex items-center justify-center overflow-auto">
            {/* Template Preview */}
            <div 
              ref={canvasRef}
              className="relative w-[540px] h-[540px] border rounded-lg shadow-lg"
              style={{ backgroundColor: formData.backgroundColor }}
            >
              {/* Template Header */}
              <div className="absolute top-0 left-0 w-full h-[90px] bg-white bg-opacity-50">
                <div className="flex justify-center items-center h-full">
                  <h1 className="text-3xl font-bold text-center mt-2">
                    <span style={{ color: formData.primaryColor }}>Pshhh</span>
                    <span className="text-gray-800">OFERTAS</span>
                  </h1>
                </div>
                <div className="text-center text-sm text-gray-600 mt-[-10px]">
                  Os melhores achados e promoções para você!
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full opacity-80"
                style={{ backgroundColor: formData.primaryColor }}></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-80"
                style={{ backgroundColor: formData.primaryColor }}></div>
              
              {/* Discount Tag */}
              <div className="absolute top-[75px] right-[45px] w-[110px] h-[110px] rounded-full flex items-center justify-center opacity-90"
                style={{ backgroundColor: formData.accentColor, transform: 'rotate(15deg)' }}>
                <div className="text-white font-bold text-xl">OFERTA</div>
              </div>
              
              {/* Product Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-30px]">
                <div className="w-[300px] h-[190px] border-4 rounded-lg flex items-center justify-center" 
                  style={{ borderColor: formData.primaryColor, borderStyle: 'dashed' }}>
                  {imagePreviewUrl ? (
                    <img 
                      src={imagePreviewUrl} 
                      alt="Produto" 
                      className="max-w-full max-h-full object-contain" 
                    />
                  ) : (
                    <div className="text-center" style={{ color: formData.primaryColor }}>
                      <p className="font-bold text-xl">Imagem do Produto</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Name */}
              <div className="absolute w-full top-[320px] px-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{formData.productName}</h2>
              </div>
              
              {/* Price Box */}
              <div className="absolute bottom-[100px] w-full px-8">
                <div className="flex justify-center">
                  {/* Price Section */}
                  <div className="w-[200px] h-[80px] mr-4 rounded-lg flex flex-col items-center justify-center"
                    style={{ backgroundColor: `${formData.accentColor}10` }}>
                    <div className="w-[120px] h-[40px] rounded-md flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: formData.accentColor }}>
                      {formData.productPrice}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="line-through text-gray-600 text-sm">{formData.originalPrice}</span>
                      <span className="font-bold text-sm ml-2" style={{ color: formData.accentColor }}>
                        {discountPercentage} OFF
                      </span>
                    </div>
                  </div>
                  
                  {/* Link Section */}
                  <div className="w-[200px] h-[80px] rounded-lg flex flex-col items-center justify-center"
                    style={{ backgroundColor: `${formData.primaryColor}10` }}>
                    <div className="text-sm font-bold mb-1" style={{ color: formData.primaryColor }}>
                      LINK AFILIADO
                    </div>
                    <div className="w-[180px] h-[36px] rounded-md flex items-center justify-center font-bold text-white text-sm"
                      style={{ backgroundColor: formData.primaryColor }}>
                      {formData.productLink}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Marketplaces */}
              <div className="absolute bottom-0 left-0 w-full h-[60px] flex justify-center items-center bg-white bg-opacity-80">
                <div className="flex space-x-4">
                  <div className="w-[90px] h-[30px] rounded-md flex items-center justify-center text-white text-xs font-bold" 
                    style={{ backgroundColor: '#232F3E' }}>Amazon</div>
                  <div className="w-[120px] h-[30px] rounded-md flex items-center justify-center text-[#2D3277] text-xs font-bold" 
                    style={{ backgroundColor: '#FFE600' }}>Mercado Livre</div>
                  <div className="w-[90px] h-[30px] rounded-md flex items-center justify-center text-white text-xs font-bold" 
                    style={{ backgroundColor: '#EE4D2D' }}>Shopee</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/4 border-l overflow-y-auto">
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">Estilo</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="p-4 space-y-6">
                <TemplateControls 
                  formData={formData} 
                  onChange={handleFormChange}
                />
              </TabsContent>
              <TabsContent value="style" className="p-4 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Cores do Template</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500">Cor Primária</label>
                        <input 
                          type="color" 
                          value={formData.primaryColor} 
                          onChange={(e) => handleFormChange('primaryColor', e.target.value)}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500">Cor Destaque</label>
                        <input 
                          type="color" 
                          value={formData.accentColor} 
                          onChange={(e) => handleFormChange('accentColor', e.target.value)}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Fundo do Template</h3>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Cor de Fundo</label>
                      <input 
                        type="color" 
                        value={formData.backgroundColor} 
                        onChange={(e) => handleFormChange('backgroundColor', e.target.value)}
                        className="w-full h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
