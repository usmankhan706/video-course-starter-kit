// components/Footer.js

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center items-center">
                    <p className="text-gray-300 text-sm">
                        &copy; {new Date().getFullYear()} Project by StartdustDev.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
