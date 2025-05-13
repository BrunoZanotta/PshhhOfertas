import { useEffect, useState } from "react";
import TemplateEditor from "@/components/TemplateEditor";
import TemplateControls from "@/components/TemplateControls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, ChevronLeft, Save } from "lucide-react";
import { Link } from "wouter";
import { exportTemplate } from "@/lib/export-utils";

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

export default function Editor() {
  const { toast } = useToast();
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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

  const handleFormChange = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTemplate = async () => {
    if (!fabricCanvas) return;
    
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
    if (!fabricCanvas) return;
    
    setIsExporting(true);
    try {
      await exportTemplate(fabricCanvas);
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
            <TemplateEditor 
              formData={formData} 
              setFabricCanvas={setFabricCanvas}
            />
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
