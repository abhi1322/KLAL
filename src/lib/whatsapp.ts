export interface ProductProps {
  title: string;
  price: number;
}

export function buildWhatsAppUrl(product: ProductProps, qty: number, msg?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  let text = `Hello! I'm interested in ordering:\n- ${product.title} × ${qty}\nPrice: ₹${(product.price * qty).toLocaleString('en-IN')}`;
  
  if (msg && msg.trim()) {
    text += `\n\nCustom Message: ${msg.trim()}`;
  }
  
  text += `\n\nPlease confirm availability and delivery details.`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
