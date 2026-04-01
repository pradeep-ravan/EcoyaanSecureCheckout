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

  // Hydration phase
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('checkout_cart');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedAddresses = localStorage.getItem('checkout_addresses');
      let parsedAddresses: ShippingAddress[] = [];
      if (savedAddresses) {
        parsedAddresses = JSON.parse(savedAddresses);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAddresses(parsedAddresses);
      }

      const savedAddress = localStorage.getItem('checkout_selected_address');
      if (savedAddress) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAddress(JSON.parse(savedAddress));
      } else if (parsedAddresses.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAddress(parsedAddresses[0]);
      }
    } catch (e) {
      console.error("Failed to load checkout state from localStorage", e);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

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

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
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

  return (
    <CheckoutContext.Provider value={{
      cartItems, setCartItems,
      shippingFee, setShippingFee,
      discountApplied, setDiscountApplied,
      address, setAddress,
      addresses, setAddresses,
      subtotal, grandTotal,
      updateQuantity, removeItem,
      isHydrated
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
