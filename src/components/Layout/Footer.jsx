import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Store Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">LocalShop</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your neighborhood store, now online. Quality products with
            personal service that makes shopping a delightful experience.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <TwitterIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Home
              </Link>
            </li>
            <li>
              <Link to="/?category=sustainable" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Sustainable Products
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                → New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                → About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/?category=clothing" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Clothing
              </Link>
            </li>
            <li>
              <Link to="/?category=electronics" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Electronics
              </Link>
            </li>
            <li>
              <Link to="/?category=home" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Home & Decor
              </Link>
            </li>
            <li>
              <Link to="/?category=kitchen" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Kitchen
              </Link>
            </li>
            <li>
              <Link to="/?category=accessories" className="text-gray-400 hover:text-white transition-colors duration-200">
                → Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-400">123 Main Street, Downtown, City, 10001</span>
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-400">(123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <MailIcon className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-400">contact@localshop.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} LocalShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

