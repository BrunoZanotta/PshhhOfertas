import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  presetColors?: string[];
}

export default function ColorPicker({
  value,
  onChange,
  label,
  className,
  presetColors = [
    '#FF4B91', // Primary pink
    '#4CBB17', // Accent green
    '#FFB6C1', // Light pink
    '#343A40', // Dark gray
    '#232F3E', // Amazon blue
    '#FFE600', // Mercado Livre yellow
    '#EE4D2D', // Shopee orange
    '#FFFFFF', // White
  ],
}: ColorPickerProps) {
  // Check if a color is dark to determine text color
  const isDarkColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate perceived brightness using standard formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness < 128;
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between border-2",
              isDarkColor(value) ? "text-white" : "text-black"
            )}
            style={{ backgroundColor: value, borderColor: isDarkColor(value) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: value }}
              />
              <span>{value.toUpperCase()}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Custom Color</Label>
              <div className="flex mt-1">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-xs">Preset Colors</Label>
              <div className="grid grid-cols-4 gap-1">
                {presetColors.map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className={cn(
                      "h-8 w-full p-0 border-2", 
                      value === color && "border-primary",
                      isDarkColor(color) ? "text-white" : "text-black"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(color)}
                  >
                    {value === color && <Check className="h-3 w-3" />}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
