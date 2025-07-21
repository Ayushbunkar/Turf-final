import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon, UserIcon } from 'lucide-react';
import Button from '../ui/Button';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Turfs',
    path: '/turfs'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div initial={{
            scale: 0.8,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            duration: 0.5
          }}>
              <span className="text-2xl font-bold text-green-600">
                TurfTime
              </span>
            </motion.div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`font-medium transition-colors hover:text-green-600 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                {link.name}
              </Link>)}
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-md ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.3
      }} className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-4">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map(link => <Link key={link.name} to={link.path} className="font-medium text-gray-800 hover:text-green-600" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>)}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </div>
            </div>
          </motion.div>}
      </div>
    </nav>;
};
export default Navbar;