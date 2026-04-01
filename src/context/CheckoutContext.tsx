'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CartItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
};

export type ShippingAddress = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
};

export type ThemeColor = 'emerald' | 'blue' | 'violet' | 'rose' | 'amber';

const themePalettes: Record<ThemeColor, Record<string, string>> = {
  emerald: {
    '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', '400': '#34d399',
    '500': '#10b981', '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b',
  },
  blue: {
    '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd', '400': '#60a5fa',
    '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a',
  },
  violet: {
    '50': '#f5f3ff', '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd', '400': '#a78bfa',
    '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9', '800': '#5b21b6', '900': '#4c1d95',
  },
  rose: {
    '50': '#fff1f2', '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af', '400': '#fb7185',
    '500': '#f43f5e', '600': '#e11d48', '700': '#be123c', '800': '#9f1239', '900': '#881337',
  },
  amber: {
    '50': '#amber-50', '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d', '400': '#fbbf24',
    '500': '#f59e0b', '600': '#d97706', '700': '#b45309', '800': '#92400e', '900': '#78350f',
  }
};
// Fix amber 50 value
themePalettes.amber['50'] = '#fffbeb';

interface CheckoutContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  shippingFee: number;
  setShippingFee: React.Dispatch<React.SetStateAction<number>>;
  discountApplied: number;
  setDiscountApplied: React.Dispatch<React.SetStateAction<number>>;
  
  // Active/selected address for checkout
  address: ShippingAddress;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  
  // List of all saved addresses
  addresses: ShippingAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<ShippingAddress[]>>;
  
  subtotal: number;
  grandTotal: number;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  isHydrated: boolean;

  // Theme Color
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const emptyAddress: ShippingAddress = {
  id: '',
  fullName: '',
  email: '',
  phone: '',
  pinCode: '',
  city: '',
  state: ''
};

export function CheckoutProvider({ children, initialCartItems = [], initialShippingFee = 0, initialDiscount = 0 }: { 
  children: ReactNode, 
  initialCartItems?: CartItem[], 
  initialShippingFee?: number, 
  initialDiscount?: number 
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [shippingFee, setShippingFee] = useState(initialShippingFee);
  const [discountApplied, setDiscountApplied] = useState(initialDiscount);
  
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [themeColor, setThemeColorState] = useState<ThemeColor>('emerald');

  // Hydration phase
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('checkout_cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedAddresses = localStorage.getItem('checkout_addresses');
      let parsedAddresses: ShippingAddress[] = [];
      if (savedAddresses) {
        parsedAddresses = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses);
      }

      const savedAddress = localStorage.getItem('checkout_selected_address');
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      } else if (parsedAddresses.length > 0) {
        setAddress(parsedAddresses[0]);
      }

      const savedTheme = localStorage.getItem('checkout_theme_color') as ThemeColor;
      if (savedTheme && themePalettes[savedTheme]) {
        setThemeColorState(savedTheme);
      }
    } catch (e) {
      console.error("Failed to load checkout state from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Theme variable injection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const palette = themePalettes[themeColor];
    const root = document.documentElement;
    
    Object.entries(palette).forEach(([shade, value]) => {
      root.style.setProperty(`--primary-${shade}`, value);
    });
  }, [themeColor]);

  // Save to LocalStorage whenever critical values change (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('checkout_cart', JSON.stringify(cartItems));
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('checkout_addresses', JSON.stringify(addresses));
  }, [addresses, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('checkout_selected_address', JSON.stringify(address));
  }, [address, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('checkout_theme_color', themeColor);
  }, [themeColor, isHydrated]);

  // Calculate totals
  const subtotal = cartItems.reduce((total: number, item: CartItem) => total + item.product_price * item.quantity, 0);
  const grandTotal = subtotal + shippingFee - discountApplied;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product_id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product_id !== id));
  };

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  return (
    <CheckoutContext.Provider value={{
      cartItems, setCartItems,
      shippingFee, setShippingFee,
      discountApplied, setDiscountApplied,
      address, setAddress,
      addresses, setAddresses,
      subtotal, grandTotal,
      updateQuantity, removeItem,
      isHydrated,
      themeColor, setThemeColor
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
