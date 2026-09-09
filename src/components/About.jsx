import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaCode, FaLaptopCode, FaCloud, FaDatabase, FaAward, FaBookOpen, FaQuoteLeft, FaPlay } from 'react-icons/fa';

const About = ({ profile, education }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);

  const stats = [
    { label: 'Years Engineering', icon: '🎯', target: 20 },
    { label: 'Model Outputs Scored', icon: '🧠', target: 1200 },
    { label: 'Annotation Records Audited', icon: '🔎', target: 5000 },
    { label: 'Engineers Led', icon: '👥', target: 12 },
  ];

  // Counter animation
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.target / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            clearInterval(timer);
          }
          setCountedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.min(Math.floor(current), stat.target);
            return newStats;
          });
        }, interval);
      });
    }
  }, [isInView]);

  const focusAreas = [
    { icon: FaLaptopCode, title: 'Fintech Backend Systems', description: 'SME credit decisioning, loan origination, and risk engines in Python, FastAPI, and Java', color: 'from-blue-500 to-cyan-500', emoji: '🏦' },
    { icon: FaCode, title: 'LLM Training & Evaluation', description: 'SFT authoring, RLHF preference ranking, rubric design, and hallucination detection', color: 'from-purple-500 to-pink-500', emoji: '🧠' },
    { icon: FaDatabase, title: 'Testing & Code Review', description: 'pytest, TDD, PEP 8 enforcement, API contract testing, and pull-request governance', color: 'from-orange-500 to-red-500', emoji: '🧪' },
    { icon: FaCloud, title: 'Cloud & DevOps', description: 'Docker, AWS (ECS, Lambda, S3, RDS), CI/CD in GitHub Actions and Jenkins, Terraform', color: 'from-green-500 to-teal-500', emoji: '☁️' },
  ];

  const tabs = [
    { label: 'Education', icon: FaBookOpen },
    { label: 'Achievements', icon: FaAward },
    { label: 'Philosophy', icon: FaQuoteLeft },
  ];

  const tabContent = [
    {
      title: 'Educational Background',
      content: 'Computer Science throughout, from undergraduate study at Westminster to a part-time PhD at Brunel completed alongside full-time engineering work.',
      items: [
        'PhD, Computer Science (Part-Time) — Brunel University London, 2001–2005',
        'MSc, Computer Science — University of Westminster, 1999–2000',
        'BSc, Computer Science — University of Westminster, 1995–1998',
      ]
    },
    {
      title: 'Key Achievements',
      content: 'Measured outcomes across regulated lending platforms and large-scale AI evaluation programmes.',
      items: [
        '🏆 "Technology Excellence" award, Paragon Banking Group (2011)',
        '💷 £150M+ monthly commercial lending processed at OakNorth Bank',
        '📈 Inter-annotator agreement lifted from 0.72 to 0.86 Cohen\'s κ',
        '🔎 14 systematic model failure patterns adopted into retraining criteria',
        '✅ FCA audits passed with zero critical findings',
      ]
    },
    {
      title: 'Engineering Philosophy',
      content: '"In regulated systems, correctness is not a feature — it is the product. Every merge should be defensible to an auditor and to the next engineer."',
      items: ['Test-Driven Development', 'Merge-Gated Test Suites', 'Reproducible, Written Review Feedback']
    },
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden" ref={ref}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with Line Animation */}
        <motion.div className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute left-1/2 -top-4 w-20 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider inline-block px-4 py-2 rounded-full glass">👨‍💻 About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-heading">Get to Know </span>
            <span className="gradient-text">Me Better</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Ph.D. in Software Engineering with expertise in AI training and scalable systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section with Multiple Effects */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Rotating Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 rounded-3xl opacity-50 group-hover:opacity-100 blur-lg transition-opacity duration-500 animate-spin-slow" />
              
              {/* Main Image Container */}
              <div className="relative z-10 glass rounded-3xl p-8 overflow-hidden">
                <motion.img
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="w-full max-w-md mx-auto rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl -z-10 flex items-center justify-center text-3xl"
                animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                💻
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full -z-10 flex items-center justify-center text-4xl"
                animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🚀
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary-500 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-500 rounded-br-lg" />

              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer z-20"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary-500/80 backdrop-blur-sm flex items-center justify-center">
                  <FaPlay className="text-3xl text-white ml-1" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-heading mb-4">
              Hello! I'm <span className="gradient-text">{profile?.name}</span>
            </h3>
            <p className="text-body text-lg leading-relaxed mb-6 relative">
              <span className="absolute -left-4 top-0 text-6xl text-primary-500/20 font-serif">"</span>
              {profile?.bio}
              <span className="absolute -right-4 bottom-0 text-6xl text-primary-500/20 font-serif rotate-180">"</span>
            </p>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                      : 'glass text-muted hover:text-heading'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              className="glass rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-heading font-semibold text-lg mb-2">{tabContent[activeTab].title}</h4>
              <p className="text-muted text-sm mb-4">{tabContent[activeTab].content}</p>
              <ul className="space-y-2">
                {tabContent[activeTab].items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="text-body text-sm flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Education Card with Glow */}
            {education && education[0] && (
              <div className="glass rounded-2xl p-6 mb-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors duration-500" />
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    🎓
                  </motion.div>
                  <div>
                    <h4 className="text-heading font-semibold text-lg">{education[0].degree}</h4>
                    <p className="text-primary-400">{education[0].institution}</p>
                    <p className="text-muted text-sm mt-1">
                      {[education[0].field, education[0].grade].filter(Boolean).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Pills with Hover */}
            <div className="flex flex-wrap gap-4">
              <motion.div
                className="flex items-center gap-2 text-body px-4 py-2 rounded-full glass"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
              >
                <span className="text-xl">📍</span>
                <span>{profile?.location}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 text-body px-4 py-2 rounded-full glass"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
              >
                <span className="text-xl">✉️</span>
                <span>{profile?.email}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section with Counter Animation */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center relative group overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="text-3xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {countedStats[index].toLocaleString('en-GB')}+
                </div>
                <div className="text-muted text-sm">{stat.label}</div>
              </div>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Focus Areas with 3D Card Effect */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="group glass rounded-2xl p-6 hover:bg-veil/5 transition-all duration-300 relative overflow-hidden"
              whileHover={{ y: -10, rotateY: 5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon with Ring */}
              <div className="relative mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className="text-2xl text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-veil/20 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="text-2xl mb-2">{area.emoji}</div>
              <h4 className="text-heading font-semibold text-lg mb-2">{area.title}</h4>
              <p className="text-muted text-sm">{area.description}</p>

              {/* Learn More Link */}
              <motion.div
                className="mt-4 flex items-center gap-2 text-primary-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ x: 5 }}
              >
                <span>Learn more</span>
                <span className="text-lg">→</span>
              </motion.div>

              {/* Corner Decorations */}
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary-500/30 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500/30 rounded-bl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
