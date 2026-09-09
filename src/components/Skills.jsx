import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaStar, FaChartBar } from 'react-icons/fa';

const SkillCard = ({ skill, index, isInView, onHover }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50, rotateX: -30 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 } },
  };

  const getLevelColor = (level) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 75) return 'from-blue-500 to-cyan-500';
    if (level >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getLevelBadge = (level) => {
    if (level >= 90) return '🏆 Expert';
    if (level >= 75) return '⭐ Advanced';
    if (level >= 60) return '📈 Intermediate';
    return '🌱 Learning';
  };

  return (
    <motion.div
      className="group perspective-1000"
      variants={variants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => { setIsHovered(true); onHover?.(skill); }}
      onMouseLeave={() => { setIsHovered(false); onHover?.(null); }}
    >
      <motion.div
        className="relative h-48 glass rounded-2xl p-6 cursor-pointer transform-style-3d overflow-hidden"
        whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Background Gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}30 0%, transparent 70%)`,
          }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-veil/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.5 }}
        />

        {/* Level Badge */}
        <motion.div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelColor(skill.level)} text-white`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {getLevelBadge(skill.level)}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon Row */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl relative"
              style={{ background: `${skill.color}20` }}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <i className={`${skill.icon}`} style={{ color: skill.color }} />
              {/* Orbiting Ring */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-veil/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {skill.emoji}
            </motion.span>
          </div>

          {/* Skill Name */}
          <h3 className="text-heading font-semibold text-lg mb-3 line-clamp-1">{skill.name}</h3>

          {/* Progress Section */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted">Proficiency</span>
              <motion.span
                className="text-heading font-bold"
                animate={{ scale: isHovered ? 1.1 : 1 }}
              >
                {skill.level}%
              </motion.span>
            </div>
            <div className="skill-bar relative h-3 rounded-full overflow-hidden bg-veil/10">
              {/* Animated Bar */}
              <motion.div
                className="skill-bar-fill absolute inset-y-0 left-0 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                style={{
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                }}
              />
              {/* Striped Pattern */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
                backgroundSize: '10px 10px',
              }} />
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-y-0 right-0 w-2 bg-veil/50 blur-sm"
                animate={{ x: isHovered ? [0, 100, 0] : 0 }}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              />
            </div>
          </div>
        </div>

        {/* Outer Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 40px ${skill.color}60` }}
        />

        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-veil/30 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-veil/30 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
};

const Skills = ({ skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('level'); // 'level', 'name'
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Categories come from the data itself, so the filter stays in step with the resume.
  const categories = ['all', ...new Set(skills?.map(skill => skill.category).filter(Boolean) || [])];

  // Filter and sort skills
  const filteredSkills = skills
    ?.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'level') {
        comparison = a.level - b.level;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  // Calculate average skill level
  const avgLevel = skills?.reduce((acc, skill) => acc + skill.level, 0) / skills?.length || 0;

  return (
    <section id="skills" className="relative py-20 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 35, repeat: Infinity }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider inline-block px-4 py-2 rounded-full glass mb-4">⚡ Skills & Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-heading">Technologies I </span>
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Core competencies across regulated financial systems, LLM training and evaluation, testing, and cloud infrastructure
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="glass rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-veil/5 border border-veil/10 text-heading placeholder-subtle focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <FaFilter className="text-primary-400" />
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                      : 'glass text-muted hover:text-heading'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat === 'all' ? 'All' : cat}
                </motion.button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <FaSortAmountDown className={`text-primary-400 cursor-pointer ${sortOrder === 'desc' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setSortOrder('desc')} />
              <FaSortAmountUp className={`text-primary-400 cursor-pointer ${sortOrder === 'asc' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setSortOrder('asc')} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg glass bg-veil/5 border border-veil/10 text-heading focus:outline-none focus:border-primary-500"
              >
                <option value="level" className="bg-surface">By Level</option>
                <option value="name" className="bg-surface">By Name</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">📊</div>
            <div className="text-2xl font-bold gradient-text">{skills?.length || 0}</div>
            <div className="text-muted text-sm">Total Skills</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">📈</div>
            <div className="text-2xl font-bold gradient-text">{avgLevel.toFixed(0)}%</div>
            <div className="text-muted text-sm">Average Level</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-2xl font-bold gradient-text">{skills?.filter(s => s.level >= 90).length || 0}</div>
            <div className="text-muted text-sm">Expert Level</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-2xl font-bold gradient-text">{skills?.filter(s => s.level >= 75).length || 0}</div>
            <div className="text-muted text-sm">Advanced+</div>
          </div>
        </motion.div>

        {/* Hovered Skill Info */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              className="glass rounded-2xl p-6 mb-12 relative overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${hoveredSkill.color}30` }}>
                    <i className={hoveredSkill.icon} style={{ color: hoveredSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-heading">{hoveredSkill.name}</h3>
                    <p className="text-muted">Proficiency: {hoveredSkill.level}%</p>
                  </div>
                </div>
                <FaChartBar className="text-4xl text-primary-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
          layout
        >
          {filteredSkills?.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
              onHover={setHoveredSkill}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredSkills?.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-heading mb-2">No skills found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Learning Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="glass rounded-2xl p-8 inline-block relative overflow-hidden group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5" />
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl"
              animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📚
              </motion.div>
              <h4 className="text-2xl font-bold text-heading mb-2">Always Learning</h4>
              <p className="text-muted max-w-md">
                Currently exploring:{' '}
                <span className="gradient-text font-medium">Advanced LLM Architectures, Quantum Computing, Edge AI</span>
              </p>

              {/* Progress Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['Transformer Models', 'Rust', 'WebAssembly', 'Kubernetes'].map((topic, i) => (
                  <motion.span
                    key={topic}
                    className="px-4 py-2 rounded-full glass text-xs font-medium text-body"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.3)' }}
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
