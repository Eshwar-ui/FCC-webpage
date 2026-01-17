import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, X, Trophy, Users, GraduationCap, Target, TrendingUp, Award,
  ChevronRight, Phone, Mail, ArrowRight,
  Building2, Dumbbell, Shield, Zap, Star, CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImangeWithFallback';
import { ContactFooter } from './components/ContactFooter';
import { Hero } from './components/Hero';
import { Shop } from './components/shop';
import { logo, eventImages, featureImages } from './assets';

// Event images from centralized assets
const event1Image = eventImages.deadlift;
const event2Image = eventImages.farmersWalk;
const event3Image = eventImages.sandbagLoading;
const event4Image = eventImages.tireFlip;
const event5Image = eventImages.yokeWalk;

// Event Modal Component
interface EventModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  image: string;
  details: { label: string; value: string }[];
  note: string;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalEvents?: number;
}

function EventModal({ 
  isOpen, 
  setIsOpen, 
  title, 
  image, 
  details, 
  note,
  onPrev,
  onNext,
  currentIndex = 0,
  totalEvents = 0
}: EventModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 md:backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
    >
      {/* Previous Arrow - Large touch target for accessibility */}
      {onPrev && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous event"
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-3 border-[#d4af37] rounded-full flex items-center justify-center text-[#d4af37] hover:text-white transition-all shadow-xl shadow-black/50 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rotate-180" />
        </motion.button>
      )}

      {/* Next Arrow - Large touch target for accessibility */}
      {onNext && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next event"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-3 border-[#d4af37] rounded-full flex items-center justify-center text-[#d4af37] hover:text-white transition-all shadow-xl shadow-black/50 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" />
        </motion.button>
      )}

      <motion.div
        key={title} // Re-animate on event change
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl w-full mx-4 sm:mx-6 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 sm:border-4 border-[#d4af37] rounded-xl sm:rounded-2xl shadow-2xl shadow-[#d4af37]/30"
      >
        {/* Close Button - Larger touch target on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
          className="sticky top-3 sm:top-4 right-3 sm:right-4 float-right bg-[#c41e3a] hover:bg-[#d4af37] active:bg-[#b8941f] text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors z-10 m-3 sm:m-4 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50"
        >
          ✕
        </button>

        <div className="p-4 sm:p-6 md:p-8 pt-2 sm:pt-4">
          {/* Event Counter */}
          {totalEvents > 0 && (
            <div className="text-center mb-3 sm:mb-4">
              <span className="text-[#808080] text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full">
                Event {currentIndex + 1} of {totalEvents}
              </span>
            </div>
          )}

          {/* Event Header */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d4af37] mb-4 sm:mb-6 text-center pr-10 sm:pr-0">{title}</h2>

          {/* Layout: Image + Details - Stack on mobile, side by side on desktop */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Event Poster - Responsive with loading optimization */}
            <div className="relative aspect-[3/4] sm:aspect-auto">
              <img 
                src={image} 
                alt={title}
                loading="eager"
                className="w-full h-full sm:h-auto sm:max-h-[400px] object-contain rounded-lg border-2 border-[#c41e3a] bg-black/20"
              />
            </div>

            {/* Event Details - Better spacing on mobile */}
            <div className="space-y-2 sm:space-y-3">
              {details.map((detail, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-black/50 border border-[#c41e3a]/30 rounded-lg p-2.5 sm:p-3"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-2 h-2 bg-[#c41e3a] rounded-full mt-1.5 shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#d4af37] font-bold text-xs sm:text-sm">{detail.label}</p>
                      <p className="text-white text-xs sm:text-sm leading-relaxed">{detail.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note Section */}
          <div className="bg-gradient-to-r from-[#c41e3a]/20 to-[#d4af37]/20 border-l-4 border-[#d4af37] p-3 sm:p-4 rounded">
            <p className="text-[#b0b0b0] italic text-xs sm:text-sm leading-relaxed">{note}</p>
          </div>

          {/* Mobile Navigation Hint */}
          <div className="mt-4 text-center sm:hidden">
            <p className="text-[#606060] text-xs">
              Use arrows or swipe to navigate events
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    category: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        category: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const events = [
    {
      title: "Deadlift for Reps",
      image: event1Image,
      details: [
        { label: "Weight", value: "150 kg for maximum repetitions" },
        { label: "Duration", value: "60 seconds" },
        { label: "Rules", value: "Full lockout at top, controlled descent" },
        { label: "Scoring", value: "1 point per valid rep" }
      ],
      note: "Athletes must demonstrate full range of motion. Mixed grip, straps, or hook grip allowed."
    },
    {
      title: "Farmer's Walk",
      image: event2Image,
      details: [
        { label: "Weight", value: "40 kg per hand" },
        { label: "Distance", value: "20 meters" },
        { label: "Rules", value: "No dropping, continuous movement" },
        { label: "Scoring", value: "Time to complete + distance bonus" }
      ],
      note: "Grip strength and core stability are key. Fastest time wins."
    },
    {
      title: "Sand Bag / Stone Loading",
      image: event3Image,
      details: [
        { label: "Weight", value: "50 kg, 60 kg, 70 kg, 80 kg, 90 kg" },
        { label: "Height", value: "Load onto 1.2m platform" },
        { label: "Rules", value: "5 bags/stones loaded in sequence" },
        { label: "Scoring", value: "Time to complete all loads" }
      ],
      note: "Progressive weight loading. Each bag must clear the platform edge."
    },
    {
      title: "Tire Flip",
      image: event4Image,
      details: [
        { label: "Weight", value: "200 kg tire" },
        { label: "Distance", value: "10 flips (20 meters)" },
        { label: "Rules", value: "Complete flip required, no rolling" },
        { label: "Scoring", value: "Time to complete all flips" }
      ],
      note: "Explosive power event. Tire must rotate 180° each flip."
    },
    {
      title: "Barbell Standing Military Press",
      image: event5Image,
      details: [
        { label: "Weight", value: "70-100 kg (154-220 LBS) – Increases by 10 kg per level" },
        { label: "Duration", value: "60 seconds for maximum reps" },
        { label: "Rules", value: "Strict press form required • No leg drive allowed • Full lockout at top" },
        { label: "Scoring", value: "Maximum reps in 60 seconds • Tie breaker = Max weight lifted" },
        { label: "Benefits", value: "Tests overhead strength • Improves pressing technique" }
      ],
      note: "Power • Control • Strength. This event tests pure upper body pressing power. Cash prizes: ₹20,000 (1st), ₹15,000 (2nd), ₹10,000 (3rd & 4th)."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-40 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo with Brand Name - Always Visible */}
            <motion.a 
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            >
              <img src={logo} alt="FCC Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0" />
              <div className="flex flex-col">
                <div className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-[#d4af37] leading-tight whitespace-nowrap">
                  Fight Club Championship
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs text-[#808080] leading-tight">
                  Private Limited
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation with CTA */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {[
                { href: '#home', label: 'Home' },
                { href: '#strongest-man', label: 'Strongest Man' },
                { href: '#universities', label: 'Universities' },
                { href: '#athletes', label: 'Athletes' },
                { href: '#shop', label: 'Shop' },
                { href: '#roadmap', label: 'Vision' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-white hover:text-[#d4af37] transition-colors text-sm xl:text-base relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4af37] transition-all group-hover:w-full"></span>
                </a>
              ))}
              
              {/* CTA Button in Desktop Nav */}
              <motion.a
                href="#athletes"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 px-5 py-2.5 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white text-sm xl:text-base font-bold rounded-lg transition-all shadow-lg shadow-[#c41e3a]/30 flex items-center gap-2 whitespace-nowrap"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>

            {/* Mobile: CTA Button + Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile CTA Button */}
              <motion.a
                href="#athletes"
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </motion.a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                className="text-white p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Full height with better spacing */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 border-t border-[#2a2a2a] mt-2 pt-4"
            >
              <div className="flex flex-col gap-1">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#strongest-man', label: 'Strongest Man' },
                  { href: '#universities', label: 'Universities' },
                  { href: '#athletes', label: 'Athletes' },
                  { href: '#shop', label: 'Shop' },
                  { href: '#roadmap', label: 'Vision' },
                  { href: '#contact', label: 'Contact' },
                ].map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white hover:text-[#d4af37] active:bg-[#d4af37]/10 py-3 px-4 rounded-lg transition-colors text-base font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile CTA Button in Menu */}
                <motion.a
                  href="#athletes"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 mx-4 px-6 py-3.5 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white text-base font-bold rounded-lg transition-all shadow-lg shadow-[#c41e3a]/30 flex items-center justify-center gap-2"
                >
                  Register Now
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <Hero />

      {/* Strongest Man - University Level Section */}
      <section id="strongest-man" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {/* Logo Watermark - Mobile Only (No Glows) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:opacity-[0.03] pointer-events-none flex items-center justify-center">
          <img src={logo} alt="" loading="lazy" className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] object-contain" />
        </div>

        {/* Animated Energy Glow - Desktop Only */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-[#c41e3a] rounded-full blur-[150px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* What is Strongest Man */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-6 text-[#d4af37]">What is Strongest Man?</h2>
            <p className="text-lg text-[#b0b0b0] max-w-4xl mx-auto leading-relaxed">
              Strongest Man competitions are the ultimate test of raw strength, endurance, and mental toughness. 
              Athletes compete across multiple events including log lifts, tire flips, sandbag carries, yoke walks, 
              and more. It's not just about muscle—it's about strategy, technique, and the warrior spirit.
            </p>
          </motion.div>

          {/* Why University-Level Championships Matter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="mb-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c41e3a] rounded-xl p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-6 text-center ">
              <GraduationCap className="w-12 h-12 text-[#d4af37]" />
              <h3 className="text-[#d4af37] text-center">Why University-Level Championships Matter ?</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-[#b0b0b0]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#c41e3a] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">Student Development</h4>
                  <p className="text-sm">Build discipline, resilience, and competitive spirit that extends beyond the gym</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#c41e3a] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">Campus Culture</h4>
                  <p className="text-sm">Create vibrant sports culture and unite students around athletic excellence</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#c41e3a] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">Talent Pipeline</h4>
                  <p className="text-sm">Discover and nurture India's next generation of strength athletes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#c41e3a] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">National Platform</h4>
                  <p className="text-sm">Provide structured pathway from campus to state and national championships</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What We Do - Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="mb-4 text-[#d4af37]">What We Do</h3>
              <p className="text-[#b0b0b0] max-w-2xl mx-auto">
                Bringing world-class strongman competitions to university campuses across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#c41e3a] transition-all"
              >
                <ImageWithFallback
                  src={featureImages.strongmanCompetition}
                  alt="Strongman Competition"
                  className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-xl mb-2">Elite Strongman Events</h4>
                  <p className="text-[#b0b0b0] text-sm">Professional-grade equipment and competition standards for campus championships</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#c41e3a] transition-all"
              >
                <ImageWithFallback
                  src= {featureImages.universityChampionship}
                  alt="University Championship"
                  className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-xl mb-2">University-Level Excellence</h4>
                  <p className="text-[#b0b0b0] text-sm">Building competitive sports culture on campuses with professional organization</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#c41e3a] transition-all"
              >
                <ImageWithFallback
                  src= {featureImages.strengthTraining}
                  alt="Strength Training"
                  className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-xl mb-2">Power & Performance</h4>
                  <p className="text-[#b0b0b0] text-sm">Training the next generation of India's strongest athletes with proper technique</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#c41e3a] transition-all"
              >
                <ImageWithFallback
                  src= {featureImages.championshipTrophy}
                  alt="Championship Trophy"
                  className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-xl mb-2">Champions & Glory</h4>
                  <p className="text-[#b0b0b0] text-sm">Recognition, prizes, and pathway to state and national championships</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Events Section */}
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-[#d4af37]">Championship Events</h3>
            <p className="text-[#b0b0b0] max-w-2xl mx-auto">
              Five grueling events designed to test every aspect of human strength
            </p>
          </div>

          {/* Event Cards Grid - Responsive with improved touch targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEventIndex(index)}
                className="group cursor-pointer bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl overflow-hidden border-2 border-[#2a2a2a] md:hover:border-[#d4af37] active:border-[#c41e3a] transition-all shadow-lg md:hover:shadow-xl md:hover:shadow-[#d4af37]/20"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="inline-block bg-[#c41e3a] text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                      Event {index + 1}
                    </span>
                    <h4 className="text-white font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">{event.title}</h4>
                    <p className="text-[#d4af37] text-xs sm:text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Tap for details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category & Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#c41e3a]/20 to-[#d4af37]/20 border-l-4 border-[#d4af37] p-6 rounded"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div>
                <h4 className="text-white font-bold mb-2">Category: Open (18+)</h4>
                <p className="text-[#b0b0b0]">All enrolled university/college students aged 18 and above are eligible to compete</p>
              </div>
              <a 
                href="#athletes"
                className="bg-[#d4af37] hover:bg-[#b8941f] text-black px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap"
              >
                Athlete Registration →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEventIndex !== null && events[selectedEventIndex] && (
        <EventModal
          isOpen={selectedEventIndex !== null}
          setIsOpen={(open) => !open && setSelectedEventIndex(null)}
          title={events[selectedEventIndex].title}
          image={events[selectedEventIndex].image}
          details={events[selectedEventIndex].details}
          note={events[selectedEventIndex].note}
          currentIndex={selectedEventIndex}
          totalEvents={events.length}
          onPrev={selectedEventIndex > 0 ? () => setSelectedEventIndex(selectedEventIndex - 1) : undefined}
          onNext={selectedEventIndex < events.length - 1 ? () => setSelectedEventIndex(selectedEventIndex + 1) : undefined}
        />
      )}

      {/* Universities & Colleges Section */}
      <section id="universities" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        {/* Logo Watermark - Mobile Only (No Glows) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:opacity-[0.03] pointer-events-none flex items-center justify-center rotate-12">
          <img src={logo} alt="" loading="lazy" className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain" />
        </div>

        {/* Animated Energy Pulses - Desktop Only */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[140px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Building2 className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
            <h2 className="mb-6 text-[#d4af37]">Universities & Colleges</h2>
            <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
              Host a Fight Club Championship at your campus and become part of India's elite strength sports movement
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-6 rounded-lg text-center transition-all"
            >
              <Users className="w-12 h-12 text-[#c41e3a] mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Student Engagement</h4>
              <p className="text-sm text-[#b0b0b0]">Boost participation in sports and fitness activities across campus</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-6 rounded-lg text-center transition-all"
            >
              <Trophy className="w-12 h-12 text-[#c41e3a] mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Campus Prestige</h4>
              <p className="text-sm text-[#b0b0b0]">Elevate your institution's reputation in competitive sports</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-6 rounded-lg text-center transition-all"
            >
              <Dumbbell className="w-12 h-12 text-[#c41e3a] mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Fitness Culture</h4>
              <p className="text-sm text-[#b0b0b0]">Inspire healthy lifestyle and athletic excellence</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-6 rounded-lg text-center transition-all"
            >
              <Star className="w-12 h-12 text-[#c41e3a] mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Media Exposure</h4>
              <p className="text-sm text-[#b0b0b0]">Gain visibility through professional coverage and promotion</p>
            </motion.div>
          </div>

          {/* Host Championship Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#c41e3a]/10 to-[#d4af37]/10 border-2 border-[#d4af37] rounded-xl p-8 md:p-12 text-center"
          >
            <h3 className="mb-4 text-[#d4af37]">Host a Championship at Your Campus</h3>
            <p className="text-[#b0b0b0] mb-8 max-w-2xl mx-auto">
              Interested in bringing the Strongest Man Championship to your university? Get in touch with us to discuss hosting opportunities, logistics, and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:universities@fightclubchampionship.com"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-2 border-[#d4af37] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Athletes Section */}
      <section id="athletes" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {/* Logo Watermark - Mobile Only (No Glows) */}
        <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 opacity-[0.08] md:opacity-[0.04] pointer-events-none flex items-center justify-center -rotate-12">
          <img src={logo} alt="" loading="lazy" className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain" />
        </div>

        {/* Animated Red Energy - Desktop Only */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="hidden md:block absolute top-1/4 right-1/4 w-96 h-96 bg-[#c41e3a] rounded-full blur-[140px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Shield className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
            <h2 className="mb-6 text-[#d4af37]">For Athletes</h2>
            <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
              Everything you need to know about competing in the Strongest Man University Championships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Who Can Participate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] p-8 rounded-xl"
            >
              <Target className="w-10 h-10 text-[#c41e3a] mb-4" />
              <h3 className="mb-4 text-white">Who Can Participate</h3>
              <ul className="space-y-3 text-[#b0b0b0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Age 18 years and above</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Currently enrolled in university/college</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Valid student ID required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Medical clearance certificate</span>
                </li>
              </ul>
            </motion.div>

            {/* Registration Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] p-8 rounded-xl"
            >
              <Award className="w-10 h-10 text-[#c41e3a] mb-4" />
              <h3 className="mb-4 text-white">Registration Process</h3>
              <ol className="space-y-3 text-[#b0b0b0]">
                <li className="flex items-start gap-2">
                  <span className="bg-[#c41e3a] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Fill online registration form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#c41e3a] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Submit required documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#c41e3a] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Pay registration fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#c41e3a] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Receive confirmation & event details</span>
                </li>
              </ol>
            </motion.div>

            {/* Code of Conduct */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] p-8 rounded-xl"
            >
              <Zap className="w-10 h-10 text-[#c41e3a] mb-4" />
              <h3 className="mb-4 text-white">Code of Conduct</h3>
              <ul className="space-y-3 text-[#b0b0b0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Respect all athletes and officials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Follow all safety protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>No performance-enhancing substances</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Maintain sportsmanship at all times</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Safety Disclaimer & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#c41e3a]/20 to-[#d4af37]/20 border-l-4 border-[#d4af37] p-6 rounded mb-8"
          >
            <h4 className="text-white font-bold mb-2">⚠️ Safety Disclaimer</h4>
            <p className="text-[#b0b0b0] text-sm">
              Strongest Man competitions involve heavy lifting and intense physical exertion. All athletes compete at their own risk. 
              Medical clearance is mandatory. Proper training, technique, and supervision are essential. 
              Fight Club Championship and host institutions are not liable for injuries sustained during competition.
            </p>
          </motion.div>

          <div className="text-center">
            <a
              href="mailto:athletes@fightclubchampionship.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
            >
              Register as Athlete
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Vision & Roadmap Section */}
      <section id="roadmap" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TrendingUp className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
            <h2 className="mb-6 text-[#d4af37]">Vision & Roadmap</h2>
            <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
              Our journey to build India's most comprehensive strength sports ecosystem
            </p>
          </motion.div>

          {/* Mobile Timeline (stacked) */}
          <div className="md:hidden space-y-6">
            {/* Phase 1 - Current */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-4 border-[#d4af37]"
            >
              <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-[#c41e3a] border-4 border-[#d4af37] rounded-full w-8 h-8 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b1526] p-4 sm:p-5 rounded-xl border-2 border-[#d4af37]">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-[#d4af37] text-black px-2 py-0.5 rounded-full text-xs font-bold">CURRENT</div>
                  <h3 className="text-white text-base sm:text-lg">Phase 1: University Championships</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Establishing championships at individual universities and colleges across India. Building campus-level strength sports culture.
                </p>
              </div>
            </motion.div>

            {/* Phase 2 - Planned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-4 border-[#c41e3a]"
            >
              <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#c41e3a] rounded-full w-8 h-8 flex items-center justify-center">
                <div className="bg-[#c41e3a] rounded-full w-3 h-3"></div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c41e3a] p-4 sm:p-5 rounded-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-[#c41e3a] text-white px-2 py-0.5 rounded-full text-xs font-bold">PLANNED</div>
                  <h3 className="text-white text-base sm:text-lg">Phase 2: Inter-University Meets</h3>
                </div>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  Regional championships bringing together top athletes from multiple universities.
                </p>
              </div>
            </motion.div>

            {/* Phase 3 - Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-4 border-[#d4af37]/50"
            >
              <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#d4af37]/50 rounded-full w-8 h-8 flex items-center justify-center">
                <div className="bg-[#d4af37]/50 rounded-full w-3 h-3"></div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#d4af37]/50 p-4 sm:p-5 rounded-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-[#d4af37]/50 text-white px-2 py-0.5 rounded-full text-xs font-bold">VISION</div>
                  <h3 className="text-white text-base sm:text-lg">Phase 3: State-Level Championships</h3>
                </div>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  State championships crowning the strongest athletes from each region.
                </p>
              </div>
            </motion.div>

            {/* Phase 4 - Long-term */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-4 border-[#808080]"
            >
              <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#808080] rounded-full w-8 h-8 flex items-center justify-center">
                <div className="bg-[#808080] rounded-full w-3 h-3"></div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#808080] p-4 sm:p-5 rounded-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-[#808080] text-white px-2 py-0.5 rounded-full text-xs font-bold">LONG-TERM</div>
                  <h3 className="text-white text-base sm:text-lg">Phase 4: National Platform</h3>
                </div>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  National Championships and international representation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Desktop Timeline (alternating) */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#c41e3a] via-[#d4af37] to-[#808080]"></div>

            {/* Phase 1 - Current */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="w-1/2 text-right pr-8">
                  <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b1526] p-6 rounded-xl border-2 border-[#d4af37] inline-block">
                    <div className="flex items-center gap-3 justify-end mb-3">
                      <h3 className="text-white">Phase 1: University Championships</h3>
                      <div className="bg-[#d4af37] text-black px-3 py-1 rounded-full text-xs font-bold">CURRENT</div>
                    </div>
                    <p className="text-white/80 text-sm">
                      Establishing championships at individual universities and colleges across India. 
                      Building campus-level strength sports culture and identifying talent.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#c41e3a] border-4 border-[#d4af37] rounded-full w-8 h-8 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/2"></div>
              </div>
            </motion.div>

            {/* Phase 2 - Planned */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#c41e3a] rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-[#c41e3a] rounded-full w-4 h-4"></div>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c41e3a] p-6 rounded-xl inline-block">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#c41e3a] text-white px-3 py-1 rounded-full text-xs font-bold">PLANNED</div>
                      <h3 className="text-white">Phase 2: Inter-University Meets</h3>
                    </div>
                    <p className="text-[#b0b0b0] text-sm">
                      Regional championships bringing together top athletes from multiple universities. 
                      Creating inter-campus rivalries and raising competitive standards.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 3 - Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="w-1/2 text-right pr-8">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#d4af37]/50 p-6 rounded-xl inline-block">
                    <div className="flex items-center gap-3 justify-end mb-3">
                      <h3 className="text-white">Phase 3: State-Level Championships</h3>
                      <div className="bg-[#d4af37]/50 text-white px-3 py-1 rounded-full text-xs font-bold">VISION</div>
                    </div>
                    <p className="text-[#b0b0b0] text-sm">
                      State championships crowning the strongest athletes from each region. 
                      Building pathway to national representation and professional sports careers.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#d4af37]/50 rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-[#d4af37]/50 rounded-full w-4 h-4"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </motion.div>

            {/* Phase 4 - Long-term */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border-4 border-[#808080] rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-[#808080] rounded-full w-4 h-4"></div>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#808080] p-6 rounded-xl inline-block">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#808080] text-white px-3 py-1 rounded-full text-xs font-bold">LONG-TERM</div>
                      <h3 className="text-white">Phase 4: National Platform</h3>
                    </div>
                    <p className="text-[#b0b0b0] text-sm">
                      National Championships and international representation. 
                      Establishing India as a powerhouse in global strength sports competitions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Future Expansion Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-r from-[#c41e3a]/10 to-[#d4af37]/10 border-2 border-[#d4af37] rounded-xl p-6 sm:p-8 md:p-10"
          >
            <Trophy className="w-12 h-12 md:w-14 md:h-14 text-[#d4af37] mx-auto mb-4" />
            <h3 className="mb-4 text-[#d4af37] text-xl sm:text-2xl md:text-3xl">Beyond Strongest Man</h3>
            <p className="text-[#b0b0b0] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
              Our vision extends beyond strength sports, creating a comprehensive athletic ecosystem for Indian universities.
            </p>
            <div className="bg-black/30 border border-[#d4af37]/30 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
              <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed">
                We plan to introduce – <span className="text-[#d4af37]">Wrestling</span>, <span className="text-[#d4af37]">Arm wrestling</span>, and combat sports especially – <span className="text-[#c41e3a] font-bold">MMA (mixed martial arts)</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop Section - Coming Soon */}
      <Shop logo={logo} />

      {/* Contact & Footer */}
      <ContactFooter
        logo={logo}
        formData={formData}
        formSubmitted={formSubmitted}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}