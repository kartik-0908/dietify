'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer (opens from right) */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-black transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 space-y-6 relative">
          <Button 
            onClick={toggleDrawer}
            className="absolute top-4 left-4 p-2 text-white"
            variant="ghost"
          >
            ✕
          </Button>
          
          <div className="flex flex-col space-y-6 pt-12 text-white">
            <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('about')}>ABOUT US</button>
            <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('testimony')}>TESTIMONY</button>
            <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('features')}>FEATURES</button>
            <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('faq')}>FAQ</button>
            <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('contact')}>CONTACT US</button>
            <Button className="bg-[#2E2C2C] text-[#FF4601] font-semibold font-[Helvetica] hover:bg-[#3D3B3B] w-full">
              START JOURNEY
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* Header */}
      <header className="px-4 lg:px-8 py-4 pt-8 flex items-center justify-between font-[Helvetica] font-bold">
        {/* Logo */}
        <Link className="flex items-center justify-center ml-4 md:ml-12" href="#">
          <Image src="/logo.svg" alt="logo" width={120} height={40} />
        </Link>

        {/* Menu icon for mobile (moved to right) */}
        <button 
          className="md:hidden text-white p-2 ml-auto"
          onClick={toggleDrawer}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation - Adjusted for smaller screens */}
        <nav className="hidden md:flex flex-wrap justify-end gap-6 lg:gap-12 items-center text-white pr-6 lg:pr-12">
          <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('about')}>ABOUT US</button>
          <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('testimony')}>TESTIMONY</button>
          <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('features')}>FEATURES</button>
          <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('faq')}>FAQ</button>
          <button className="text-sm hover:text-[#FF4601]" onClick={() => scrollToSection('contact')}>CONTACT US</button>
          <Button className="bg-[#2E2C2C] text-[#FF4601] font-semibold font-[Helvetica] hover:bg-[#3D3B3B]">
            START JOURNEY
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
