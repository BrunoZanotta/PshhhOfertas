import { useRef, useEffect } from "react";

interface TemplatePreviewProps {
  canvas: fabric.Canvas | null;
}

export default function TemplatePreview({ canvas }: TemplatePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvas || !previewRef.current) return;

    const updatePreview = () => {
      if (!previewRef.current) return;
      
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
        multiplier: 0.25, // 1/4 size for preview
      });
      
      previewRef.current.style.backgroundImage = `url(${dataUrl})`;
    };

    // Update preview after each object modification
    canvas.on('object:modified', updatePreview);
    canvas.on('after:render', updatePreview);
    
    // Initial update
    updatePreview();

    return () => {
      canvas.off('object:modified', updatePreview);
      canvas.off('after:render', updatePreview);
    };
  }, [canvas]);

  return (
    <div 
      ref={previewRef} 
      className="w-32 h-32 border rounded-md bg-center bg-no-repeat bg-contain"
      aria-label="Preview da imagem"
    />
  );
}
