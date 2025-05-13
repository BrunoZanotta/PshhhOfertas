// @ts-ignore
import fabric from "fabric";

interface TemplateElement {
  type: string;
  options: any; // Using any for fabric options due to type issues
}

export function initializeTemplate(canvas: fabric.Canvas) {
  // Clear canvas
  canvas.clear();

  // Set background color and pattern
  canvas.setBackgroundColor("#FFFFFF", () => {});

  // Add gradient background
  const bgRect = new fabric.Rect({
    width: 1080,
    height: 1080,
    left: 0,
    top: 0,
    fill: new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: 0,
        y1: 0,
        x2: 1080,
        y2: 1080,
      },
      colorStops: [
        { offset: 0, color: '#FFB6C1' + '33' }, // Light pink with transparency
        { offset: 1, color: '#FFFFFF' },
      ],
    }),
    selectable: false,
    evented: false,
  });
  canvas.add(bgRect);

  // Add corner decorations
  // Top-left corner
  const topLeftCorner = new fabric.Circle({
    radius: 160,
    left: -160,
    top: -160,
    fill: '#FF4B91',
    opacity: 0.8,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(topLeftCorner);

  // Bottom-right corner
  const bottomRightCorner = new fabric.Circle({
    radius: 160,
    left: 1080 + 160,
    top: 1080 + 160,
    fill: '#FF4B91',
    opacity: 0.8,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(bottomRightCorner);

  // Add discount tag
  const discountTag = new fabric.Circle({
    radius: 110,
    left: 920,
    top: 150,
    fill: '#4CBB17',
    opacity: 0.9,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'accent' },
  });
  canvas.add(discountTag);

  // Add "OFERTA" text to discount tag
  const ofertaText = new fabric.Text('OFERTA', {
    left: 920,
    top: 150,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 32,
    fill: 'white',
    originX: 'center',
    originY: 'center',
    angle: 15,
    selectable: false,
    evented: false,
  });
  canvas.add(ofertaText);

  // Add header
  const headerBg = new fabric.Rect({
    width: 1080,
    height: 180,
    left: 0,
    top: 0,
    fill: 'rgba(255, 255, 255, 0.5)',
    selectable: false,
    evented: false,
  });
  canvas.add(headerBg);

  // Add brand name
  const brandNameGroup = new fabric.Group([], {
    left: 540,
    top: 80,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });

  const pshhh = new fabric.Text('Pshhh', {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 60,
    fill: '#FF4B91',
    originX: 'left',
    originY: 'center',
    data: { colorType: 'primary' },
  });

  const ofertas = new fabric.Text('OFERTAS', {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 60,
    fill: '#343A40',
    left: pshhh.width!,
    originX: 'left',
    originY: 'center',
  });

  brandNameGroup.addWithUpdate(pshhh);
  brandNameGroup.addWithUpdate(ofertas);
  canvas.add(brandNameGroup);

  // Add tagline
  const tagline = new fabric.Text('Os melhores achados e promoções para você!', {
    left: 540,
    top: 135,
    fontFamily: 'Roboto',
    fontSize: 24,
    fill: 'rgba(52, 58, 64, 0.7)',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(tagline);

  // Add product image placeholder
  const productImage = new fabric.Rect({
    width: 600,
    height: 380,
    left: 540,
    top: 350,
    fill: '#f1f1f1',
    rx: 20,
    ry: 20,
    stroke: '#FF4B91',
    strokeWidth: 4,
    strokeDashArray: [10, 5],
    originX: 'center',
    originY: 'center',
    selectable: true,
    data: { id: 'productImage' },
  });
  canvas.add(productImage);

  // Add placeholder text
  const imagePlaceholderText = new fabric.Text('Imagem do Produto', {
    left: 540,
    top: 350,
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: 'bold',
    fill: '#FF4B91',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(imagePlaceholderText);

  // Add product details box
  const detailsBox = new fabric.Rect({
    width: 900,
    height: 250,
    left: 540,
    top: 680,
    fill: 'white',
    rx: 30,
    ry: 30,
    originX: 'center',
    originY: 'center',
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.1)',
      blur: 10,
      offsetX: 0,
      offsetY: 5,
    }),
    selectable: false,
    evented: false,
  });
  canvas.add(detailsBox);

  // Add product name
  const productName = new fabric.Textbox('Smartphone Ultra Premium XZ200 128GB', {
    width: 850,
    left: 540,
    top: 620,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 42,
    fill: '#343A40',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    selectable: true,
    data: { id: 'productName' },
  });
  canvas.add(productName);

  // Add price section background
  const priceSectionBg = new fabric.Rect({
    width: 400,
    height: 100,
    left: 300,
    top: 740,
    fill: 'rgba(76, 187, 23, 0.1)',
    rx: 15,
    ry: 15,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(priceSectionBg);

  // Add price tag background
  const priceTagBg = new fabric.Rect({
    width: 220,
    height: 60,
    left: 200,
    top: 740,
    fill: '#4CBB17',
    rx: 10,
    ry: 10,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'accent' },
  });
  canvas.add(priceTagBg);

  // Add price text
  const priceText = new fabric.Textbox('R$ 1.299,90', {
    width: 200,
    left: 200,
    top: 740,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 28,
    fill: 'white',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    selectable: true,
    data: { id: 'productPrice' },
  });
  canvas.add(priceText);

  // Add original price
  const originalPrice = new fabric.Textbox('R$ 1.899,90', {
    width: 150,
    left: 350,
    top: 725,
    fontFamily: 'Roboto',
    fontSize: 22,
    fill: '#777',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    linethrough: true,
    selectable: true,
    data: { id: 'originalPrice' },
  });
  canvas.add(originalPrice);

  // Add discount percentage
  const discountPercent = new fabric.Text('32% OFF', {
    left: 350,
    top: 755,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 22,
    fill: '#4CBB17',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'accent' },
  });
  canvas.add(discountPercent);

  // Add link section background
  const linkSectionBg = new fabric.Rect({
    width: 400,
    height: 100,
    left: 780,
    top: 740,
    fill: 'rgba(255, 75, 145, 0.1)',
    rx: 15,
    ry: 15,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(linkSectionBg);

  // Add "LINK AFILIADO" text
  const linkTitle = new fabric.Text('LINK AFILIADO', {
    left: 780,
    top: 710,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 22,
    fill: '#FF4B91',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(linkTitle);

  // Add link background
  const linkBg = new fabric.Rect({
    width: 320,
    height: 50,
    left: 780,
    top: 750,
    fill: '#FF4B91',
    rx: 10,
    ry: 10,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(linkBg);

  // Add link text
  const linkText = new fabric.Textbox('bit.ly/oferta-xz200', {
    width: 300,
    left: 780,
    top: 750,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    fill: 'white',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    selectable: true,
    data: { id: 'affiliateLink' },
  });
  canvas.add(linkText);

  // Add marketplace logos section
  const logoSectionBg = new fabric.Rect({
    width: 1080,
    height: 120,
    left: 540,
    top: 1020,
    fill: 'rgba(255, 255, 255, 0.8)',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(logoSectionBg);

  // Add Amazon Logo
  const amazonLogoBg = new fabric.Rect({
    width: 180,
    height: 60,
    left: 300,
    top: 1020,
    fill: '#232F3E',
    rx: 10,
    ry: 10,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(amazonLogoBg);

  const amazonLogoText = new fabric.Text('Amazon', {
    left: 300,
    top: 1020,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    fill: 'white',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(amazonLogoText);

  // Add Mercado Livre Logo
  const mercadoLivreBg = new fabric.Rect({
    width: 220,
    height: 60,
    left: 540,
    top: 1020,
    fill: '#FFE600',
    rx: 10,
    ry: 10,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(mercadoLivreBg);

  const mercadoLivreText = new fabric.Text('Mercado Livre', {
    left: 540,
    top: 1020,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    fill: '#2D3277',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(mercadoLivreText);

  // Add Shopee Logo
  const shopeeBg = new fabric.Rect({
    width: 160,
    height: 60,
    left: 780,
    top: 1020,
    fill: '#EE4D2D',
    rx: 10,
    ry: 10,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(shopeeBg);

  const shopeeText = new fabric.Text('Shopee', {
    left: 780,
    top: 1020,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    fill: 'white',
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });
  canvas.add(shopeeText);

  // Add decorative elements
  // Sale badge
  const saleBadge1 = new fabric.Circle({
    radius: 40,
    left: 100,
    top: 840,
    fill: '#FF4B91',
    opacity: 0.9,
    originX: 'center',
    originY: 'center',
    angle: -12,
    selectable: false,
    evented: false,
    data: { colorType: 'primary' },
  });
  canvas.add(saleBadge1);

  // Percentage badge
  const saleBadge2 = new fabric.Circle({
    radius: 40,
    left: 980,
    top: 240,
    fill: '#4CBB17',
    opacity: 0.9,
    originX: 'center',
    originY: 'center',
    angle: 12,
    selectable: false,
    evented: false,
    data: { colorType: 'accent' },
  });
  canvas.add(saleBadge2);

  // Render everything
  canvas.renderAll();
}

// Calculate the discount percentage from original and current price
export function calculateDiscountPercentage(originalPrice: string, currentPrice: string): string {
  // Extract numeric values (assuming format like "R$ 1.899,90")
  const original = parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  const current = parseFloat(currentPrice.replace(/[^\d,]/g, '').replace(',', '.'));
  
  if (isNaN(original) || isNaN(current) || original <= current) {
    return "0% OFF";
  }
  
  const discount = Math.round(((original - current) / original) * 100);
  return `${discount}% OFF`;
}

// Function to update discount percentage text
export function updateDiscountText(canvas: fabric.Canvas, originalPrice: string, currentPrice: string) {
  const discountText = canvas.getObjects().find(obj => 
    obj instanceof fabric.Text && obj.text?.includes('% OFF')
  );
  
  if (discountText && discountText instanceof fabric.Text) {
    discountText.set('text', calculateDiscountPercentage(originalPrice, currentPrice));
    canvas.renderAll();
  }
}
