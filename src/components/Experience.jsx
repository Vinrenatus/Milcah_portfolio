import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaDownload, FaExpand, FaCompress, FaFilter } from 'react-icons/fa';

const ExperienceCard = ({ experience, index, isInView, isLeft }) => {
  const controls = useAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getDuration = (start, end, current) => {
    const startDate = new Date(start);
    const endDate = current ? new Date() : new Date(end);
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const totalMonths = years * 12 + months;
    if (totalMonths >= 12) {
      const y = Math.floor(totalMonths / 12);
      const m = totalMonths % 12;
      return `${y}y ${m > 0 ? `${m}m` : ''}`;
    }
    return `${totalMonths} months`;
  };

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, rotateY: isLeft ? -30 : 30 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7, delay: index * 0.2, type: 'spring', stiffness: 80 } },
  };

  const duration = getDuration(experience.start_date, experience.end_date, experience.current);

  return (
    <motion.div
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-12`}
      variants={variants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-purple-500 to-cyan-500 transform -translate-x-1/2 rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-veil/30"
          initial={{ height: '0%' }}
          animate={isInView ? { height: '100%' } : { height: '0%' }}
          transition={{ duration: 1.5, delay: index * 0.2 }}
        />
      </div>

      {/* Timeline Dot with Pulse */}
      <motion.div
        className="absolute left-1/2 top-8 w-5 h-5 bg-primary-500 rounded-full transform -translate-x-1/2 z-10 border-4 border-canvas"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
      >
        <motion.div
          className="absolute inset-0 bg-primary-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto md:text-right'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="glass rounded-2xl p-6 md:p-8 group hover:bg-veil/5 transition-all duration-300 relative overflow-hidden cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Card Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Company Logo Placeholder */}
          <div className={`flex items-center gap-3 mb-4 ${!isLeft ? 'md:justify-end' : ''}`}>
            <motion.div
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-2xl relative overflow-hidden"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10">🏢</span>
              <motion.div
                className="absolute inset-0 bg-veil/20"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <div className={!isLeft ? 'md:text-right' : ''}>
              <h3 className="text-xl font-bold text-heading group-hover:text-primary-400 transition-colors">{experience.company}</h3>
              <p className="text-primary-400 font-medium">{experience.role}</p>
            </div>
          </div>

          {/* Meta Info with Icons */}
          <div className={`flex flex-wrap gap-3 text-sm text-muted mb-4 ${!isLeft ? 'md:justify-end' : ''}`}>
            <motion.span
              className="flex items-center gap-2 px-3 py-1 rounded-full glass"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
            >
              <FaMapMarkerAlt className="text-primary-400" />
              {experience.location}
            </motion.span>
            <motion.span
              className="flex items-center gap-2 px-3 py-1 rounded-full glass"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
            >
              <FaCalendarAlt className="text-primary-400" />
              {formatDate(experience.start_date)} - {experience.current ? 'Present' : formatDate(experience.end_date)}
            </motion.span>
            <motion.span
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300"
              whileHover={{ scale: 1.05 }}
            >
              ⏱️ {duration}
            </motion.span>
          </div>

          {/* Description */}
          <p className={`text-body mb-4 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {experience.description}
          </p>

          {/* Achievements */}
          {experience.achievements && (
            <motion.ul
              className={`space-y-2 mb-4 ${!isLeft ? 'md:justify-end' : ''}`}
              initial={{ opacity: 0, height: 0 }}
              animate={isExpanded ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
            >
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className="text-muted text-sm flex items-start gap-2"
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + i * 0.1 + 0.5 }}
                  style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
                >
                  <motion.span
                    className="text-green-400 flex-shrink-0"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    ✓
                  </motion.span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${!isLeft ? 'md:justify-end' : ''}`}>
            {experience.technologies?.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300 border border-primary-500/30 cursor-default"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 + i * 0.05 + 0.7 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.3)', y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Current Badge */}
          {experience.current && (
            <motion.div
              className={`absolute -top-3 ${isLeft ? '-right-3' : '-left-3'} px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs font-bold text-white flex items-center gap-1`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.2 + 0.8, type: 'spring' }}
            >
              <motion.span
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              Current
            </motion.div>
          )}

          {/* Expand Indicator */}
          <motion.div
            className={`absolute bottom-4 ${isLeft ? 'right-4' : 'left-4'} flex items-center gap-2 text-subtle text-sm`}
            whileHover={{ scale: 1.1 }}
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = ({ experience }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const displayedExperience = showAll ? experience : experience?.slice(0, 3);

  const filterTypes = ['all', 'current', 'past'];
  const filteredExperience = displayedExperience?.filter(exp => {
    if (filterType === 'current') return exp.current;
    if (filterType === 'past') return !exp.current;
    return true;
  });

  return (
    <section id="experience" className="relative py-20 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider inline-block px-4 py-2 rounded-full glass mb-4">💼 Work Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-heading">My Professional </span>
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">20 years across UK banking and fintech engineering, followed by contract AI model training and evaluation</p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {filterTypes.map(type => (
            <motion.button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                filterType === type
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                  : 'glass text-muted hover:text-heading'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="text-xs" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {filteredExperience?.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} isInView={isInView} isLeft={index % 2 === 0} />
          ))}
        </div>

        {/* Show More Button */}
        {experience?.length > 3 && (
          <motion.div className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full glass text-primary-400 font-medium hover:bg-veil/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Show Less ↑' : `Show More (${experience.length - 3} more) ↓`}
            </motion.button>
          </motion.div>
        )}

        {/* Download CV Button with Animation */}
        <motion.div className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="/Milcah_Mwangi_Resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaBriefcase />
              Download Full Resume
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-2xl font-bold gradient-text">{experience?.length || 0}</div>
            <div className="text-muted text-sm">Roles & Engagements</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold gradient-text">20</div>
            <div className="text-muted text-sm">Years</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold gradient-text">{experience?.filter(e => e.current).length || 0}</div>
            <div className="text-muted text-sm">Current Roles</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold gradient-text">{experience?.reduce((acc, e) => acc + (e.achievements?.length || 0), 0) || 0}</div>
            <div className="text-muted text-sm">Achievements</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
