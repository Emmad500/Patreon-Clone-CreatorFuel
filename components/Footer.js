import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="font-bold text-lg text-white">CreatorFuel</span>
                    <p className="text-sm mt-1">Fueling creativity, one coffee at a time.</p>
                </div>
                <div className="flex space-x-6 text-sm">
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <div className="mt-4 md:mt-0 text-xs">
                    &copy; {new Date().getFullYear()} CreatorFuel. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
