import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaBars, FaTimes, FaUserAstronaut, FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (latest / docHeight) * 100;
    setScrollProgress(progress);
  });

  const navLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Experience', href: '#experience', icon: '💼' },
    { name: 'Projects', href: '#projects', icon: '🚀' },
    { name: 'Contact', href: '#contact', icon: '📬' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map(link => {
        const element = document.querySelector(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { href: link.href, name: link.name, top: rect.top };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find(s => s.top >= -100 && s.top < 300);
      if (current) setActiveSection(current.name.toLowerCase());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 z-[100]"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark py-3 shadow-lg shadow-primary/10 backdrop-blur-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo with Animation */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 text-2xl font-bold gradient-text group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaUserAstronaut className="text-xl text-white" />
              </motion.div>
              <span className="hidden sm:inline group-hover:text-primary-400 transition-colors">Milcah.dev</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative ${
                    activeSection === link.name.toLowerCase()
                      ? 'text-heading bg-veil/10'
                      : 'text-body hover:text-heading hover:bg-veil/10'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{link.icon}</span>
                  {link.name}
                  {/* Active Indicator */}
                  {activeSection === link.name.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                      layoutId="activeNav"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-body hover:text-heading hover:bg-veil/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSearch />
              </motion.button>

              {/* Notification Bell */}
              <motion.button
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-body hover:text-heading hover:bg-veil/10 transition-all relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBell />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              {/* Light / Dark Toggle */}
              <ThemeToggle />

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="btn-primary text-sm relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
              >
                <span className="relative z-10">Hire Me 🎯</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                className="text-2xl text-heading"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-veil/10"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Search the portfolio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 bg-canvas/98 backdrop-blur-xl lg:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-veil/10">
              <motion.div
                className="flex items-center gap-3 text-xl font-bold gradient-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaUserAstronaut className="text-lg text-white" />
                </motion.div>
                <span>Milcah.dev</span>
              </motion.div>
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-heading"
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] gap-4 p-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-2xl font-bold transition-colors flex items-center gap-4 px-6 py-3 rounded-xl w-full max-w-xs ${
                    activeSection === link.name.toLowerCase()
                      ? 'bg-veil/10 text-heading'
                      : 'text-muted hover:text-primary-400'
                  }`}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-3xl">{link.icon}</span>
                  {link.name}
                  {activeSection === link.name.toLowerCase() && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                      layoutId="mobileActive"
                    />
                  )}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                className="btn-primary mt-8 px-12"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
              >
                Hire Me 🎯
              </motion.a>

              {/* Mobile Social Links */}
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {['github', 'linkedin', 'twitter'].map((social, index) => (
                  <motion.a
                    key={social}
                    href={profile?.social?.[social]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl text-muted hover:text-heading hover:bg-primary-500/20 transition-all"
                    whileHover={{ scale: 1.15, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <i className={`fa-brands fa-${social}`} />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
