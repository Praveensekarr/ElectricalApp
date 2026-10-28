import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Trash2,
  Printer,
  MessageCircle,
  Calculator,
  SlidersHorizontal,
  ArrowUpDown,
  Package,
  Award,
  Sparkles,
  FileText,
  QrCode,
  Heart,
  Layers,
  ChevronRight,
  Settings,
  Info,
  ExternalLink,
  Check,
  AlertTriangle,
  Building2,
  UserCheck,
  Copy,
  RefreshCw,
  Mail,
  Navigation,
  Star
} from 'lucide-react';

// --- INITIAL AUTHORIZED PRODUCT CATALOG ---
const INITIAL_PRODUCTS = [
  {
    id: 'BE-101',
    name: 'Finolex Flame Guard FRLS 1.5 sq mm House Wire (90m)',
    brand: 'Finolex Cables',
    category: 'House Wiring & Cables',
    price: 1850,
    mrp: 2290,
    bulkPrice: 1760,
    bulkMinQty: 5,
    stock: 48,
    rating: 4.9,
    reviews: 164,
    badge: 'Best Seller',
    isiCode: 'IS 694:2010',
    voltageGrade: '1100V',
    warranty: 'Lifetime Copper Purity Guarantee',
    specs: '1.5 sq.mm • 90m Coil • 100% Electrolytic Copper • Flame Retardant Low Smoke',
    description: 'Genuine Finolex Flame Guard FRLS insulated house wire engineered with 99.97% pure electrolytic grade bright annealed bare copper. Ideal for domestic lighting, fans, and switchboard interconnections.',
    application: 'Recommended for up to 12A continuous load (LED lighting, ceiling fans, TV sockets).',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-102',
    name: 'Finolex Flame Guard FRLS 2.5 sq mm Power Wire (90m)',
    brand: 'Finolex Cables',
    category: 'House Wiring & Cables',
    price: 2950,
    mrp: 3580,
    bulkPrice: 2820,
    bulkMinQty: 5,
    stock: 35,
    rating: 4.9,
    reviews: 128,
    badge: 'Heavy Duty',
    isiCode: 'IS 694:2010',
    voltageGrade: '1100V',
    warranty: 'Lifetime Copper Purity Guarantee',
    specs: '2.5 sq.mm • 90m Coil • Multi-Strand Flexible Copper • Thermal Stability',
    description: 'High-current carrying Finolex 2.5 sq.mm cable designed for 16A power circuits, 1.5 Ton Split ACs, bathroom water heaters (geysers), and heavy kitchen appliances.',
    application: 'Pair with a 16A or 20A Schneider C-Curve MCB for optimum circuit safety.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-103',
    name: 'Finolex 4.0 sq mm 3-Core Submersible Flat Cable (Per Meter)',
    brand: 'Finolex Cables',
    category: 'House Wiring & Cables',
    price: 138,
    mrp: 175,
    bulkPrice: 128,
    bulkMinQty: 50,
    stock: 400,
    rating: 5.0,
    reviews: 92,
    badge: 'Farm & Borewell',
    isiCode: 'IS 694',
    voltageGrade: '1100V Submersible',
    warranty: '5 Years Manufacturer Warranty',
    specs: '4.0 sq.mm • 3-Core Flat • Oil, Abrasion & Moisture Resistant PVC Sheath',
    description: 'Specially formulated waterproof double-sheathed flat cable for deep-well agricultural submersible pump motors in Kalangani and Namakkal farms.',
    application: 'Direct underwater coupling from borewell motor leads to starter panel.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-104',
    name: 'Schneider Electric Easy9 32A Double Pole (DP) MCB Isolator',
    brand: 'Schneider Electric',
    category: 'Switchgear & MCBs',
    price: 490,
    mrp: 650,
    bulkPrice: 455,
    bulkMinQty: 10,
    stock: 60,
    rating: 4.8,
    reviews: 87,
    badge: '10kA Breaking',
    isiCode: 'IS/IEC 60898-1',
    voltageGrade: '240V / 415V AC',
    warranty: '2 Years Replacement Warranty',
    specs: '32A • Double Pole • C-Curve • 10kA Short Circuit Rating • DIN Rail',
    description: 'Schneider Electric Easy9 main incoming DP breaker with rapid magnetic trip mechanism and bi-connect terminals for simultaneous phase and neutral isolation.',
    application: 'Install as main incoming switch inside residential or commercial DB boxes.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-105',
    name: 'Schneider Acti9 16A Single Pole C-Curve MCB',
    brand: 'Schneider Electric',
    category: 'Switchgear & MCBs',
    price: 195,
    mrp: 265,
    bulkPrice: 178,
    bulkMinQty: 12,
    stock: 140,
    rating: 4.9,
    reviews: 112,
    badge: 'Contractor Choice',
    isiCode: 'IS/IEC 60898-1',
    voltageGrade: '240V AC',
    warranty: '2 Years Warranty',
    specs: '16A • Single Pole • C-Curve • VisiTrip Fault Indicator • 10kA',
    description: 'Precision overload and short-circuit protection for individual room sub-circuits, geysers, and air conditioners.',
    application: 'Snap onto standard 35mm DIN rail inside distribution boards.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-106',
    name: 'C.R.I. 1.0 HP Self-Priming Monoblock Pump (Copper Winding)',
    brand: 'C.R.I. Pumps',
    category: 'Fans & Appliances',
    price: 8450,
    mrp: 10200,
    bulkPrice: 8100,
    bulkMinQty: 2,
    stock: 14,
    rating: 5.0,
    reviews: 95,
    badge: 'C.R.I. Authorized',
    isiCode: 'IS 8472',
    voltageGrade: '180V - 240V Single Phase',
    warranty: '1 Year On-Site C.R.I. Warranty',
    specs: '1.0 HP (0.75 kW) • 25x25mm Suction/Delivery • 42m Max Head • Thermal Overload Protector',
    description: 'High-efficiency C.R.I. regenerative self-priming pump built with 100% EC grade copper winding and anti-corrosive stainless steel shaft. Built for overhead tank filling and garden irrigation.',
    application: 'Connect with a 16A motor starter switch and 2.5 sq.mm Finolex supply line.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-107',
    name: 'Legrand Mylinc 6A 1-Way Modular Switch (Glossy White)',
    brand: 'Legrand',
    category: 'Modular Switches & Sockets',
    price: 82,
    mrp: 112,
    bulkPrice: 72,
    bulkMinQty: 20,
    stock: 250,
    rating: 4.8,
    reviews: 143,
    badge: 'Zero Spark',
    isiCode: 'IS 3854',
    voltageGrade: '240V AC',
    warranty: '10 Years Mechanism Warranty',
    specs: '6A • 1 Module • Silver Nickel Contacts • Flame Retardant Polycarbonate',
    description: 'Ergonomic soft-click modular switch from Legrand Mylinc series featuring captive screws, laser-marked ratings, and UV-stabilized pure white finish.',
    application: 'Fits Legrand Mylinc modular plates for bedrooms, halls, and offices.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-108',
    name: 'Philips 20W Astra Line LED Batten Tube Light (6500K Cool Day)',
    brand: 'Philips',
    category: 'LED & Decorative Lighting',
    price: 320,
    mrp: 499,
    bulkPrice: 290,
    bulkMinQty: 10,
    stock: 85,
    rating: 4.8,
    reviews: 109,
    badge: 'EyeComfort',
    isiCode: 'IS 10322',
    voltageGrade: '140V - 280V Wide Voltage',
    warranty: '2 Years Counter Replacement',
    specs: '20W • 2000 Lumens • 4 feet • 4kV Built-in Surge Protection',
    description: 'Ultra-bright Philips LED batten engineered with glare-free polycarbonate diffuser and high-surge driver suitable for rural and highway voltage fluctuations.',
    application: 'Direct wall or ceiling clip mounting with 2-core supply.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-109',
    name: 'Crompton Energion 1200mm BLDC Energy Saving Ceiling Fan',
    brand: 'Crompton',
    category: 'Fans & Appliances',
    price: 3390,
    mrp: 4590,
    bulkPrice: 3200,
    bulkMinQty: 4,
    stock: 22,
    rating: 4.9,
    reviews: 88,
    badge: '5-Star BEE (28W)',
    isiCode: 'IS 374',
    voltageGrade: '90V - 300V AC',
    warranty: '5 Years Motor Warranty',
    specs: '28W ActivBLDC • 370 RPM • 220 CMM Air Delivery • RF Smart Remote',
    description: 'Saves up to ₹1,500/year per fan on electricity bills. Runs smoothly on inverter battery twice as long as conventional induction fans.',
    application: 'Includes downrod, canopies, shackle kit, and point-anywhere remote.',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-110',
    name: 'Finolex 25mm Heavy Duty Rigid PVC Electrical Conduit Pipe (3m)',
    brand: 'Finolex Pipes',
    category: 'Pipes & Conduits',
    price: 110,
    mrp: 145,
    bulkPrice: 98,
    bulkMinQty: 25,
    stock: 320,
    rating: 4.9,
    reviews: 67,
    badge: 'Slab Grade HMS',
    isiCode: 'IS 9537 Part 3',
    voltageGrade: 'High Dielectric Insulation',
    warranty: 'ISI Certified Crush Proof',
    specs: '25mm OD • 3 Meter Length • Heavy Mechanical Stress (HMS) Black/Grey',
    description: 'Unplasticized rigid PVC conduit pipe engineered to withstand heavy concrete pouring pressure during roof slab casting and concealed wall channelling.',
    application: 'Use with Finolex 25mm deep junction boxes, bends, and solvent cement.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BE-111',
    name: 'Digital Clamp Meter & Heavy Duty Insulated Electrician Tool Kit',
    brand: 'Schneider Electric',
    category: 'Tools & Safety Gear',
    price: 1290,
    mrp: 1690,
    bulkPrice: 1180,
    bulkMinQty: 3,
    stock: 18,
    rating: 4.7,
    reviews: 41,
    badge: '1000V Insulated',
    isiCode: 'IEC 61010',
    voltageGrade: 'Up to 1000V AC/DC',
    warranty: '1 Year Warranty',
    specs: '600A AC Clamp • Continuity Buzzer • 8-in-1 Insulated Plier & Tester Set',
    description: 'Complete field testing and safety maintenance kit for wiremen, pump technicians, and industrial maintenance engineers.',
    application: 'Essential for troubleshooting motor current draw and neutral earth faults.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
  }
];

const CATEGORIES = [
  'All Categories',
  'House Wiring & Cables',
  'Switchgear & MCBs',
  'Modular Switches & Sockets',
  'LED & Decorative Lighting',
  'Fans & Appliances',
  'Pipes & Conduits',
  'Tools & Safety Gear'
];

const BRANDS = [
  'All',
  'Finolex Cables',
  'Schneider Electric',
  'C.R.I. Pumps',
  'Finolex Pipes',
  'Legrand',
  'Philips',
  'Crompton'
];

const ELECTRICIAN_SERVICES = [
  {
    id: 'srv-1',
    title: 'Ceiling Fan & Appliance Installation',
    rate: 250,
    unit: 'per unit',
    desc: 'Safe mounting, capacitor check, regulator wiring, and speed testing for fans, geysers, and lights.',
    badge: '30 Min Arrival'
  },
  {
    id: 'srv-2',
    title: 'Short Circuit & MCB Trip Troubleshooting',
    rate: 350,
    unit: 'per visit',
    desc: 'Insulation testing, neutral fault isolation, burnt phase wire replacement, and DB board load balancing.',
    badge: 'Emergency Support'
  },
  {
    id: 'srv-3',
    title: 'C.R.I. Pump & Starter Box Wiring',
    rate: 450,
    unit: 'per setup',
    desc: 'Agricultural borewell submersible / domestic monoblock starter connection, relay calibration & earthing.',
    badge: 'Pump Specialist'
  },
  {
    id: 'srv-4',
    title: 'Complete House Rewiring & Slab Conduit Survey',
    rate: 0,
    unit: 'Free Estimate',
    desc: 'On-site measurement for new house construction, Finolex pipe layout, and complete material BOQ.',
    badge: 'Free Site Visit'
  }
];

// --- CUSTOM SVG BE HOUSE MONOGRAM LOGO ---
const BalajiLogo = ({ size = 'md' }) => {
  const dimensions = size === 'lg' ? 'w-14 h-14' : 'w-12 h-12';
  return (
    <div className={`${dimensions} flex-shrink-0 bg-red-50 rounded-2xl p-1.5 border border-red-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* House Roof and Chimney matching screenshot emblem */}
        <path
          d="M16 52 L50 20 L84 52"
          stroke="#dc2626"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68 28 L68 18 L77 18 L77 36"
          stroke="#dc2626"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* House Side Walls */}
        <path
          d="M26 48 L26 84 L74 84 L74 48"
          stroke="#dc2626"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bottom Ground Line */}
        <line x1="14" y1="92" x2="86" y2="92" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        {/* Bold 'BE' Monogram */}
        <text
          x="50%"
          y="74%"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="900"
          fontSize="32"
          fill="#dc2626"
          letterSpacing="-1"
        >
          BE
        </text>
      </svg>
    </div>
  );
};

export default function App() {
  // --- PERSISTENT REACT STATES ---
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('balaji_react_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('balaji_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('balaji_react_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- UI & FILTER STATES ---
  const [activeMode, setActiveMode] = useState('customer'); // 'customer' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [bulkPricingMode, setBulkPricingMode] = useState(false);

  // --- INTERACTIVE DRAWERS & MODALS ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoadCalcOpen, setIsLoadCalcOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // --- COUPON & CHECKOUT STATES ---
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscountPct, setAppliedDiscountPct] = useState(0);
  const [buyerDetails, setBuyerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    gstin: '',
    fulfillment: 'Same-Day Site Delivery (Kalangani / Namakkal)'
  });

  // --- ELECTRICIAN BOOKING STATE ---
  const [selectedService, setSelectedService] = useState(ELECTRICIAN_SERVICES[0]);
  const [serviceUnits, setServiceUnits] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    slot: 'Morning (09:00 AM - 01:00 PM)',
    notes: ''
  });

  // --- SMART ELECTRICAL LOAD CALCULATOR STATE ---
  const [appliances, setAppliances] = useState({
    fans: 3,
    ledLights: 6,
    tvFridge: 1,
    ac15Ton: 1,
    geyser2kW: 0,
    criPump1HP: 0
  });

  // --- ADMIN NEW PRODUCT FORM ---
  const [newSku, setNewSku] = useState({
    name: '',
    brand: 'Finolex Cables',
    category: 'House Wiring & Cables',
    price: '',
    mrp: '',
    stock: 25,
    specs: ''
  });

  // --- TOAST NOTIFICATIONS ---
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // --- SYNC LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('balaji_react_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('balaji_react_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('balaji_react_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- KEYBOARD SHORTCUT CTRL+K ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- FILTERED & SORTED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchCat =
          selectedCategory === 'All Categories' || item.category === selectedCategory;
        const matchBrand =
          selectedBrand === 'All' ||
          item.brand.toLowerCase().includes(selectedBrand.toLowerCase());
        const matchSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchPrice = item.price <= maxPrice;
        const matchStock = !inStockOnly || item.stock > 0;
        return matchCat && matchBrand && matchSearch && matchPrice && matchStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'discount') {
          const discA = (a.mrp - a.price) / a.mrp;
          const discB = (b.mrp - b.price) / b.mrp;
          return discB - discA;
        }
        return b.rating * b.reviews - a.rating * a.reviews;
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, maxPrice, inStockOnly, sortBy]);

  // --- CART OPERATIONS ---
  const addToCart = (product, qty = 1) => {
    if (product.stock <= 0) {
      addToast('Item is currently out of stock', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const nextQty = Math.min(product.stock, existing.qty + qty);
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: nextQty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    addToast(`Added ${qty}x ${product.name.slice(0, 28)}... to cart`);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = item.qty + delta;
          if (nextQty > item.stock) {
            addToast(`Max available stock (${item.stock}) reached`, 'info');
            return item;
          }
          return { ...item, qty: nextQty };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const getEffectiveUnitPrice = (item) => {
    if (bulkPricingMode || item.qty >= (item.bulkMinQty || 5)) {
      return item.bulkPrice || Math.round(item.price * 0.95);
    }
    return item.price;
  };

  const cartMetrics = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const rawSubtotal = cart.reduce(
      (acc, item) => acc + getEffectiveUnitPrice(item) * item.qty,
      0
    );
    const mrpTotal = cart.reduce((acc, item) => acc + item.mrp * item.qty, 0);
    const couponDiscount = Math.round((rawSubtotal * appliedDiscountPct) / 100);
    const grandTotal = rawSubtotal - couponDiscount;
    const taxableValue = Math.round(grandTotal / 1.18);
    const totalGst = grandTotal - taxableValue;
    const cgst = Math.round(totalGst / 2);
    const sgst = totalGst - cgst;
    const totalSavings = mrpTotal - grandTotal;
    const freeDeliveryThreshold = 10000;
    const deliveryProgress = Math.min(
      100,
      Math.round((grandTotal / freeDeliveryThreshold) * 100)
    );

    return {
      totalItems,
      rawSubtotal,
      couponDiscount,
      grandTotal,
      taxableValue,
      cgst,
      sgst,
      totalSavings,
      freeDeliveryThreshold,
      deliveryProgress,
      isFreeDelivery: grandTotal >= freeDeliveryThreshold
    };
  }, [cart, appliedDiscountPct, bulkPricingMode]);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'BALAJI5') {
      if (cartMetrics.rawSubtotal < 2000) {
        addToast('BALAJI5 requires a minimum cart value of ₹2,000', 'info');
        return;
      }
      setAppliedDiscountPct(5);
      addToast('Promo BALAJI5 applied! Extra 5% discount unlocked.');
    } else {
      setAppliedDiscountPct(0);
      addToast('Invalid coupon code. Try BALAJI5', 'error');
    }
  };

  // --- WISHLIST & COMPARE ---
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        addToast('Removed from saved items', 'info');
        return prev.filter((item) => item !== id);
      }
      addToast('Saved to your project wishlist');
      return [...prev, id];
    });
  };

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        addToast('You can compare up to 3 products at once', 'info');
        return prev;
      }
      addToast(`Added ${product.brand} item to comparison`);
      return [...prev, product];
    });
  };

  // --- SMART ELECTRICAL LOAD CALCULATOR ENGINE ---
  const loadAnalysis = useMemo(() => {
    const watts =
      appliances.fans * 65 +
      appliances.ledLights * 20 +
      appliances.tvFridge * 250 +
      appliances.ac15Ton * 1600 +
      appliances.geyser2kW * 2000 +
      appliances.criPump1HP * 750;

    const amps = +(watts / 230).toFixed(1);
    const safetyAmps = +(amps * 1.25).toFixed(1);

    let wireGauge = '1.5 sq.mm Finolex FRLS';
    let recommendedWireId = 'BE-101';
    let mcbRating = '16A Schneider Acti9 SP MCB';
    let recommendedMcbId = 'BE-105';

    if (safetyAmps > 14 && safetyAmps <= 26) {
      wireGauge = '2.5 sq.mm Finolex FRLS Power Wire';
      recommendedWireId = 'BE-102';
      mcbRating = '32A Schneider Easy9 DP MCB';
      recommendedMcbId = 'BE-104';
    } else if (safetyAmps > 26) {
      wireGauge = '4.0 sq.mm Heavy Duty Finolex Cable + 2.5 sq.mm Sub-lines';
      recommendedWireId = 'BE-102';
      mcbRating = '32A Schneider DP Main Isolator + 16A SP Breakers';
      recommendedMcbId = 'BE-104';
    }

    return {
      watts,
      amps,
      safetyAmps,
      wireGauge,
      mcbRating,
      recommendedWireId,
      recommendedMcbId
    };
  }, [appliances]);

  const addRecommendedKitToCart = () => {
    const wireProd = products.find((p) => p.id === loadAnalysis.recommendedWireId);
    const mcbProd = products.find((p) => p.id === loadAnalysis.recommendedMcbId);
    if (wireProd) addToCart(wireProd, 1);
    if (mcbProd) addToCart(mcbProd, 2);
    if (appliances.criPump1HP > 0) {
      const pumpProd = products.find((p) => p.id === 'BE-106');
      if (pumpProd) addToCart(pumpProd, 1);
    }
    setIsLoadCalcOpen(false);
    setIsCartOpen(true);
  };

  // --- WHATSAPP ORDER & DISPATCH ---
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) {
      addToast('Add items to your cart first', 'error');
      return;
    }
    let msg = `*NEW ORDER - BALAJI ELECTRICALS (NAMAKKAL)*\n`;
    msg += `Address: 7/149, NH-44 Bypass, Kalangani\n`;
    msg += `------------------------------------------\n`;
    cart.forEach((item, idx) => {
      const rate = getEffectiveUnitPrice(item);
      msg += `${idx + 1}. *${item.name}*\n   Qty: ${item.qty} x ₹${rate} = ₹${(
        rate * item.qty
      ).toLocaleString('en-IN')}\n`;
    });
    msg += `------------------------------------------\n`;
    if (cartMetrics.couponDiscount > 0) {
      msg += `Coupon Discount (BALAJI5): -₹${cartMetrics.couponDiscount}\n`;
    }
    msg += `*Grand Total (Incl. 18% GST): ₹${cartMetrics.grandTotal.toLocaleString(
      'en-IN'
    )}*\n`;
    msg += `Delivery Mode: ${
      cartMetrics.isFreeDelivery
        ? 'FREE Local Site Delivery (> ₹10,000)'
        : buyerDetails.fulfillment
    }\n`;
    if (buyerDetails.name) msg += `Customer: ${buyerDetails.name} (${buyerDetails.phone})\n`;
    if (buyerDetails.gstin) msg += `Customer GSTIN: ${buyerDetails.gstin}\n`;

    window.open(
      `https://wa.me/919442190934?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const handleElectricianBooking = (e) => {
    e.preventDefault();
    const estTotal =
      selectedService.rate > 0
        ? `₹${selectedService.rate * serviceUnits}`
        : 'Free On-Site Measurement';
    let msg = `*ELECTRICIAN DISPATCH REQUEST - BALAJI ELECTRICALS*\n`;
    msg += `Service: *${selectedService.title}*\n`;
    msg += `Units / Points: ${serviceUnits} (${estTotal})\n`;
    msg += `Customer: ${bookingForm.name} (${bookingForm.phone})\n`;
    msg += `Location: ${bookingForm.address}\n`;
    msg += `Preferred Slot: ${bookingForm.date} | ${bookingForm.slot}\n`;
    if (bookingForm.notes) msg += `Note: ${bookingForm.notes}\n`;

    addToast('Opening WhatsApp to confirm technician dispatch!');
    window.open(
      `https://wa.me/919442190934?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  // --- ADMIN INVENTORY HANDLERS ---
  const handleAddAdminProduct = (e) => {
    e.preventDefault();
    const priceNum = Number(newSku.price) || 500;
    const mrpNum = Number(newSku.mrp) || Math.round(priceNum * 1.25);
    const created = {
      id: `BE-${112 + products.length}`,
      name: newSku.name,
      brand: newSku.brand,
      category: newSku.category,
      price: priceNum,
      mrp: mrpNum,
      bulkPrice: Math.round(priceNum * 0.94),
      bulkMinQty: 5,
      stock: Number(newSku.stock) || 20,
      rating: 4.9,
      reviews: 12,
      badge: 'New Stock',
      isiCode: 'ISI Certified',
      voltageGrade: '240V / 1100V',
      warranty: '1 Year Store Warranty',
      specs: newSku.specs || 'Genuine Authorized Supply • Ready Stock at Kalangani',
      description: `${newSku.brand} electrical supply stocked at Balaji Electricals, Kalangani NH-44 Bypass.`,
      application: 'Standard residential, agricultural, or commercial installation.',
      image:
        'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80'
    };
    setProducts((prev) => [created, ...prev]);
    setNewSku({
      name: '',
      brand: 'Finolex Cables',
      category: 'House Wiring & Cables',
      price: '',
      mrp: '',
      stock: 25,
      specs: ''
    });
    addToast(`Added "${created.name}" to live store catalog!`);
  };

  const adjustProductStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
    addToast('Inventory count updated');
  };

  const resetCatalogToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('balaji_react_products');
    addToast('Catalog restored to default authorized items', 'info');
  };

  const scrollToId = (id) => {
    if (activeMode !== 'customer') setActiveMode('customer');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  // UPI URI & QR URL
  const invoiceNumber = useMemo(
    () => `BE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    [isInvoiceModalOpen]
  );
  const upiUri = `upi://pay?pa=praveenonline17@okicici&pn=Balaji%20Electricals&am=${cartMetrics.grandTotal}&cu=INR&tn=Bill%20${invoiceNumber}`;
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    upiUri
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-red-600 selection:text-white">
      {/* ================= TOP ANNOUNCEMENT & LOCATION BAR ================= */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mon–Sat: 9 AM – 9 PM | Sun: 9 AM – 1:30 PM
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              NH-44 Bye-Pass, Kalangani, Namakkal
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] sm:text-xs">
            <a
              href="tel:+919442190934"
              className="flex items-center gap-1.5 text-slate-200 hover:text-red-400 font-medium transition"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" /> +91 94421 90934
            </a>
            <a
              href="tel:+919789776313"
              className="hidden sm:flex items-center gap-1 text-slate-200 hover:text-red-400 font-medium transition"
            >
              +91 97897 76313
            </a>
            <span className="text-slate-700">|</span>

            {/* Mode Switcher: Shop vs Admin matching screenshot */}
            <div className="flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded-full border border-slate-800">
              <button
                onClick={() => setActiveMode('customer')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition ${
                  activeMode === 'customer'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => setActiveMode('admin')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition ${
                  activeMode === 'admin'
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STICKY BRAND HEADER ================= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Identity matching exact screenshot */}
          <div
            onClick={() => scrollToId('catalogSection')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <BalajiLogo />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  BALAJI <span className="text-red-600">ELECTRICALS</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-200">
                  NAMAKKAL
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight mt-1">
                Powering Homes, Farms &amp; Industries with Trusted Electricals
              </p>
            </div>
          </div>

          {/* Interactive Search Bar Trigger */}
          <div className="hidden xl:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Finolex wire, C.R.I. pump, Schneider MCB..."
                className="w-full pl-10 pr-16 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono hover:bg-slate-300"
                >
                  Ctrl+K
                </button>
              )}
            </div>
          </div>

          {/* Header Action Buttons matching screenshot + Load Calculator */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Chat Button */}
            <a
              href="https://wa.me/919442190934?text=Hello%20Balaji%20Electricals,%20I%20have%20an%20inquiry%20regarding%20electrical%20supplies"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Book Electrician Button */}
            <button
              onClick={() => scrollToId('electricianSection')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              <Wrench className="w-4 h-4 text-red-600" />
              <span>Book Electrician</span>
            </button>

            {/* Smart Wire & Load Calculator Button */}
            <button
              onClick={() => setIsLoadCalcOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition"
              title="Smart Electrical Load & Wire Calculator"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">Load Calc</span>
            </button>

            {/* Slide-Out Cart Button matching screenshot */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white transition flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              <span className="bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartMetrics.totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Category Ribbon Bar */}
        <nav className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-2 gap-2 no-scrollbar">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    scrollToId('catalogSection');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Contractor Bulk Pricing Toggle */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 whitespace-nowrap">
              <label className="flex items-center gap-2 cursor-pointer text-[11px] font-semibold text-amber-400">
                <input
                  type="checkbox"
                  checked={bulkPricingMode}
                  onChange={(e) => {
                    setBulkPricingMode(e.target.checked);
                    addToast(
                      e.target.checked
                        ? 'Contractor Wholesale Rates Activated!'
                        : 'Switched to Standard Retail Pricing',
                      'info'
                    );
                  }}
                  className="rounded text-red-600 focus:ring-red-600"
                />
                <span>Contractor Bulk Rates</span>
              </label>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MAIN VIEW SWITCHER ================= */}
      {activeMode === 'customer' ? (
        <main className="flex-1 print:hidden">
          {/* ================= HERO SECTION ================= */}
          <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-10 lg:py-14 px-4 sm:px-6 relative overflow-hidden border-b border-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>Authorized Stockist: Finolex • Schneider • C.R.I. Pumps • Legrand</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  100% Genuine Electricals at{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-amber-500">
                    Kalangani NH-44 Bypass.
                  </span>
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Supplying ISI-certified Flame Guard house wires, industrial MCB switchgears, high-head C.R.I. agricultural &amp; domestic pumps, and rigid PVC conduits for homes, poultry farms, and contractors across Namakkal.
                </p>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollToId('catalogSection')}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition transform active:scale-95"
                  >
                    <Package className="w-4 h-4" />
                    <span>Explore Store Catalog</span>
                  </button>

                  <button
                    onClick={() => setIsLoadCalcOpen(true)}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition shadow-md"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Smart Wire &amp; Load Calculator</span>
                  </button>

                  <button
                    onClick={() => scrollToId('locationSection')}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>Store Map</span>
                  </button>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-800/80 text-xs">
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-extrabold block">Free Delivery</span>
                    <span className="text-[11px] text-slate-400">Orders &gt; ₹10,000 (5 km)</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-extrabold block">GST Billing</span>
                    <span className="text-[11px] text-slate-400">33BIBPR8021G1ZH</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-red-400 font-extrabold block">Direct UPI Pay</span>
                    <span className="text-[11px] text-slate-400">Instant QR Checkout</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-blue-400 font-extrabold block">On-Call Wiremen</span>
                    <span className="text-[11px] text-slate-400">Doorstep Installation</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Card: Quick Store Dispatch & WhatsApp List */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                        Express Counter &amp; Van Dispatch
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        Balaji Electricals — Kalangani
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Open
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>
                        7/149, Main Road (NH-44 Salem - Namakkal Bye-Pass), Kalangani, Namakkal - 637014
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="font-mono font-bold text-white">
                        +91 94421 90934 / +91 97897 76313
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Mon – Sat: 9:00 AM – 9:00 PM | Sun: Half Day</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Have a handwritten electrician material slip?</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Send a photo of your building wiring or borewell motor material list on WhatsApp for wholesale contractor pricing.
                    </p>
                    <a
                      href="https://wa.me/919442190934?text=Hello%20Balaji%20Electricals,%20I%20want%20to%20share%20my%20electrical%20material%20list%20for%20quotation."
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Material List on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= AUTHORIZED BRANDS RIBBON ================= */}
          <section className="bg-white border-b border-slate-200 py-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Click Brand to Filter:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition border ${
                      selectedBrand === brand
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-red-600 hover:text-red-600'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ================= PRODUCT CATALOG SECTION ================= */}
          <section id="catalogSection" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            {/* Filter Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-8 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Authorized Store Inventory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing <strong>{filteredProducts.length}</strong> genuine items • Prices inclusive of 18% GST
                  </p>
                </div>

                {/* Mobile Search & Sort Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative lg:hidden flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search items..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>

                  {/* Price Slider */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-600">
                      Max: ₹{maxPrice.toLocaleString('en-IN')}
                    </span>
                    <input
                      type="range"
                      min="100"
                      max="12000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-24 accent-red-600 cursor-pointer"
                    />
                  </div>

                  {/* In-Stock Checkbox */}
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span>In-Stock</span>
                  </label>

                  {/* Sort Select */}
                  <div className="flex items-center gap-1.5">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="discount">Highest Discount</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips */}
              {(selectedCategory !== 'All Categories' ||
                selectedBrand !== 'All' ||
                searchQuery ||
                maxPrice < 12000) && (
                <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 font-semibold">Active Filters:</span>
                  {selectedCategory !== 'All Categories' && (
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold flex items-center gap-1">
                      {selectedCategory}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategory('All Categories')}
                      />
                    </span>
                  )}
                  {selectedBrand !== 'All' && (
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white font-bold flex items-center gap-1">
                      {selectedBrand}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedBrand('All')}
                      />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold flex items-center gap-1">
                      &ldquo;{searchQuery}&rdquo;
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSearchQuery('')}
                      />
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setSelectedBrand('All');
                      setSearchQuery('');
                      setMaxPrice(12000);
                      setInStockOnly(false);
                    }}
                    className="text-red-600 font-bold hover:underline ml-auto"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">
                  No matching electrical supplies found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your brand or price filters, or message us directly on WhatsApp for custom items.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSelectedBrand('All');
                    setSearchQuery('');
                    setMaxPrice(12000);
                  }}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((item) => {
                  const displayPrice = bulkPricingMode ? item.bulkPrice : item.price;
                  const discountPct = Math.round(
                    ((item.mrp - displayPrice) / item.mrp) * 100
                  );
                  const isSaved = wishlist.includes(item.id);
                  const isCompared = compareList.some((c) => c.id === item.id);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      <div>
                        {/* Image Header */}
                        <div className="relative h-48 bg-slate-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            onClick={() => setQuickViewProduct(item)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          />
                          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                            <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-extrabold uppercase tracking-wider">
                              {item.brand}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold shadow-xs">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Wishlist & Compare Floating Buttons */}
                          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                            <button
                              onClick={() => toggleWishlist(item.id)}
                              className={`p-1.5 rounded-full backdrop-blur-md transition ${
                                isSaved
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white/90 text-slate-700 hover:text-red-600'
                              }`}
                              title="Save to Wishlist"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => toggleCompare(item)}
                              className={`p-1.5 rounded-full backdrop-blur-md transition ${
                                isCompared
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-white/90 text-slate-700 hover:text-amber-600'
                              }`}
                              title="Compare Specs"
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold">
                            {discountPct}% OFF
                          </span>

                          <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/75 text-white text-[10px] font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span>
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                            <span>{item.category}</span>
                            <span className="font-mono text-slate-500">{item.isiCode}</span>
                          </div>

                          <h3
                            onClick={() => setQuickViewProduct(item)}
                            className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-red-600 cursor-pointer transition"
                          >
                            {item.name}
                          </h3>

                          <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono truncate">
                            ⚡ {item.specs}
                          </p>
                        </div>
                      </div>

                      {/* Price & Action Footer */}
                      <div className="p-4 pt-0 space-y-3">
                        <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-black text-slate-900">
                                ₹{displayPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-slate-400 line-through">
                                ₹{item.mrp.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="text-[10px] text-emerald-700 font-bold">
                              Bulk ({item.bulkMinQty}+): ₹{item.bulkPrice}/unit
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.stock > 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={() => setQuickViewProduct(item)}
                            className="col-span-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition"
                            title="Technical Specs"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(item, 1)}
                            disabled={item.stock <= 0}
                            className="col-span-3 py-2 rounded-xl bg-slate-900 hover:bg-red-600 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ================= ON-DEMAND ELECTRICIAN BOOKING SECTION ================= */}
          <section
            id="electricianSection"
            className="bg-slate-900 text-white py-14 px-4 sm:px-6 border-t border-slate-800"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Doorstep Technical Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2">
                  Book a Certified Electrician in Namakkal
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Transparent labor charges for fan installations, MCB trip repairs, C.R.I. borewell starter wiring, and full house rewiring estimates.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Service Picker Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ELECTRICIAN_SERVICES.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                          isSelected
                            ? 'bg-slate-800 border-red-500 shadow-lg'
                            : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/30">
                            {srv.badge}
                          </span>
                          <span className="text-base font-black text-amber-400">
                            {srv.rate > 0 ? `₹${srv.rate}` : 'FREE'}
                            <span className="text-[10px] text-slate-400 font-normal ml-1">
                              {srv.unit}
                            </span>
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Booking Form */}
                <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200">
                  <h3 className="text-base font-black flex items-center gap-2 mb-1">
                    <UserCheck className="w-5 h-5 text-red-600" />
                    <span>Schedule Technician Visit</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Instant confirmation via Balaji Electricals WhatsApp desk.
                  </p>

                  <form onSubmit={handleElectricianBooking} className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-red-700 block">
                          Selected Service
                        </span>
                        <strong className="text-slate-900">{selectedService.title}</strong>
                      </div>
                      {selectedService.rate > 0 && (
                        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-red-200">
                          <span className="text-[10px] font-bold text-slate-500">Qty:</span>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={serviceUnits}
                            onChange={(e) =>
                              setServiceUnits(Math.max(1, Number(e.target.value)))
                            }
                            className="w-10 text-center font-bold text-slate-900 focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={bookingForm.name}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, name: e.target.value })
                          }
                          className="w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit Mobile"
                          value={bookingForm.phone}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, phone: e.target.value })
                          }
                          className="w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Site / Home Address in Namakkal *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Door No, Street, Village / Kalangani Landmark"
                        value={bookingForm.address}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, address: e.target.value })
                        }
                        className="w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, date: e.target.value })
                          }
                          className="w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Time Slot
                        </label>
                        <select
                          value={bookingForm.slot}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, slot: e.target.value })
                          }
                          className="w-full py-2 px-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-semibold"
                        >
                          <option>Morning (09:00 AM - 01:00 PM)</option>
                          <option>Afternoon (01:00 PM - 05:00 PM)</option>
                          <option>Evening (05:00 PM - 08:30 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600 font-medium">
                        Estimated Labor Charge:
                      </span>
                      <span className="text-base font-black text-red-600">
                        {selectedService.rate > 0
                          ? `₹${(selectedService.rate * serviceUnits).toLocaleString(
                              'en-IN'
                            )}`
                          : 'Free Site Estimate'}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book Electrician via WhatsApp</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ================= STORE LOCATION & GOOGLE MAPS SECTION ================= */}
          <section id="locationSection" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    <MapPin className="w-3.5 h-3.5" /> NH-44 Bypass Counter
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Visit Balaji Electricals
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Located directly on the Salem–Namakkal NH-44 Highway Bypass at Kalangani. Easy loading bay access for farm vehicles, tempos, and site pickups.
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-50 text-red-600 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Store Address</strong>
                        <span className="text-slate-600">
                          7/149, Main Road (NH-44 Salem - Namakkal Bye-Pass), Kalangani, Namakkal - 637014
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Mobile &amp; WhatsApp</strong>
                        <a
                          href="tel:+919442190934"
                          className="text-red-600 font-bold hover:underline"
                        >
                          94421 90934
                        </a>{' '}
                        /{' '}
                        <a
                          href="tel:+919789776313"
                          className="text-red-600 font-bold hover:underline"
                        >
                          97897 76313
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Email Address</strong>
                        <a
                          href="mailto:praveensekarraj@gmail.com"
                          className="text-slate-600 hover:text-red-600"
                        >
                          praveensekarraj@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/W2iNoYMso1KiQxtm9"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-slate-900 hover:bg-red-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Exact Location in Google Maps</span>
                </a>
              </div>

              <div className="lg:col-span-7 min-h-[340px] bg-slate-100">
                <iframe
                  title="Balaji Electricals Kalangani Namakkal Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15654.55106192138!2d78.1400!3d11.2800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babb0c910243bc3%3A0x6bfa3e8519a844!2sKalangani%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full min-h-[340px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ================= STORE MANAGER ADMIN CONSOLE ================= */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 print:hidden">
          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                Store Owner Console
              </span>
              <h2 className="text-2xl font-black mt-0.5">
                Balaji Electricals — Inventory &amp; Rate Manager
              </h2>
              <p className="text-xs text-slate-400">
                Changes saved automatically to browser storage • GSTIN: 33BIBPR8021G1ZH
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={resetCatalogToDefault}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Data
              </button>
              <button
                onClick={() => setActiveMode('customer')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Back to Storefront
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add New SKU Form */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-red-600" /> Add New Product to Catalog
              </h3>
              <form onSubmit={handleAddAdminProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Finolex 6.0 sq mm Main Wire"
                    value={newSku.name}
                    onChange={(e) => setNewSku({ ...newSku, name: e.target.value })}
                    className="w-full py-2 px-3 border border-slate-300 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Brand</label>
                    <select
                      value={newSku.brand}
                      onChange={(e) => setNewSku({ ...newSku, brand: e.target.value })}
                      className="w-full py-2 px-2 border border-slate-300 rounded-xl font-semibold"
                    >
                      {BRANDS.filter((b) => b !== 'All').map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Category
                    </label>
                    <select
                      value={newSku.category}
                      onChange={(e) =>
                        setNewSku({ ...newSku, category: e.target.value })
                      }
                      className="w-full py-2 px-2 border border-slate-300 rounded-xl font-semibold"
                    >
                      {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Selling ₹ *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="1850"
                      value={newSku.price}
                      onChange={(e) => setNewSku({ ...newSku, price: e.target.value })}
                      className="w-full py-2 px-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">MRP ₹</label>
                    <input
                      type="number"
                      placeholder="2250"
                      value={newSku.mrp}
                      onChange={(e) => setNewSku({ ...newSku, mrp: e.target.value })}
                      className="w-full py-2 px-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Stock</label>
                    <input
                      type="number"
                      value={newSku.stock}
                      onChange={(e) => setNewSku({ ...newSku, stock: e.target.value })}
                      className="w-full py-2 px-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Technical Specification
                  </label>
                  <input
                    type="text"
                    placeholder="1100V • 90m Coil • Pure Copper"
                    value={newSku.specs}
                    onChange={(e) => setNewSku({ ...newSku, specs: e.target.value })}
                    className="w-full py-2 px-3 border border-slate-300 rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
                >
                  Publish Product to Catalog
                </button>
              </form>
            </div>

            {/* Live Stock & Price Table */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
              <h3 className="text-sm font-black text-slate-900 mb-4">
                Active Store SKUs ({products.length})
              </h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase">
                    <th className="pb-2.5">Item</th>
                    <th className="pb-2.5">Brand</th>
                    <th className="pb-2.5">Retail ₹</th>
                    <th className="pb-2.5">Stock</th>
                    <th className="pb-2.5 text-right">Quick Adjust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                      </td>
                      <td className="py-3 font-semibold text-slate-700">{p.brand}</td>
                      <td className="py-3 font-black text-slate-900">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock > 5
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => adjustProductStock(p.id, 10)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold text-[10px]"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => adjustProductStock(p.id, -5)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold text-[10px]"
                        >
                          -5
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ================= COMPARE FLOATING BAR ================= */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 text-xs print:hidden">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-bold">
              Comparing {compareList.length}/3 Products
            </span>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 font-bold"
          >
            Compare Specs
          </button>
          <button
            onClick={() => setCompareList([])}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ================= SMART ELECTRICAL LOAD & WIRE CALCULATOR MODAL ================= */}
      {isLoadCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Smart Electrical Load &amp; Finolex Wire Gauge Calculator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select your room or farm appliances to calculate safe MCB &amp; Copper Wire size
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLoadCalcOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Appliance Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { key: 'fans', label: 'Ceiling Fans (65W)', icon: '🌀' },
                { key: 'ledLights', label: 'LED Lights (20W)', icon: '💡' },
                { key: 'tvFridge', label: 'Fridge / TV (250W)', icon: '📺' },
                { key: 'ac15Ton', label: '1.5 Ton Split AC (1600W)', icon: '❄️' },
                { key: 'geyser2kW', label: 'Water Heater (2000W)', icon: '🚿' },
                { key: 'criPump1HP', label: 'C.R.I. 1HP Pump (750W)', icon: '💧' }
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <span className="font-bold text-slate-700">
                    {item.icon} {item.label}
                  </span>
                  <div className="flex items-center justify-between mt-3 bg-white rounded-lg border border-slate-200 px-2 py-1">
                    <button
                      onClick={() =>
                        setAppliances({
                          ...appliances,
                          [item.key]: Math.max(0, appliances[item.key] - 1)
                        })
                      }
                      className="font-black text-slate-600 px-1.5"
                    >
                      -
                    </button>
                    <span className="font-black text-slate-900">
                      {appliances[item.key]}
                    </span>
                    <button
                      onClick={() =>
                        setAppliances({
                          ...appliances,
                          [item.key]: appliances[item.key] + 1
                        })
                      }
                      className="font-black text-red-600 px-1.5"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculated Recommendation Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">
                    Total Connected Load
                  </span>
                  <span className="text-lg font-black text-amber-400">
                    {loadAnalysis.watts} W
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">
                    Current Draw (230V)
                  </span>
                  <span className="text-lg font-black text-white">
                    {loadAnalysis.amps} Amps
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">
                    Safety Margin (125%)
                  </span>
                  <span className="text-lg font-black text-emerald-400">
                    {loadAnalysis.safetyAmps} Amps
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Recommended Finolex Wire:</span>
                  <strong className="text-amber-300">{loadAnalysis.wireGauge}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Recommended Schneider Protection:</span>
                  <strong className="text-emerald-300">{loadAnalysis.mcbRating}</strong>
                </div>
              </div>

              <button
                onClick={addRecommendedKitToCart}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Recommended Wire &amp; MCB Kit to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCT QUICK-VIEW MODAL ================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-64 object-cover rounded-2xl border border-slate-200"
                />
                <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold">ISI Standard</span>
                    <strong className="text-slate-800">{quickViewProduct.isiCode}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold">Voltage Grade</span>
                    <strong className="text-slate-800">
                      {quickViewProduct.voltageGrade}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase">
                    {quickViewProduct.brand}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{quickViewProduct.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                    Contractor Bulk Price ({quickViewProduct.bulkMinQty}+ units): ₹
                    {quickViewProduct.bulkPrice}/unit
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                    <strong>Electrician Note:</strong> {quickViewProduct.application}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add 1 Unit</span>
                  </button>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewProduct.bulkMinQty || 5);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs"
                  >
                    Add Bulk ({quickViewProduct.bulkMinQty}+)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCT COMPARISON MODAL ================= */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-base font-black text-slate-900">
                Side-by-Side Technical Comparison
              </h3>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 pr-4 text-slate-400">Attribute</th>
                    {compareList.map((item) => (
                      <th key={item.id} className="py-2 px-3 font-black text-slate-900">
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">Brand</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2.5 px-3 font-semibold">
                        {item.brand}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">Retail Price</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2.5 px-3 font-black text-red-600">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">Bulk Rate</td>
                    {compareList.map((item) => (
                      <td
                        key={item.id}
                        className="py-2.5 px-3 font-bold text-emerald-700"
                      >
                        ₹{item.bulkPrice} (Min {item.bulkMinQty})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">ISI / Standard</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2.5 px-3 font-mono">
                        {item.isiCode}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">Specifications</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2.5 px-3 text-slate-600">
                        {item.specs}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= CTRL+K QUICK SEARCH MODAL ================= */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4 print:hidden">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center gap-2">
              <Search className="w-4 h-4 text-red-600" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type product name, Finolex, C.R.I., MCB, 2.5 sq mm..."
                className="w-full text-xs font-semibold focus:outline-none"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono"
              >
                ESC
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
              {filteredProducts.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setQuickViewProduct(p);
                    setIsSearchModalOpen(false);
                  }}
                  className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.brand}</div>
                  </div>
                  <span className="font-black text-red-600">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OUT REACTIVE CART DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end print:hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />
          <aside className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
            {/* Cart Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-slate-900 text-sm">
                  Your Order Basket ({cartMetrics.totalItems})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Delivery Progress Bar (₹10,000 Threshold) */}
            <div className="px-4 py-2.5 bg-red-50 border-b border-red-100 text-xs">
              <div className="flex justify-between font-bold mb-1">
                {cartMetrics.isFreeDelivery ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Free Local Site Delivery Unlocked! (Within 5 km)
                  </span>
                ) : (
                  <span className="text-slate-700">
                    Add ₹
                    {(
                      cartMetrics.freeDeliveryThreshold - cartMetrics.grandTotal
                    ).toLocaleString('en-IN')}{' '}
                    more for Free Delivery
                  </span>
                )}
                <span className="text-red-600">{cartMetrics.deliveryProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-red-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    cartMetrics.isFreeDelivery ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${cartMetrics.deliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Your cart is empty</p>
                  <p className="text-[11px] text-slate-400">
                    Add Finolex cables, Schneider MCBs, or C.R.I. pumps to get started.
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const unitRate = getEffectiveUnitPrice(item);
                  const isBulkApplied = unitRate < item.price;
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs font-black text-red-600">
                            ₹{(unitRate * item.qty).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (₹{unitRate}/ea)
                          </span>
                          {isBulkApplied && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                              Bulk Rate
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center border border-slate-300 rounded-lg bg-white text-xs font-bold">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="px-2 py-1 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="px-2 py-1 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer Summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 text-xs">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (Try BALAJI5)"
                    className="flex-1 py-1.5 px-3 border border-slate-300 rounded-lg uppercase text-xs"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-1 text-slate-600 pt-1">
                  <div className="flex justify-between">
                    <span>Taxable Value</span>
                    <span>₹{cartMetrics.taxableValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST (9%) + SGST (9%)</span>
                    <span>
                      ₹{(cartMetrics.cgst + cartMetrics.sgst).toLocaleString('en-IN')}
                    </span>
                  </div>
                  {cartMetrics.couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Coupon Discount (5%)</span>
                      <span>-₹{cartMetrics.couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Grand Total</span>
                    <span className="text-red-600 text-base">
                      ₹{cartMetrics.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={sendWhatsAppOrder}
                    className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Order</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsInvoiceModalOpen(true);
                    }}
                    className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1.5 shadow"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>GST Bill &amp; UPI Pay</span>
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= GST TAX INVOICE & DYNAMIC UPI QR MODAL ================= */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 print:hidden">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  GST Tax Invoice &amp; Instant UPI QR Payment
                </h3>
                <p className="text-xs text-slate-500">
                  Enter optional customer details below before printing or paying via UPI
                </p>
              </div>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Input Form (Hidden on Print) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs print:hidden">
              <input
                type="text"
                placeholder="Customer / Business Name"
                value={buyerDetails.name}
                onChange={(e) =>
                  setBuyerDetails({ ...buyerDetails, name: e.target.value })
                }
                className="py-2 px-3 border border-slate-300 rounded-xl"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={buyerDetails.phone}
                onChange={(e) =>
                  setBuyerDetails({ ...buyerDetails, phone: e.target.value })
                }
                className="py-2 px-3 border border-slate-300 rounded-xl"
              />
              <input
                type="text"
                placeholder="Customer GSTIN (Optional)"
                value={buyerDetails.gstin}
                onChange={(e) =>
                  setBuyerDetails({
                    ...buyerDetails,
                    gstin: e.target.value.toUpperCase()
                  })
                }
                className="py-2 px-3 border border-slate-300 rounded-xl uppercase font-mono"
              />
            </div>

            {/* Printable Official GST Invoice Area */}
            <div className="border-2 border-slate-900 rounded-2xl p-5 space-y-4 text-xs">
              <div className="flex flex-wrap justify-between items-start gap-4 border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <BalajiLogo />
                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      BALAJI ELECTRICALS
                    </h2>
                    <p className="text-[11px] text-slate-600">
                      7/149, Main Road (NH-44 Salem - Namakkal Bye-Pass)
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Kalangani, Namakkal - 637014, Tamil Nadu
                    </p>
                    <p className="text-[11px] font-bold text-red-600 mt-0.5">
                      GSTIN: 33BIBPR8021G1ZH | Mob: 94421 90934, 97897 76313
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="px-2 py-0.5 bg-slate-900 text-white font-bold text-[10px] rounded">
                    TAX INVOICE
                  </span>
                  <div className="font-bold text-slate-900 mt-1">{invoiceNumber}</div>
                  <div className="text-[11px] text-slate-500">
                    Date: {new Date().toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Billed To Row */}
              <div className="flex flex-wrap justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px]">
                <div>
                  <strong>Billed To:</strong>{' '}
                  {buyerDetails.name || 'Walk-in / Site Customer'}{' '}
                  {buyerDetails.phone && `(${buyerDetails.phone})`}
                </div>
                <div>
                  <strong>Buyer GSTIN:</strong>{' '}
                  <span className="font-mono">
                    {buyerDetails.gstin || 'Unregistered Consumer'}
                  </span>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px]">
                    <th className="py-1.5">Description</th>
                    <th className="py-1.5 text-center">Qty</th>
                    <th className="py-1.5 text-right">Unit Rate</th>
                    <th className="py-1.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cart.map((item) => {
                    const rate = getEffectiveUnitPrice(item);
                    return (
                      <tr key={item.id}>
                        <td className="py-2 font-semibold text-slate-900">
                          {item.name}
                        </td>
                        <td className="py-2 text-center font-mono">{item.qty}</td>
                        <td className="py-2 text-right font-mono">
                          ₹{rate.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 text-right font-mono font-bold">
                          ₹{(rate * item.qty).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Tax Breakdown & UPI QR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t-2 border-slate-900 items-center">
                <div className="flex items-center gap-3 bg-red-50/70 p-3 rounded-xl border border-red-200">
                  <img
                    src={upiQrUrl}
                    alt="Balaji Electricals UPI QR"
                    className="w-24 h-24 rounded-lg border border-slate-300 bg-white p-1"
                  />
                  <div className="space-y-1 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[9px] uppercase">
                      Scan &amp; Pay via UPI
                    </span>
                    <div className="font-bold text-slate-900">BALAJI ELECTRICALS</div>
                    <div className="font-mono text-slate-700">
                      praveenonline17@okicici
                    </div>
                    <div className="text-[10px] text-slate-500">
                      GPay • PhonePe • Paytm
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-right font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Subtotal:</span>
                    <span>₹{cartMetrics.taxableValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>CGST (9%):</span>
                    <span>₹{cartMetrics.cgst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SGST (9%):</span>
                    <span>₹{cartMetrics.sgst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-300 pt-1.5">
                    <span>Net Payable:</span>
                    <span className="text-red-600">
                      ₹{cartMetrics.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-2.5 justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF Invoice
              </button>
              <button
                onClick={sendWhatsAppOrder}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> Confirm Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <BalajiLogo />
              <span className="text-white font-black text-base">
                BALAJI ELECTRICALS
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Powering Homes, Farms &amp; Industries with Trusted Electricals. Authorized retailer &amp; wholesaler at Kalangani, Namakkal.
            </p>
            <div className="font-mono text-[11px] text-slate-300">
              GSTIN: <strong>33BIBPR8021G1ZH</strong>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Authorized Brands
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Finolex Cables &amp; Flame Guard Wires</li>
              <li>Schneider Electric MCBs &amp; Switchgear</li>
              <li>C.R.I. Agricultural &amp; Monoblock Pumps</li>
              <li>Finolex Heavy Duty PVC Conduits</li>
              <li>Legrand Modular Switches &amp; Sockets</li>
              <li>Philips LED Luminaires &amp; Crompton Fans</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Delivery &amp; Payment
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-emerald-400 font-semibold">
                Free Delivery &gt; ₹10,000 (Within 5 km)
              </li>
              <li>Same-Day Site Dispatch across Namakkal</li>
              <li>UPI ID: praveenonline17@okicici</li>
              <li> Mon–Sat: 9:00 AM – 9:00 PM | Sun: Half Day</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Store Contact
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              7/149, Main Road (NH-44 Salem - Namakkal Bye-Pass), Kalangani, Namakkal - 637014
            </p>
            <p className="mt-2 text-white font-mono font-bold">
              Ph: 94421 90934 / 97897 76313
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Email: praveensekarraj@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Balaji Electricals, Kalangani, Namakkal. All rights reserved.
        </div>
      </footer>

      {/* ================= TOAST NOTIFICATIONS ================= */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none print:hidden">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 flex items-center gap-2 pointer-events-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}