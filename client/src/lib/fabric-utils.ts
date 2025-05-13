// @ts-ignore
import fabric from "fabric";

// Load fonts
export function loadFonts(): Promise<void> {
  const montserrat = new FontFace(
    "Montserrat",
    "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2)"
  );
  
  const montserratBold = new FontFace(
    "Montserrat",
    "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXp-p7K4KLg.woff2)",
    { weight: "700" }
  );

  const roboto = new FontFace(
    "Roboto",
    "url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)"
  );
  
  const robotoBold = new FontFace(
    "Roboto",
    "url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2)",
    { weight: "700" }
  );
  
  return Promise.all([
    montserrat.load(),
    montserratBold.load(),
    roboto.load(),
    robotoBold.load()
  ]).then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
    return Promise.resolve();
  });
}

// Create a draggable text field
export function createDraggableText(
  canvas: fabric.Canvas,
  options: fabric.ITextboxOptions
): fabric.Textbox {
  const text = new fabric.Textbox(options.text || "", options);
  canvas.add(text);
  return text;
}

// Create a draggable image
export function createDraggableImage(
  canvas: fabric.Canvas, 
  imageUrl: string,
  options: fabric.IImageOptions
): Promise<fabric.Image> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      img.set(options);
      canvas.add(img);
      resolve(img);
    }, {
      crossOrigin: 'anonymous'
    });
  });
}

// Function to make an object selectable/editable or not
export function setObjectInteractivity(
  obj: fabric.Object,
  selectable: boolean,
  evented: boolean = selectable
): void {
  obj.set({
    selectable,
    evented,
  });
}

// Function to set up object constraints (don't allow it to move outside canvas)
export function addBoundingConstraints(canvas: fabric.Canvas): void {
  canvas.on('object:moving', (e) => {
    const obj = e.target;
    if (!obj) return;
    
    // Don't allow objects to move outside the canvas
    const objWidth = obj.width! * (obj.scaleX || 1);
    const objHeight = obj.height! * (obj.scaleY || 1);
    
    // Set boundaries based on origin points
    const top = obj.top!;
    const left = obj.left!;
    
    // Enforce boundaries
    if (top < 0) {
      obj.set('top', 0);
    } 
    if (top > canvas.height! - objHeight) {
      obj.set('top', canvas.height! - objHeight);
    }
    if (left < 0) {
      obj.set('left', 0);
    }
    if (left > canvas.width! - objWidth) {
      obj.set('left', canvas.width! - objWidth);
    }
  });
}
