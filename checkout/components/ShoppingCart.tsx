'use client';

import React, { useState } from 'react';
import CartPanel from './CartPanel';
import PaymentPanel from './PaymentPanel';

interface CartItem {
  id: number;
  name: string;
  ref: string;
  color: string;
  qty: number;
  price: number;
  img: string;
}

interface CardDetails {
  type: string;
  number: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export default function ShoppingCart() {
  const initialCartItems: CartItem[] = [
    { id: 1, name: 'Denim T-Shirt', ref: '007197456', color: 'Blue', qty: 2, price: 7500.00, img: '/Products/CamisetaBlue.png' },
    { id: 2, name: 'Denim Pants', ref: '011015233', color: 'Blue', qty: 3, price: 9000.00, img: '/Products/PantalonBlue.jpg' },
    { id: 3, name: 'Sony Smartwatch', ref: '004822981', color: 'Black', qty: 1, price: 24500.00, img: '/Products/Reloj.png' },
    { id: 4, name: 'Cognac Oxford', ref: '035772962', color: 'Brown', qty: 1, price: 4500.00, img: '/Products/Zapatos.png' },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    type: 'mastercard',
    number: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return { ...item, qty: newQty > 0 ? newQty : 1 }; 
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    console.log("Total:", subtotal);
    console.log("Datos:", cardDetails);
    alert(`¡Pago de ${subtotal.toFixed(2)} NGN procesado!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="w-full h-screen bg-[#f8f9fa] flex shadow-2xl overflow-hidden">
        {/* Aquí renderizamos nuestros componentes hijos y les pasamos las Props */}
        <CartPanel 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          removeItem={removeItem} 
          subtotal={subtotal} 
        />
        <PaymentPanel 
          cardDetails={cardDetails} 
          setCardDetails={setCardDetails} 
          handleInputChange={handleInputChange} 
          handleCheckout={handleCheckout}
          isExpanded={isPaymentExpanded}
          onToggleExpand={() => setIsPaymentExpanded(!isPaymentExpanded)}
        />
      </div>
    </div>
  );
}