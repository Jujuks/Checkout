'use client';

import React from 'react';

interface CartItem {
  id: number;
  name: string;
  ref: string;
  color: string;
  qty: number;
  price: number;
  img: string;
}

interface CartPanelProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  subtotal: number;
}

export default function CartPanel({ cartItems, updateQuantity, removeItem, subtotal }: CartPanelProps) {
  return (
    <div className="flex-[1.5] p-12 flex flex-col relative overflow-y-auto">
      {/* Cabecera */}
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-8 h-8 flex items-center justify-center text-xl font-bold bg-transparent">
          <span className="border-l-2 border-b-2 border-black rounded-full w-full h-full flex items-center justify-center -rotate-45">
            <span className="rotate-45">O</span>
          </span>
        </div>
        <h1 className="text-2xl text-gray-500 font-light">Your Shopping Cart</h1>
      </div>

      {/* Lista de Productos */}
      <div className="flex-1 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2">
            <div className="flex items-center w-[40%] space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-gray-100">
                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">{item.name}</p>
                <p className="text-xs text-gray-400 mt-1">Ref. {item.ref}</p>
              </div>
            </div>

            <div className="w-[15%] text-gray-500 text-sm">{item.color}</div>

            <div className="w-[15%] flex items-center space-x-3 text-gray-700 font-medium">
              <span>{item.qty}</span>
              <div className="flex flex-col space-y-1">
                <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-300 transition">+</button>
                <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-300 transition">-</button>
              </div>
            </div>

            <div className="w-[20%] text-gray-700 font-medium text-sm">
              {(item.price * item.qty).toFixed(2)} NGN
            </div>

            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition px-2 text-lg">✕</button>
          </div>
        ))}
        
        {cartItems.length === 0 && (
          <p className="text-center text-gray-400 mt-10">Your cart is empty.</p>
        )}
      </div>

      {/* Pie del Carrito */}
      <div className="mt-8 pt-8 flex items-center justify-between border-t border-gray-200">
        <button className="flex items-center text-gray-500 hover:text-gray-800 transition text-sm">
          <span className="mr-4">←</span> Back to Shop
        </button>
        <div className="flex items-center space-x-12">
          <span className="text-gray-500 text-sm">Subtotal:</span>
          <span className="text-xl font-bold text-gray-800">{subtotal.toFixed(2)} NGN</span>
        </div>
      </div>
    </div>
  );
}