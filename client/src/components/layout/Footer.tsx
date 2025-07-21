import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">TurfTime</h3>
            <p className="text-gray-300 mb-4">
              Book your perfect turf experience with ease. Play, compete, and
              enjoy with friends and family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/turfs" className="text-gray-300 hover:text-green-500 transition-colors">
                  Explore Turfs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                  Football Turfs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                  Cricket Grounds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                  Corporate Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                  Tournaments
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon size={20} className="mr-2 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Sports Avenue, Stadium District, City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={20} className="mr-2 text-green-500" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={20} className="mr-2 text-green-500" />
                <span className="text-gray-300">info@turftime.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TurfTime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;