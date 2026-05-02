# Interio Design System

## Brand personality
Premium, warm, trustworthy. Like walking into a high-end interior showroom.
Not cold and techy. Not flashy. Calm confidence.

---

## Color tokens (add to tailwind.config.ts)

```js
colors: {
  cream:   { DEFAULT: '#FAF8F5', dark: '#F0EDE8' },
  charcoal:{ DEFAULT: '#1C1917', light: '#3D3935' },
  copper:  { DEFAULT: '#B87333', light: '#D4956A', dark: '#8B5E27' },
  warm:    { 50: '#FDF8F0', 100: '#F5ECD8', 200: '#E8D5B0' },
  stone:   { 300: '#C4B8A8', 500: '#8A7968', 700: '#4A4038' },
}
```

Usage:
- Page backgrounds: bg-cream
- Primary text: text-charcoal
- Accent (CTA buttons, links, highlights): text-copper / bg-copper
- Borders: border-stone-300
- Muted text: text-stone-500
- Cards: bg-white border border-stone-300/60

---

## Typography

Fonts (add to layout.tsx via next/font/google):
- Headings: Playfair Display — font-playfair
- Body: Inter — font-inter

Scale:
- Hero heading:    text-5xl md:text-7xl font-playfair font-bold leading-tight
- Section heading: text-3xl md:text-4xl font-playfair font-semibold
- Card title:      text-xl font-playfair font-medium
- Body:            text-base font-inter text-stone-700 leading-relaxed
- Caption/label:   text-sm font-inter text-stone-500 tracking-wide uppercase

---

## Spacing system

Always use multiples of 4px (Tailwind default):
- Section padding:   py-20 md:py-28
- Container:         max-w-7xl mx-auto px-4 md:px-8
- Card padding:      p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Stack spacing:     space-y-4 inside cards, space-y-16 between sections

---

## Component patterns

### Product card
```tsx
<div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden 
                hover:shadow-lg hover:border-copper/40 transition-all duration-300">
  <div className="relative aspect-[4/3] overflow-hidden">
    <Image ... className="object-cover group-hover:scale-105 transition-transform duration-500" />
    {featured && <Badge>Featured</Badge>}
  </div>
  <div className="p-5">
    <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{category}</p>
    <h3 className="font-playfair text-lg text-charcoal mb-2">{title}</h3>
    <div className="flex items-center justify-between">
      <PriceDisplay price={price} discount={discountPrice} />
      <WhatsAppButton product={product} />
    </div>
  </div>
</div>
```

### Primary button (WhatsApp CTA)
```tsx
<button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] 
                   text-white font-inter font-medium px-6 py-3 rounded-full 
                   transition-colors duration-200 shadow-sm hover:shadow-md">
  <WhatsAppIcon className="w-5 h-5" />
  Order via WhatsApp
</button>
```

### Section heading pattern
```tsx
<div className="text-center mb-12">
  <p className="text-sm uppercase tracking-[0.2em] text-copper mb-3">Our Collection</p>
  <h2 className="font-playfair text-4xl text-charcoal">Explore Products</h2>
  <div className="w-16 h-0.5 bg-copper mx-auto mt-4" />
</div>
```

### Skeleton loader
```tsx
<div className="animate-pulse bg-stone-100 rounded-2xl h-64 w-full" />
```

### Admin table row
```tsx
<tr className="border-b border-stone-100 hover:bg-warm-50 transition-colors">
  <td className="py-4 px-4 font-inter text-sm text-charcoal">{value}</td>
</tr>
```

---

## Animation presets (Framer Motion)

```ts
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
}
```

---

## Do / Don't

DO:
- Use rounded-2xl for cards, rounded-full for buttons and pills
- Add transition-all duration-300 to every interactive card
- Use aspect-[4/3] for product images, aspect-square for thumbnails
- Show ₹ symbol with Indian number formatting: toLocaleString('en-IN')
- Use dividers (w-16 h-0.5 bg-copper) under section headings

DON'T:
- Use blue as an accent color anywhere in the storefront
- Use font-bold on body text
- Use box-shadow for cards — use border + hover:shadow-lg instead
- Use px-2 py-1 for buttons — always px-5 py-2.5 minimum
- Leave any loading or error state unstyled
