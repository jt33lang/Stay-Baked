import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  quantity: number;
  setQuantity: (qty: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <CartContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
