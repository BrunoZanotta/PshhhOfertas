import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { initializeTemplate } from "@/lib/template-utils";

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

interface TemplateEditorProps {
  formData: FormData;
  setFabricCanvas: (canvas: fabric.Canvas) => void;
}

export default function TemplateEditor({ formData, setFabricCanvas }: TemplateEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize canvas only once
    if (!fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 1080,
        height: 1080,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true,
      });

      fabricCanvasRef.current = canvas;
      setFabricCanvas(canvas);
      
      // Initialize template
      initializeTemplate(canvas);

      // Set up resize listener
      const handleResize = () => {
        if (!canvasContainerRef.current || !canvas) return;
        
        const container = canvasContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        const scale = Math.min(
          containerWidth / 1080,
          containerHeight / 1080
        );
        
        const zoom = Math.min(scale, 1); // Limit maximum zoom to 1
        canvas.setZoom(zoom);
        canvas.setWidth(1080 * zoom);
        canvas.setHeight(1080 * zoom);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [setFabricCanvas]);

  // Update template when formData changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Update product name
    const productNameObj = canvas.getObjects().find(obj => obj.data?.id === 'productName');
    if (productNameObj && productNameObj instanceof fabric.Textbox) {
      productNameObj.set('text', formData.productName);
    }

    // Update product price
    const productPriceObj = canvas.getObjects().find(obj => obj.data?.id === 'productPrice');
    if (productPriceObj && productPriceObj instanceof fabric.Textbox) {
      productPriceObj.set('text', formData.productPrice);
    }

    // Update original price
    const originalPriceObj = canvas.getObjects().find(obj => obj.data?.id === 'originalPrice');
    if (originalPriceObj && originalPriceObj instanceof fabric.Textbox) {
      originalPriceObj.set('text', formData.originalPrice);
    }

    // Update affiliate link
    const affiliateLinkObj = canvas.getObjects().find(obj => obj.data?.id === 'affiliateLink');
    if (affiliateLinkObj && affiliateLinkObj instanceof fabric.Textbox) {
      affiliateLinkObj.set('text', formData.productLink);
    }

    // Update product image if available
    if (formData.productImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        
        fabric.Image.fromURL(e.target.result.toString(), (img) => {
          // Find product image placeholder
          const imgPlaceholder = canvas.getObjects().find(obj => obj.data?.id === 'productImage');
          if (imgPlaceholder) {
            // Get placeholder dimensions and position
            const { left, top, width, height } = imgPlaceholder;
            
            // Calculate scale to fit image in placeholder
            const scaleX = width ? width / img.width! : 1;
            const scaleY = height ? height / img.height! : 1;
            const scale = Math.min(scaleX, scaleY);
            
            // Set image attributes
            img.set({
              left,
              top,
              scaleX: scale,
              scaleY: scale,
              data: { id: 'productImage' },
            });
            
            // Replace placeholder with image
            canvas.remove(imgPlaceholder);
            canvas.add(img);
            canvas.renderAll();
          }
        });
      };
      reader.readAsDataURL(formData.productImage);
    }

    // Update colors
    canvas.getObjects().forEach(obj => {
      if (obj.data?.colorType === 'primary') {
        obj.set('fill', formData.primaryColor);
      } else if (obj.data?.colorType === 'accent') {
        obj.set('fill', formData.accentColor);
      }
    });

    // Update background color
    canvas.setBackgroundColor(formData.backgroundColor, () => {});

    canvas.renderAll();
  }, [formData]);

  return (
    <div ref={canvasContainerRef} className="w-full h-full flex items-center justify-center border rounded-lg bg-gray-50 p-4 shadow-inner">
      <canvas ref={canvasRef} />
    </div>
  );
}
