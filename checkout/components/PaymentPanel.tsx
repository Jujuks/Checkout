'use client';

import React from 'react';

interface CardDetails {
  type: string;
  number: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

interface PaymentPanelProps {
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckout: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function PaymentPanel({ cardDetails, setCardDetails, handleInputChange, handleCheckout, isExpanded, onToggleExpand }: PaymentPanelProps) {
  return (
    <div className={`bg-[#323232] relative flex flex-col rounded-l-3xl shadow-[-15px_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${isExpanded ? 'flex-1' : 'w-16'}`}>
      
      {/* Botón para expandir/colapsar */}
      <button 
        onClick={onToggleExpand}
        className="absolute top-1/2 -left-4 z-10 w-8 h-16 bg-[#323232] rounded-l-lg flex items-center justify-center hover:bg-[#404040] transition-colors group"
        style={{ transform: 'translateY(-50%)' }}
      >
        <svg 
          className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`p-16 flex-1 flex flex-col transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <h2 className="text-[#fbd115] text-2xl font-normal mb-12">Card Details</h2>

        <div className="mb-12">
          <p className="text-gray-300 text-sm mb-6">Select Card Type</p>
          <div className="flex items-center space-x-6 cursor-pointer">
             <div 
                onClick={() => setCardDetails({...cardDetails, type: 'mastercard'})}
                className={`flex items-center transition-opacity ${cardDetails.type === 'mastercard' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
             >
                <div className="w-8 h-8 rounded-full bg-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 -ml-4 mix-blend-multiply"></div>
             </div>
             <span 
                onClick={() => setCardDetails({...cardDetails, type: 'visa'})}
                className={`font-bold italic tracking-wider text-lg transition-colors ${cardDetails.type === 'visa' ? 'text-white' : 'text-gray-500 hover:text-gray-400'}`}
             >
               VISA
             </span>
             <span 
                onClick={() => setCardDetails({...cardDetails, type: 'verve'})}
                className={`font-bold italic text-lg tracking-wide transition-colors ${cardDetails.type === 'verve' ? 'text-white' : 'text-gray-500 hover:text-gray-400'}`}
             >
               Verve
             </span>
          </div>
        </div>

        <div className="mb-10">
          <label className="text-gray-300 text-sm block mb-4">Card Number</label>
          <input 
            type="text" 
            name="number"
            value={cardDetails.number}
            onChange={handleInputChange}
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            className="w-full bg-transparent border-b border-gray-500 pb-2 text-white focus:outline-none focus:border-[#fbd115] transition-colors placeholder-gray-600 tracking-widest" 
          />
        </div>

        <div className="flex space-x-10 mb-8">
          <div className="flex-1">
            <label className="text-gray-300 text-sm block mb-4">Expiry Date</label>
            <div className="flex items-center text-gray-500">
              <input 
                type="text" 
                name="expMonth"
                value={cardDetails.expMonth}
                onChange={handleInputChange}
                maxLength={2} 
                placeholder="MM" 
                className="w-12 bg-transparent border-b border-gray-500 pb-1 text-center text-white focus:outline-none focus:border-[#fbd115] transition-colors placeholder-gray-600" 
              />
              <span className="mx-3">/</span>
              <input 
                type="text" 
                name="expYear"
                value={cardDetails.expYear}
                onChange={handleInputChange}
                maxLength={2} 
                placeholder="YY" 
                className="w-12 bg-transparent border-b border-gray-500 pb-1 text-center text-white focus:outline-none focus:border-[#fbd115] transition-colors placeholder-gray-600" 
              />
            </div>
          </div>
          <div className="w-1/3">
            <label className="text-gray-300 text-sm block mb-4">CVV</label>
            <input 
              type="password" 
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              maxLength={4} 
              className="w-full bg-transparent border-b border-gray-500 pb-2 text-white tracking-widest focus:outline-none focus:border-[#fbd115] transition-colors" 
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleCheckout}
        className={`w-full bg-[#fbd115] hover:bg-yellow-400 text-black py-8 text-lg font-medium transition duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible'}`}
      >
        Checkout
      </button>
    </div>
  );
}