'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  appType: 'vpn' | 'marketplace' | 'laptop' | 'createapp';
  children?: React.ReactNode;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const allChocolates = [
  {
    id: 1,
    name: 'Rochers noix de coco',
    price: '54.20 MAD',
    rating: 4.7,
    reviews: 155,
    image: '/noix-de-coco.png'
  },
  {
    id: 2,
    name: 'Ferrero Rocher Collection',
    price: '150.00 MAD',
    rating: 4.6,
    reviews: 407,
    image: '/rocher-collection.png'
  },
  {
    id: 3,
    name: 'Ferrero Rocher Dark',
    price: '165.00 MAD',
    rating: 4.8,
    reviews: 234,
    image: '/rocher-collection.png'
  },
  {
    id: 4,
    name: 'Ferrero Rocher White',
    price: '145.00 MAD',
    rating: 4.5,
    reviews: 189,
    image: '/rocher-collection.png'
  },
  {
    id: 5,
    name: 'Ferrero Rocher Hazelnut',
    price: '158.00 MAD',
    rating: 4.9,
    reviews: 312,
    image: '/rocher-collection.png'
  },
  {
    id: 6,
    name: 'Ferrero Rocher Almond',
    price: '162.00 MAD',
    rating: 4.7,
    reviews: 276,
    image: '/rocher-collection.png'
  }
];

export default function PhoneFrame({ appType, children }: PhoneFrameProps): JSX.Element {
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [currentView, setCurrentView] = useState<'home' | 'supermarket' | 'allChocolates' | 'cart'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutState, setCheckoutState] = useState<'cart' | 'payment' | 'success' | 'tracking'>('cart');
  const [isVpnConnected, setIsVpnConnected] = useState(false);
  const [sessionTime, setSessionTime] = useState("04:45");
  const [vpnScreen, setVpnScreen] = useState<'main' | 'servers'>('main');
  const [vpnCountry] = useState({ name: "United States", ping: "17 ms", flag: "" });

  const vpnServers = [
    { id: 1, name: "New York", ping: "12 ms", flag: "" },
    { id: 2, name: "Los Angeles", ping: "45 ms", flag: "" },
    { id: 3, name: "Chicago", ping: "28 ms", flag: "" },
    { id: 4, name: "Miami", ping: "33 ms", flag: "" },
    { id: 5, name: "Dallas", ping: "39 ms", flag: "" },
    { id: 6, name: "Seattle", ping: "51 ms", flag: "" },
    { id: 7, name: "Boston", ping: "15 ms", flag: "" },
    { id: 8, name: "Houston", ping: "42 ms", flag: "" },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVpnConnected) {
      const interval = setInterval(() => {
        setSessionTime(current => {
          const [minutes, seconds] = current.split(':').map(Number);
          if (minutes === 0 && seconds === 0) {
            setIsVpnConnected(false);
            return '00:00';
          }
          let newSeconds = seconds - 1;
          let newMinutes = minutes;
          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }
          return `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVpnConnected]);

  const addToCart = (product: typeof allChocolates[0]) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setCurrentView('cart');
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(' MAD', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="relative w-full h-full">
      {/* Phone Frame */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 320 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M20 0H300C311.046 0 320 8.95431 320 20V630C320 641.046 311.046 650 300 650H20C8.95431 650 0 641.046 0 630V20C0 8.95431 8.95431 0 20 0Z"
            fill="#1A1A1A"
          />
          <path
            d="M12 22C12 16.4772 16.4772 12 22 12H298C303.523 12 308 16.4772 308 22V628C308 633.523 303.523 638 298 638H22C16.4772 638 12 633.523 12 628V22Z"
            fill="#FCFCFC"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-[12px] rounded-[10px] overflow-hidden">
        {appType === 'marketplace' && (
          <div className="h-full w-full bg-white">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
              <span className="text-xs text-gray-800">{currentTime}</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                </svg>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 22h20V2z"/>
                </svg>
              </div>
            </div>

            {currentView === 'home' && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                    <p className="text-sm text-gray-600">Find your favorite chocolates</p>
                  </div>
                  <button 
                    onClick={() => setCurrentView('cart')}
                    className="relative p-2"
                  >
                    <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {allChocolates.map((chocolate) => (
                    <div key={chocolate.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="relative w-full pt-[100%] mb-3">
                        <Image
                          src={chocolate.image}
                          alt={chocolate.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{chocolate.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{chocolate.price}</span>
                        <button 
                          onClick={() => addToCart(chocolate)}
                          className="p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'cart' && (
              <div className="h-full flex flex-col">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <button 
                      onClick={() => setCurrentView('home')}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                  </div>

                  <div className="flex-1 overflow-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 mb-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-100 rounded-full"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-100 rounded-full"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="text-lg font-bold">{totalAmount.toFixed(2)} MAD</span>
                  </div>
                  <button 
                    onClick={() => setCheckoutState('payment')}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {appType === 'vpn' && (
          <div className="h-full w-full bg-gray-900 text-white">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2">
              <span className="text-xs">{currentTime}</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                </svg>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 22h20V2z"/>
                </svg>
              </div>
            </div>

            {vpnScreen === 'main' ? (
              <div className="p-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Tindy VPN</h1>
                  <p className="text-gray-400">Secure & Fast VPN Service</p>
                </div>

                <div className="relative w-48 h-48 mx-auto mb-8">
                  <button
                    onClick={() => setIsVpnConnected(!isVpnConnected)}
                    className={`w-full h-full rounded-full border-4 ${
                      isVpnConnected ? 'border-green-500' : 'border-gray-700'
                    } flex items-center justify-center transition-colors duration-300`}
                  >
                    <div className={`w-40 h-40 rounded-full ${
                      isVpnConnected ? 'bg-green-500' : 'bg-gray-700'
                    } flex items-center justify-center transition-colors duration-300`}>
                      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </button>
                  {isVpnConnected && (
                    <div className="absolute inset-0 animate-ping">
                      <div className="w-full h-full rounded-full border-4 border-green-500 opacity-75"></div>
                    </div>
                  )}
                </div>

                <div className="text-center mb-8">
                  <p className="text-xl font-medium mb-2">
                    {isVpnConnected ? 'Connected' : 'Not Connected'}
                  </p>
                  {isVpnConnected && (
                    <p className="text-gray-400">Session Time: {sessionTime}</p>
                  )}
                </div>

                <button 
                  onClick={() => setVpnScreen('servers')}
                  className="w-full bg-gray-800 p-4 rounded-lg flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      🇺🇸
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{vpnCountry.name}</p>
                      <p className="text-sm text-gray-400">{vpnCountry.ping}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold mb-1">256</p>
                    <p className="text-sm text-gray-400">bit encryption</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold mb-1">45</p>
                    <p className="text-sm text-gray-400">locations</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setVpnScreen('main')}
                      className="p-2 hover:bg-gray-800 rounded-full"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-bold">Select Location</h2>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  {vpnServers.map((server) => (
                    <button
                      key={server.id}
                      className="w-full bg-gray-800 p-4 rounded-lg flex items-center justify-between mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          🇺🇸
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{server.name}</p>
                          <p className="text-sm text-gray-400">{server.ping}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
} 
