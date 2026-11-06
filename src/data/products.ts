export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  brand: string;
  code: string;
  color: string;
  iconType: string;
}

export const productList: Product[] = [
  {
    id: 1,
    name: "JavaScript: The Definitive Guide",
    category: "Books",
    price: 650,
    rating: 4.8,
    stock: 14,
    description: "7th Edition by David Flanagan. Covers ES6+, classes, modules, iterators, generators, and web platform APIs.",
    brand: "O'Reilly Media",
    code: "BK-101",
    color: "#f5ebe0",
    iconType: "book-js"
  },
  {
    id: 2,
    name: "React Cookbook",
    category: "Books",
    price: 580,
    rating: 4.6,
    stock: 9,
    description: "By David Griffiths and Dawn Griffiths. Practical recipes for building modern single-page web applications.",
    brand: "O'Reilly Media",
    code: "BK-102",
    color: "#e8f1f5",
    iconType: "book-react"
  },
  {
    id: 3,
    name: "Web Development & Design Foundations",
    category: "Books",
    price: 520,
    rating: 4.5,
    stock: 18,
    description: "HTML5 & CSS textbook by Terry Felke-Morris covering web standards, page layout, forms, and site planning.",
    brand: "Pearson Education",
    code: "BK-103",
    color: "#eef2e6",
    iconType: "book-html"
  },
  {
    id: 4,
    name: "Casio FX-991CW Scientific Calculator",
    category: "Electronics",
    price: 1295,
    rating: 4.9,
    stock: 22,
    description: "Non-programmable scientific calculator with high-resolution textbook display and 540+ functions for exams.",
    brand: "Casio",
    code: "EL-201",
    color: "#e9ecef",
    iconType: "calc"
  },
  {
    id: 5,
    name: "Logitech M221 Wireless Mouse",
    category: "Electronics",
    price: 799,
    rating: 4.4,
    stock: 15,
    description: "Silent click compact wireless mouse with 2.4 GHz USB receiver and 18-month battery life for lab sessions.",
    brand: "Logitech",
    code: "EL-202",
    color: "#e5e7eb",
    iconType: "mouse"
  },
  {
    id: 6,
    name: "SanDisk 64GB USB 3.2 Pendrive",
    category: "Electronics",
    price: 490,
    rating: 4.7,
    stock: 30,
    description: "Metal casing flash drive with fast transfer speeds up to 150 MB/s for project backups and lab submissions.",
    brand: "SanDisk",
    code: "EL-203",
    color: "#f3e8ee",
    iconType: "usb"
  },
  {
    id: 7,
    name: "Classmate Pulse A4 Spiral Notebook (Pack of 3)",
    category: "Stationery",
    price: 360,
    rating: 4.7,
    stock: 40,
    description: "300-page unruled and single-line spiral notebooks with sturdy polypropylene covers for lecture notes.",
    brand: "Classmate",
    code: "ST-301",
    color: "#fef3c7",
    iconType: "notebook"
  },
  {
    id: 8,
    name: "Pilot V7 Liquid Ink Pen Set (Blue/Black)",
    category: "Stationery",
    price: 210,
    rating: 4.8,
    stock: 25,
    description: "Pack of 3 fine needle-point rollerball pens with visible ink level and smooth consistent flow.",
    brand: "Pilot",
    code: "ST-302",
    color: "#e0f2fe",
    iconType: "pen"
  },
  {
    id: 9,
    name: "Canvas Laptop Backpack 15.6 Inch",
    category: "Accessories",
    price: 1450,
    rating: 4.5,
    stock: 7,
    description: "Water-resistant cotton canvas backpack with padded laptop compartment, bottle pocket, and organizer.",
    brand: "DailyGear",
    code: "AC-401",
    color: "#e7e5e4",
    iconType: "bag"
  },
  {
    id: 10,
    name: "Insulated Stainless Steel Flask 750ml",
    category: "Accessories",
    price: 620,
    rating: 4.6,
    stock: 12,
    description: "Double-wall vacuum insulated water bottle that keeps drinks cold for 18 hours or hot for 12 hours.",
    brand: "Milton",
    code: "AC-402",
    color: "#dcfce7",
    iconType: "bottle"
  },
  {
    id: 11,
    name: "Adjustable Aluminum Laptop Stand",
    category: "Accessories",
    price: 890,
    rating: 4.4,
    stock: 11,
    description: "Foldable 6-level ergonomic desk stand compatible with 13 to 16 inch laptops with silicone anti-slip pads.",
    brand: "Portronics",
    code: "AC-403",
    color: "#f1f5f9",
    iconType: "stand"
  },
  {
    id: 12,
    name: "Desk Grid Organizer & Pen Holder",
    category: "Stationery",
    price: 280,
    rating: 4.3,
    stock: 19,
    description: "Powder-coated wire mesh desk caddy with 4 compartments for pens, sticky notes, clips, and rulers.",
    brand: "Solo",
    code: "ST-303",
    color: "#f5f5f4",
    iconType: "organizer"
  }
];
