const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white font-medium">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-lg sm:text-xl mb-4 hover:text-purple-400 transition-colors">
          &copy; 2025 JobFix. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-500 transition-colors duration-300"
          >
            GitHub
          </a>
        </div>

        {/* Footer Links (optional) */}
        <div className="text-sm text-gray-400">
          <a
            href="/privacy-policy"
            className="hover:text-purple-500 transition-colors mr-6"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-purple-500 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
