// @ts-ignore
import fabric from "fabric";
import { useToast } from "@/hooks/use-toast";

// Function to export the template as an image
export async function exportTemplate(canvas: fabric.Canvas): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Temporarily disable selection on all objects to prevent selection borders
      const objects = canvas.getObjects();
      const selectionState = objects.map(obj => ({
        object: obj,
        selectable: obj.selectable,
        borderColor: obj.borderColor,
        cornerColor: obj.cornerColor,
      }));
      
      // Hide selection borders and disable selection
      objects.forEach(obj => {
        obj.set({
          selectable: false,
          borderColor: 'transparent',
          cornerColor: 'transparent',
        });
      });
      
      // Force re-render
      canvas.renderAll();
      
      // Create a data URL with maximum quality
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = `pshhhofertas-template-${Date.now()}.png`;
      link.href = dataUrl;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restore selection state
      selectionState.forEach(state => {
        state.object.set({
          selectable: state.selectable,
          borderColor: state.borderColor,
          cornerColor: state.cornerColor,
        });
      });
      
      // Re-render with selection restored
      canvas.renderAll();
      
      resolve();
    } catch (error) {
      console.error('Error exporting template:', error);
      reject(error);
    }
  });
}

// Function to create a shareable version of the template
export async function createShareableVersion(canvas: fabric.Canvas): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Similar to exportTemplate, but just returns the dataUrl
      const objects = canvas.getObjects();
      const selectionState = objects.map(obj => ({
        object: obj,
        selectable: obj.selectable,
        borderColor: obj.borderColor,
        cornerColor: obj.cornerColor,
      }));
      
      objects.forEach(obj => {
        obj.set({
          selectable: false,
          borderColor: 'transparent',
          cornerColor: 'transparent',
        });
      });
      
      canvas.renderAll();
      
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 0.5, // Half size for sharing
      });
      
      selectionState.forEach(state => {
        state.object.set({
          selectable: state.selectable,
          borderColor: state.borderColor,
          cornerColor: state.cornerColor,
        });
      });
      
      canvas.renderAll();
      
      resolve(dataUrl);
    } catch (error) {
      console.error('Error creating shareable version:', error);
      reject(error);
    }
  });
}
