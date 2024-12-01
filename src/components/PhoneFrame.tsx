'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  appType: 'vpn' | 'marketplace' | 'createapp';
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

export default function PhoneFrame({ appType, children }: PhoneFrameProps) {
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [currentView, setCurrentView] = useState<'home' | 'supermarket' | 'allChocolates' | 'cart'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutState, setCheckoutState] = useState<'cart' | 'payment' | 'success' | 'tracking'>('cart');
  const [orderId] = useState(`CH${Math.floor(Math.random() * 10000)}`);
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
    if (checkoutState === 'payment') {
      const timer = setTimeout(() => {
        setCheckoutState('success');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [checkoutState]);

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
    <div className="relative w-[300px] h-[600px] mx-auto select-none">
      <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl">
        <div className="absolute inset-[8px] bg-white rounded-[2.5rem] overflow-hidden">
          {/* Status Bar - Different color based on app type */}
          <div className={`absolute top-0 inset-x-0 h-7 ${appType === 'marketplace' ? 'bg-[#E31837]' : 'bg-gray-100'} z-20`}>
            <div className={`absolute top-1.5 left-6 ${appType === 'marketplace' ? 'text-white' : 'text-black'} text-sm font-medium`}>
              {currentTime}
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black rounded-b-3xl" />
            <div className="absolute top-1.5 right-6 flex items-center space-x-1.5">
              <div className="text-xs text-black">14%</div>
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" />
              </svg>
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
              </svg>
            </div>
          </div>

          {/* Conditional rendering based on appType */}
          {appType === 'createapp' ? (
            <div className="absolute inset-0 bg-white">
              {children}
            </div>
          ) : appType === 'marketplace' ? (
            <div className="absolute inset-0 bg-[#F5E6D3]">
              {/* Marketplace App Content */}
              <AnimatePresence mode="wait">
                {currentView === 'home' ? (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    {/* Home Screen Content */}
                    <div className="bg-[#E31837] pt-7 pb-3 px-4">
                      <div className="flex items-center justify-between gap-2">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                          <div className="bg-white rounded-full pl-9 pr-3 py-2 w-full">
                            <input
                              type="text"
                              placeholder="Search"
                              className="w-full text-sm outline-none text-gray-600 placeholder-gray-500"
                            />
                          </div>
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                          </div>
                        </div>

                        {/* Cart Button */}
                        <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2M1 2v2h2l3.6 7.59-1.36 2.45c-.15.28-.24.61-.24.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25 0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5 0-.55-.45-1-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Location Bar */}
                    <div className="bg-[#E8D5B5] px-4 py-2.5 flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                      </svg>
                      <span className="text-[#E31837] font-medium flex-1">Marrakesh</span>
                      <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </div>

                    {/* Categories */}
                    <div className="relative h-[calc(100%-140px)] flex items-center justify-center -mt-6">
                      <div className="relative w-[280px] h-[280px]">
                        {/* Top Circle - Supermarket */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[135px]">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentView('supermarket')}
                            className="w-full h-[135px] bg-white rounded-full flex flex-col items-center justify-center space-y-2 shadow-sm transform-gpu relative"
                          >
                            <div className="text-3xl">🛒</div>
                            <div className="text-base font-medium text-[#E31837] text-center">
                              Supermarket
                            </div>
                          </motion.button>
                        </div>

                        {/* Bottom Left Circle */}
                        <div className="absolute bottom-4 left-0 w-[135px]">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-[135px] bg-white rounded-full flex flex-col items-center justify-center space-y-2 shadow-sm transform-gpu"
                          >
                            <div className="text-3xl">🥬</div>
                            <div className="text-base font-medium text-[#E31837] text-center">
                              Traditional<br />Markets
                            </div>
                          </motion.button>
                        </div>

                        {/* Bottom Right Circle */}
                        <div className="absolute bottom-4 right-0 w-[135px]">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-[135px] bg-white rounded-full flex flex-col items-center justify-center space-y-2 shadow-sm transform-gpu"
                          >
                            <div className="text-3xl">📦</div>
                            <div className="text-base font-medium text-[#E31837] text-center">
                              Services &<br />Boutique
                            </div>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : currentView === 'supermarket' ? (
                  <motion.div
                    key="supermarket"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    {/* Home Header */}
                    <div className="bg-[#E31837] pt-7 pb-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl text-title">Home</h1>
                          <div className="flex items-center bg-white rounded-full px-2.5 py-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-sm font-semibold ml-1">10</span>
                            <span className="text-xs text-gray-500 ml-0.5">pts</span>
                          </div>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={() => setCurrentView('cart')}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-[#E31837]" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                            </svg>
                            {cartItems.length > 0 && (
                              <div className="absolute top-0 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-[10px] font-semibold text-[#E31837]">{cartItems.length}</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Location Bar */}
                    <div className="bg-[#E8D5B5] px-4 py-2.5 flex items-center">
                      <svg className="w-5 h-5 text-[#E31837] mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                      </svg>
                      <span className="text-[#E31837] text-subtitle flex-1">Casablanca</span>
                      <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </div>

                    {/* Search Bar */}
                    <div className="px-4 py-3">
                      <div className="bg-white rounded-full border-2 border-[#E31837] px-4 py-2.5 flex items-center">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search in Carrefour & more"
                          className="flex-1 text-sm text-body outline-none"
                        />
                      </div>
                    </div>

                    {/* Store Cards */}
                    <div className="px-4 grid grid-cols-2 gap-4">
                      {/* BIM Card */}
                      <div className="bg-white rounded-lg p-4 aspect-square flex flex-col items-center justify-center gap-3">
                        <div className="w-20 h-20 rounded-full border-2 border-[#E8D5B5] flex items-center justify-center">
                          <div className="w-16 h-16 relative">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                              <circle cx="200" cy="200" r="200" fill="#E31837"/>
                              <text 
                                x="200" 
                                y="230" 
                                textAnchor="middle" 
                                dominantBaseline="middle"
                                fontSize="140" 
                                fill="white" 
                                fontFamily="Arial Black" 
                                fontWeight="900"
                              >BIM</text>
                            </svg>
                          </div>
                        </div>
                        <span className="text-base text-subtitle text-gray-900">BIM</span>
                      </div>

                      {/* Marjane Card */}
                      <div className="bg-white rounded-lg p-4 aspect-square flex flex-col items-center justify-center gap-3">
                        <div className="w-20 h-20 rounded-full border-2 border-[#E8D5B5] flex items-center justify-center">
                          <div className="w-16 h-16 relative">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                              <circle cx="200" cy="200" r="200" fill="#004C97"/>
                              <text 
                                x="200" 
                                y="230" 
                                textAnchor="middle" 
                                dominantBaseline="middle"
                                fontSize="220" 
                                fill="white" 
                                fontFamily="Arial Black" 
                                fontWeight="900"
                              >M</text>
                            </svg>
                          </div>
                        </div>
                        <span className="text-base text-subtitle text-gray-900">Marjane</span>
                      </div>
                    </div>

                    {/* Products Section */}
                    <div className="mt-6 px-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-title text-gray-900">Chocolats</h2>
                        <button 
                          onClick={() => setCurrentView('allChocolates')}
                          className="text-[#E31837] text-button text-sm"
                        >
                          See all
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {allChocolates.map((chocolate) => (
                          <motion.div
                            key={chocolate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl p-3 relative group"
                          >
                            <div className="absolute top-2 right-2 z-10">
                              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-[#E31837]">
                                {chocolate.price}
                              </div>
                            </div>
                            
                            <div className="relative aspect-square mb-3 rounded-xl overflow-hidden">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="h-full w-full"
                              >
                                <Image
                                  src={chocolate.image}
                                  alt={chocolate.name}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#E31837] transition-colors">
                                {chocolate.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(chocolate.rating)
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ({chocolate.reviews})
                                </span>
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCart(chocolate)}
                              className="mt-3 w-full bg-[#E31837] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#d11731] transition-colors"
                            >
                              Add to Cart
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : currentView === 'allChocolates' ? (
                  <motion.div
                    key="allChocolates"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    {/* All Chocolates Header */}
                    <div className="bg-[#E31837] pt-7 pb-3 px-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => setCurrentView('supermarket')}
                          className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-4"
                        >
                          <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                          </svg>
                        </button>
                        <h1 className="text-xl text-title text-white">All Chocolates</h1>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-4 py-3">
                      <div className="bg-white rounded-full border-2 border-[#E31837] px-4 py-2.5 flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search chocolates"
                          className="flex-1 text-sm text-body outline-none"
                        />
                      </div>
                    </div>

                    {/* Chocolates Grid */}
                    <div className="flex-1 overflow-auto">
                      <div className="grid grid-cols-2 gap-3 p-4">
                        {allChocolates.map((chocolate) => (
                          <motion.div
                            key={chocolate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl p-3 relative group"
                          >
                            <div className="absolute top-2 right-2 z-10">
                              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-[#E31837]">
                                {chocolate.price}
                              </div>
                            </div>
                            
                            <div className="relative aspect-square mb-3 rounded-xl overflow-hidden">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="h-full w-full"
                              >
                                <Image
                                  src={chocolate.image}
                                  alt={chocolate.name}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#E31837] transition-colors">
                                {chocolate.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(chocolate.rating)
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ({chocolate.reviews})
                                </span>
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCart(chocolate)}
                              className="mt-3 w-full bg-[#E31837] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#d11731] transition-colors"
                            >
                              Add to Cart
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col"
                  >
                    <AnimatePresence mode="wait">
                      {checkoutState === 'cart' && (
                        <motion.div
                          key="cart-content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col"
                        >
                          {/* Cart Header */}
                          <div className="bg-[#E31837] pt-7 pb-3 px-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => setCurrentView('supermarket')}
                                className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-4"
                              >
                                <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                                </svg>
                              </button>
                              <h1 className="text-xl text-title text-white">Your Cart</h1>
                            </div>
                          </div>

                          {/* Cart Items */}
                          <div className="flex-1 overflow-auto bg-[#F5F3EE]">
                            {cartItems.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <svg className="w-16 h-16 mb-4" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                                </svg>
                                <p className="text-lg text-subtitle">Your cart is empty</p>
                              </div>
                            ) : (
                              <div className="p-4 space-y-3">
                                {cartItems.map((item) => (
                                  <motion.div
                                    key={item.id}
                                    layout
                                    className="bg-white rounded-lg p-4 flex items-center gap-4"
                                  >
                                    <div className="relative w-20 h-20">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                        sizes="80px"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-sm text-subtitle text-gray-900 mb-1">{item.name}</h3>
                                      <p className="text-[#E31837] text-subtitle">{item.price}</p>
                                      <div className="flex items-center gap-3 mt-2">
                                        <button
                                          onClick={() => updateQuantity(item.id, -1)}
                                          className="w-8 h-8 rounded-full border-2 border-[#E31837] flex items-center justify-center text-[#E31837] text-button"
                                        >
                                          -
                                        </button>
                                        <span className="text-subtitle">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, 1)}
                                          className="w-8 h-8 rounded-full border-2 border-[#E31837] flex items-center justify-center text-[#E31837] text-button"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Cart Footer */}
                          {cartItems.length > 0 && (
                            <div className="bg-white p-4 shadow-top">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-lg text-title">Total</span>
                                <span className="text-lg text-title">{totalAmount.toFixed(2)} MAD</span>
                              </div>
                              <button 
                                onClick={() => setCheckoutState('payment')}
                                className="w-full bg-[#E31837] text-white py-3 rounded-lg text-button"
                              >
                                Checkout
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {checkoutState === 'payment' && (
                        <motion.div
                          key="payment"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col bg-white"
                        >
                          <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <div className="w-12 h-12 border-4 border-t-[#4285F4] border-r-[#34A853] border-b-[#FBBC05] border-l-[#EA4335] rounded-full animate-spin mb-4" />
                            <p className="text-lg font-medium text-gray-800 text-center">
                              Processing your payment...
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {checkoutState === 'success' && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col bg-white"
                        >
                          <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                            >
                              <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
                              </svg>
                            </motion.div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                              Payment Successful!
                            </h2>
                            <p className="text-gray-600 text-center mb-8">
                              Your order has been confirmed
                            </p>
                            <button
                              onClick={() => setCheckoutState('tracking')}
                              className="bg-[#E31837] text-white px-8 py-3 rounded-lg text-button"
                            >
                              Track Your Order
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {checkoutState === 'tracking' && (
                        <motion.div
                          key="tracking"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col bg-[#F5F3EE]"
                        >
                          {/* Tracking Header */}
                          <div className="bg-[#E31837] pt-7 pb-3 px-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => {
                                  setCheckoutState('cart');
                                  setCurrentView('supermarket');
                                  setCartItems([]);
                                }}
                                className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-4"
                              >
                                <svg className="w-5 h-5 text-[#E31837]" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                                </svg>
                              </button>
                              <h1 className="text-xl text-title text-white">Order Tracking</h1>
                            </div>
                          </div>

                          {/* Tracking Content */}
                          <div className="flex-1 p-4">
                            <div className="bg-white rounded-xl p-4 mb-4">
                              <h2 className="text-lg font-semibold mb-2">Order #{orderId}</h2>
                              <p className="text-sm text-gray-600 mb-4">Estimated delivery: 30-45 minutes</p>
                              
                              <div className="space-y-6">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <p className="font-medium">Order Confirmed</p>
                                    <p className="text-sm text-gray-500">Your order has been confirmed</p>
                                  </div>
                                </div>

                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <p className="font-medium">Preparing Order</p>
                                    <p className="text-sm text-gray-500">Your items are being prepared</p>
                                  </div>
                                </div>

                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-[#E31837] rounded-full flex items-center justify-center animate-pulse">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <p className="font-medium">On the Way</p>
                                    <p className="text-sm text-gray-500">Your order is on its way to you</p>
                                  </div>
                                </div>

                                <div className="flex items-center opacity-50">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <p className="font-medium">Delivered</p>
                                    <p className="text-sm text-gray-500">Enjoy your order!</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-xl p-4">
                              <h3 className="font-semibold mb-3">Order Summary</h3>
                              <div className="space-y-2">
                                {cartItems.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span className="text-gray-600">{(parseFloat(item.price) * item.quantity).toFixed(2)} MAD</span>
                                  </div>
                                ))}
                                <div className="border-t pt-2 mt-2">
                                  <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{totalAmount.toFixed(2)} MAD</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="absolute inset-0 bg-white pt-7">
              {/* VPN App Content */}
              <AnimatePresence mode="wait">
                {vpnScreen === 'main' ? (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h1 className="text-2xl font-bold text-gray-900">Tindy Vpn</h1>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                      </button>
                    </div>

                    {/* Country Selector */}
                    <button 
                      onClick={() => setVpnScreen('servers')}
                      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{vpnCountry.flag}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{vpnCountry.name}</h3>
                            <p className="text-sm text-gray-500">{vpnCountry.ping}</p>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                      </div>
                    </button>

                    {/* Connection Toggle */}
                    <div className="flex flex-col items-center mb-8">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 cursor-pointer"
                        style={{
                          background: isVpnConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: isVpnConnected ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
                        }}
                        onClick={() => setIsVpnConnected(!isVpnConnected)}
                      >
                        <svg className="w-10 h-10" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,3A9,9 0 0,1 21,12A9,9 0 0,1 12,21A9,9 0 0,1 3,12A9,9 0 0,1 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        {isVpnConnected ? "Connected" : "Not Connected"}
                      </p>
                    </div>

                    {/* Session Timer */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600">Session Time</h3>
                        <button className="px-4 py-1 bg-[#FF6B6B] text-white text-sm font-medium rounded-full">
                          + ADD TIME
                        </button>
                      </div>
                      <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{sessionTime}</h2>
                        <p className="text-sm text-gray-500">
                          {isVpnConnected ? "Session in progress" : "Connect to start your session"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="servers"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    {/* Servers Header */}
                    <div className="px-4 mb-6">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setVpnScreen('main')}
                          className="w-8 h-8 flex items-center justify-center text-gray-600"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                          </svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Locations</h1>
                        <div className="ml-auto text-sm text-gray-500">(0)</div>
                      </div>
                    </div>

                    {/* Servers Grid */}
                    <div className="px-4 grid grid-cols-2 gap-4">
                      {vpnServers.map((server) => (
                        <button
                          key={server.id}
                          onClick={() => {
                            setVpnScreen('main');
                            // You can add logic here to update the selected server
                          }}
                          className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-left border border-gray-100"
                        >
                          <div className="text-2xl mb-2">{server.flag}</div>
                          <div className="font-medium text-gray-900">{server.name}</div>
                          <div className="text-sm text-gray-500">{server.ping}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
