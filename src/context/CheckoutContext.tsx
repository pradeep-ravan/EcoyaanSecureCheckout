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
  address: ShippingAddress;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  subtotal: number;
  grandTotal: number;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children, initialCartItems = [], initialShippingFee = 0, initialDiscount = 0 }: { 
  children: ReactNode, 
  initialCartItems?: CartItem[], 
  initialShippingFee?: number, 
  initialDiscount?: number 
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [shippingFee, setShippingFee] = useState(initialShippingFee);
  const [discountApplied, setDiscountApplied] = useState(initialDiscount);
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    pinCode: '',
    city: '',
    state: ''
  });

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
      subtotal, grandTotal,
      updateQuantity, removeItem
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
