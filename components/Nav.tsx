// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <a className="text-white text-lg font-bold">Your Logo</a>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/">
                                    <a className="text-white hover:text-gray-300">Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <a className="text-white hover:text-gray-300">About</a>
                                </Link>
                            </li>
                            {/* Add more menu items as needed */}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
