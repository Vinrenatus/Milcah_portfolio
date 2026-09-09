import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaChevronDown, FaPlay, FaMagic } from 'react-icons/fa';

function FloatingShape({ position, color, scale, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={3} roughness={0.1} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, scale }) {
  return (
    <Float speed={2} rotationIntensity={3} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function AnimatedText3D() {
  return (
    <Center position={[0, -2, -5]}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        CODE • AI • INNOVATE
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      <FloatingShape position={[-4, 2, -2]} color="#6366f1" scale={0.5} speed={1.2} />
      <FloatingShape position={[4, -2, -1]} color="#8b5cf6" scale={0.4} speed={0.8} />
      <FloatingSphere position={[3, 3, -3]} color="#06b6d4" scale={0.3} />
      <FloatingSphere position={[-3, -3, -2]} color="#f472b6" scale={0.25} />
      <FloatingTorus position={[-5, -1, -4]} color="#fbbf24" scale={0.3} />
      <FloatingTorus position={[5, 1, -3]} color="#34d399" scale={0.25} />
      <AnimatedText3D />
    </>
  );
}

const Hero = ({ profile, social }) => {
  const containerRef = useRef();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [activeBadge, setActiveBadge] = useState(0);

  const fullText = profile?.title || '';

  // Typing animation
  useEffect(() => {
    if (!fullText) return;
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Badge rotation
  useEffect(() => {
    const badgeInterval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(badgeInterval);
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: social?.github, color: 'hover:text-heading', label: 'GitHub' },
    { icon: FaLinkedin, href: social?.linkedin, color: 'hover:text-blue-400', label: 'LinkedIn' },
    { icon: FaEnvelope, href: profile?.email ? `mailto:${profile.email}` : null, color: 'hover:text-red-400', label: 'Email' },
  ].filter((link) => Boolean(link.href));

  const badges = [
    { text: '🏦 20 Years in UK Banking & Fintech', color: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30' },
    { text: '🤖 AI Model Training & Evaluation', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
    { text: '💷 £150M+ Monthly Lending Delivered', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/50 via-canvas/70 to-canvas z-0" />

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{ y: [null, Math.random() * -100 - 50], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ bottom: '10%', right: '5%' }}
        />
      </div>

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Rotating Badge */}
          <div className="mb-4 h-10 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBadge}
                className="inline-block px-6 py-2 rounded-full glass text-primary-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {badges[activeBadge].text}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Welcome Pill */}
          <motion.div
            className="inline-block mb-6 px-6 py-3 rounded-full glass text-primary-300 text-sm font-medium flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaMagic className="text-yellow-400" />
            👋 Welcome to my portfolio
            <FaMagic className="text-yellow-400" />
          </motion.div>

          {/* Name with Gradient */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-heading">I'm </span>
            <span className="gradient-text">{profile?.name}</span>
          </motion.h1>

          {/* Typing Title */}
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-body mb-4 min-h-[4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {typedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-primary-400`}>|</span>
          </motion.h2>

          {/* Tagline with Glow */}
          <motion.p
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="absolute -inset-4 bg-primary-500/5 blur-2xl -z-10" />
            {profile?.tagline}
          </motion.p>

          {/* CTA Buttons with Hover Effects */}
          <motion.div className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaPlay className="text-sm" /> View My Work 💼
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded-full border-2 border-primary-500 text-primary-400 font-semibold hover:bg-primary-500/10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch 📩</span>
              <div className="absolute inset-0 bg-primary-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
            <motion.a
              href="/Milcah_Mwangi_Resume.pdf"
              className="px-8 py-3 rounded-full glass text-heading font-semibold hover:bg-veil/10 transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Resume
              <div className="absolute inset-0 border-2 border-veil/20 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500" />
            </motion.a>
          </motion.div>

          {/* Social Links with Orbital Animation */}
          <motion.div className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-full glass flex items-center justify-center text-xl transition-all duration-300 ${link.color} relative group`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-primary-500/0 group-hover:border-primary-500/50 transition-colors duration-300" />
                <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <link.icon className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {['Python', 'FastAPI', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'].map((tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full glass text-xs font-medium text-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ scale: 1.1, color: '#fff', backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with Pulse */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-14 rounded-full border-2 border-veil/30 flex justify-center pt-2 relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-veil/80 to-veil/40 rounded-full"
            animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-xl animate-pulse" />
        </motion.div>
        <motion.div
          className="text-center mt-4 text-subtle text-sm flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-primary-400" /> Scroll to explore
        </motion.div>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary-500/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl" />
    </section>
  );
};

export default Hero;
