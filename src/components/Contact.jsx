import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaClock, FaCalendar } from 'react-icons/fa';

const ContactInfo = ({ icon: Icon, label, value, href, index, isInView, color }) => {
  return (
    <motion.a
      href={href}
      className="group relative flex items-center gap-4 p-5 rounded-xl glass hover:bg-veil/5 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      whileHover={{ x: 10, scale: 1.02 }}
    >
      {/* Hover Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Icon with Ring */}
      <div className="relative">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-2xl text-white" />
        </div>
        <motion.div
          className="absolute -inset-1 rounded-xl border-2 border-veil/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      <div>
        <p className="text-muted text-sm">{label}</p>
        <p className="text-heading font-medium group-hover:text-primary-400 transition-colors">{value}</p>
      </div>

      {/* Arrow Icon */}
      <motion.div
        className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ x: [0, 5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        →
      </motion.div>
    </motion.a>
  );
};

const Contact = ({ profile, contact, onSubmitMessage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: '', email: '', message: '', subject: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (onSubmitMessage) {
        await onSubmitMessage({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: formState.subject,
          status: 'unread'
        });
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '', subject: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting message:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (name === 'message') setCharCount(value.length);
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const email = contact?.email || profile?.email;
  const phone = contact?.phone || profile?.phone;
  const location = contact?.location || profile?.location;

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: email, href: `mailto:${email}`, color: 'from-red-500 to-pink-500' },
    { icon: FaPhone, label: 'Phone', value: phone, href: `tel:${phone}`, color: 'from-green-500 to-emerald-500' },
    { icon: FaMapMarkerAlt, label: 'Location', value: location, href: `https://maps.google.com/?q=${encodeURIComponent(location || '')}`, color: 'from-blue-500 to-cyan-500' },
  ].filter((info) => Boolean(info.value));

  const socialProfiles = Object.entries(profile?.social || {}).filter(([, url]) => Boolean(url));

  return (
    <section id="contact" className="relative py-20 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 35, repeat: Infinity }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider inline-block px-4 py-2 rounded-full glass mb-4">📬 Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-heading">Let's Work </span>
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Open to senior backend and AI evaluation roles — fully remote across UK, US, and APAC time zones.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Cards */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-heading mb-6 flex items-center gap-3">
                <span className="text-3xl">👋</span> Contact Information
              </h3>
              <p className="text-body mb-8">
                Happy to talk about fintech backend work, AI model evaluation engagements, or code-review and QA consulting.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <ContactInfo key={info.label} {...info} index={index} isInView={isInView} />
                ))}
              </div>

              {/* Availability Badge */}
              <motion.div
                className="mt-8 p-5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-4 h-4 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <p className="text-green-400 font-semibold">Currently Available</p>
                    <p className="text-muted text-sm">
                      {contact?.availability || profile?.availability || 'Available for immediate employment'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Response Time */}
              <motion.div
                className="mt-4 flex items-center gap-4 text-muted text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary-400" />
                  <span>Typically responds within 24 hours</span>
                </div>
              </motion.div>
            </div>

            {/* Social Links Card */}
            {socialProfiles.length > 0 && (
              <motion.div
                className="glass rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
                  🌐 Elsewhere
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {socialProfiles.map(([social, url], index) => (
                    <motion.a
                      key={social}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl glass flex items-center justify-center text-2xl text-muted hover:text-heading hover:bg-primary-500/20 transition-all duration-300"
                      whileHover={{ scale: 1.15, y: -8, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <i className={`fa-brands fa-${social}`} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              {/* Form Background Decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />

              <h3 className="text-2xl font-bold text-heading mb-6 flex items-center gap-3 relative z-10">
                <span className="text-3xl">✉️</span> Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-body text-sm font-medium mb-2">Your Name 🙋</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-body text-sm font-medium mb-2">Your Email 📧</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Subject Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-body text-sm font-medium mb-2">Subject 📝</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </motion.div>

                {/* Message Input with Character Count */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-body text-sm font-medium mb-2">Your Message 💬</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className={`text-muted ${charCount > 450 ? 'text-red-400' : ''}`}>
                      {charCount}/500 characters
                    </span>
                    {charCount > 450 && (
                      <span className="text-red-400">Almost at limit!</span>
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-veil/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FaCheck className="text-green-300 text-xl" />
                      Message Sent! ✅
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Form Footer */}
              <motion.div
                className="mt-6 pt-6 border-t border-veil/10 text-center text-muted text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                <p>🔒 Your information is secure and will never be shared.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
