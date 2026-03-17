import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Lenis from 'lenis';

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const services = [
  {
    title: 'Développement Web',
    description: 'Des sites web et applications sur mesure, performants, sécurisés et conçus pour évoluer avec votre entreprise.',
  },
  {
    title: 'Funnel building & Marketing digital',
    description: 'Des campagnes basées sur les données et des tunnels de conversion conçus pour maximiser votre ROI.',
  },
  {
    title: 'Design Graphique',
    description: 'Une identité visuelle cohérente et professionnelle qui permet à votre entreprise de se démarquer.',
  },
  {
    title: 'SEO',
    description: 'Des stratégies SEO techniques et de contenu pour améliorer votre visibilité sur les moteurs de recherche.',
  },
  {
    title: 'Publicité en Ligne',
    description: 'Des campagnes publicitaires ciblées sur les réseaux sociaux et moteurs de recherche pour attirer des prospects qualifiés.',
  },
  {
    title: 'Production Vidéo',
    description: 'Des vidéos promotionnelles et du contenu d\'entreprise de haute qualité pour communiquer efficacement votre message.',
  }
];

const realisations = [
  {
    title: 'Shape of Key',
    category: 'Développement Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: 'https://shapeofkey.com/',
  },
  {
    title: 'ONG FÄ ET et Culture Africaine',
    category: 'Design & Web',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    link: 'https://ongfaet.org/',
  },
  {
    title: 'GCBÊ',
    category: 'Marketing Digital',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    link: 'https://gcbe.bj/',
  },
  {
    title: 'SculptBelt',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    link: 'https://sculptbelt.com/',
  },
  {
    title: 'Créations Graphiques',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.behance.net/strateek',
  },
  {
    title: 'Campagne SEO',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
    link: '#',
  }
];

const testimonials = [
  {
    name: 'Koffi Mensah',
    role: 'CEO chez TechStart Africa (Ghana)',
    content: '"Strateek a complètement transformé notre présence en ligne. Leur équipe a livré des résultats au-delà de nos attentes avec professionnalisme et innovation."',
  },
  {
    name: 'Amara Okonkwo',
    role: 'Directrice Marketing chez Global Solutions (Nigeria)',
    content: '"Un travail exceptionnel. L\'approche stratégique et l\'attention aux détails dans chaque projet ont eu un impact significatif sur la croissance de notre entreprise."',
  },
  {
    name: 'Jean Dupont',
    role: 'Fondateur chez Creative Agency (France)',
    content: '"Professionnels, fiables et axés sur les résultats. Strateek fournit constamment un travail de qualité qui dépasse nos attentes."',
  },
  {
    name: 'Sèna Houngbédji',
    role: 'Directrice Générale de Bénin AgroTech (Bénin)',
    content: '"Grâce à Strateek, notre entreprise a pu digitaliser ses offres et toucher une clientèle beaucoup plus large. Une équipe locale avec une vision internationale !"',
  },
  {
    name: 'Michael Chen',
    role: 'VP of Growth chez InnovateX (Singapour)',
    content: '"The Strateek team brought a fresh perspective to our digital campaigns. Their SEO and content strategies yielded a 150% increase in our organic traffic."',
  },
  {
    name: 'Aïcha Traoré',
    role: 'Fondatrice de Sahel Cosmétiques (Sénégal)',
    content: '"Leur expertise en e-commerce et en design graphique a donné une nouvelle vie à notre marque. Nous recommandons vivement Strateek pour tout projet digital."',
  },
  {
    name: 'David Smith',
    role: 'Marketing Manager at FinServe (Royaume-Uni)',
    content: '"Strateek\'s funnel building capabilities are top-notch. They helped us streamline our lead generation process, resulting in higher conversion rates."',
  },
  {
    name: 'Olympe Kpadonou',
    role: 'Gérant de Cotonou Logistics (Bénin)',
    content: '"Une agence réactive et à l\'écoute. La refonte de notre site web a été un succès total, nous permettant de mieux présenter nos services logistiques."',
  }
];

// Simple SVG Arrow to avoid heavy icon libraries
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const Logo = ({ light = false }: { light?: boolean }) => {
  const maskId = `hole-mask-${light ? 'light' : 'dark'}`;
  return (
    <div className="flex items-center gap-2.5">
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <circle cx="18" cy="50" r="5" fill="black" />
            <circle cx="72.6" cy="72.6" r="5" fill="black" />
          </mask>
        </defs>
        
        <g mask={`url(#${maskId})`}>
          {/* Outer Circle (Closed as requested) */}
          <circle cx="50" cy="50" r="32" stroke="#00B4D8" strokeWidth="5" fill="none" />
          
          {/* Lines from center */}
          <line x1="38" y1="50" x2="18" y2="50" stroke="#00B4D8" strokeWidth="5" />
          <line x1="58.5" y1="58.5" x2="72.6" y2="72.6" stroke="#00B4D8" strokeWidth="5" />
        </g>
        
        {/* Arrow (Longer line as requested) */}
        <line x1="58.5" y1="41.5" x2="96" y2="4" stroke="#00B4D8" strokeWidth="5" strokeLinecap="round" />
        <polyline points="80 4 96 4 96 20" stroke="#00B4D8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        {/* Inner Circle (Transparent inside) */}
        <circle cx="50" cy="50" r="12" stroke="#00B4D8" strokeWidth="5" fill="none" />
        
        {/* Nodes (Transparent inside) */}
        <circle cx="18" cy="50" r="5" stroke="#00B4D8" strokeWidth="5" fill="none" />
        <circle cx="72.6" cy="72.6" r="5" stroke="#00B4D8" strokeWidth="5" fill="none" />
      </svg>
      <span className={`font-bold text-xl md:text-2xl tracking-wider ${light ? 'text-white' : 'text-[#3F48CC]'}`}>
        STRATEEK
      </span>
    </div>
  );
};

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const { scrollYProgress: pageScroll } = useScroll();
  const scaleX = useSpring(pageScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Smoother, more modern interpolation
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo light={true} />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#realisations" className="hover:text-white transition-colors">Réalisations</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Témoignages</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#00B4D8] text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-[#0096B4] transition-colors"
          >
            Réserver un appel
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#111] pt-20">
        {/* Background Image with heavy blur and dark overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt="Équipe de l'agence digitale Strateek au Bénin travaillant sur un projet web" 
              className="w-full h-full object-cover opacity-40 blur-md scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#111]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mt-12 mb-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-sm font-medium mb-8"
          >
            <svg className="w-4 h-4 text-[#00B4D8]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            4.9/5 par plus de 50 clients satisfaits
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6"
          >
            L'Agence Digitale au Bénin <br className="hidden md:block" />
            qui Propulse Votre Croissance
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <strong>Strateek</strong> est votre partenaire stratégique pour la <strong>création de sites web</strong> performants, le <strong>référencement SEO</strong> et le <strong>marketing digital</strong>. Nous transformons votre présence en ligne en un véritable moteur d'acquisition.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#00B4D8] text-white rounded-lg font-medium text-base hover:bg-[#0096B4] transition-colors shadow-lg shadow-[#00B4D8]/20"
            >
              Démarrer mon projet
            </button>
          </motion.div>
        </div>

        {/* Bottom Logo Ticker */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center md:justify-between gap-8 opacity-50 grayscale">
            <div className="text-white font-bold text-xl tracking-widest">E-COMMERCE</div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-white font-bold text-xl tracking-widest">STARTUPS</div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-white font-bold text-xl tracking-widest">IMMOBILIER</div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-white font-bold text-xl tracking-widest">FINANCE</div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-white font-bold text-xl tracking-widest">INSTITUTIONS</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-main">Nos Services</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Des solutions digitales complètes conçues pour élever votre marque et générer des résultats mesurables.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-background p-8 rounded-xl border border-border shadow-pro hover:border-primary/30 transition-colors group"
              >
                {/* Minimalist accent line instead of heavy icons */}
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 group-hover:w-12 transition-all duration-300" />
                <h3 className="text-xl font-bold mb-3 text-text-main">{service.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Realisations Section */}
      <section id="realisations" className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-main">Nos Réalisations</h2>
            <p className="text-text-muted">Découvrez quelques-uns de nos projets récents et succès clients.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {realisations.map((item, index) => (
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm block cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      Voir le projet
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{item.category}</div>
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section (Matching User Screenshot) */}
      <section id="testimonials" className="py-24 bg-surface border-y border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-main">Ce qu'on dit de nous</h2>
            <p className="text-text-muted">Reconnus par des entreprises de premier plan dans divers secteurs</p>
          </motion.div>
        </div>
          
        <div className="relative w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee gap-6 px-3">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-lg border border-border flex flex-col h-full w-[350px] md:w-[400px] flex-shrink-0"
              >
                <div className="flex gap-1 mb-6 text-text-main text-lg">
                  ★★★★★
                </div>
                <p className="text-text-muted italic mb-8 flex-grow text-[15px] leading-relaxed">
                  {testimonial.content}
                </p>
                <div>
                  <div className="font-bold text-text-main text-sm">{testimonial.name}</div>
                  <div className="text-sm text-text-muted mt-0.5">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-main">Travaillons Ensemble</h2>
            <p className="text-text-muted">Prêt à démarrer votre prochain projet ? Remplissez le formulaire ci-dessous et notre équipe vous répondra sous 24 heures.</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-background p-8 md:p-12 rounded-xl border border-border"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2">Message envoyé !</h3>
                <p className="text-text-muted">Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2 border border-border rounded-md text-text-main hover:bg-surface transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Prénom</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Nom</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main">Adresse Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="jean@entreprise.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main">Comment pouvons-nous vous aider ?</label>
                  <textarea 
                    required
                    className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-32"
                    placeholder="Parlez-nous des objectifs de votre projet..."
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-md font-medium text-base hover:bg-text-main transition-colors">
                  Envoyer le Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left"
          >
            <motion.div variants={fadeInUp}>
              <div className="text-sm text-text-muted mb-1">Email</div>
              <a href="mailto:hello@strateek.com" className="text-primary font-medium hover:underline">hello@strateek.com</a>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-sm text-text-muted mb-1">Téléphone</div>
              <a href="tel:+2290157878794" className="text-primary font-medium hover:underline">+229 01 57 87 87 94</a>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-sm text-text-muted mb-1">Localisation</div>
              <div className="text-text-main font-medium">Cotonou, Bénin</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 bg-[#1E2532] border-t border-[#2A3441]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <Logo light={true} />
              </div>
              <p className="text-[#8B9BB4] text-sm leading-relaxed">
                Des solutions digitales premium pour les entreprises modernes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-[#8B9BB4]">
                <li><a href="#" className="hover:text-primary transition-colors">Développement Web</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Marketing Digital</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Design Graphique</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">SEO</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Entreprise</h4>
              <ul className="space-y-3 text-sm text-[#8B9BB4]">
                <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Suivez-nous</h4>
              <ul className="space-y-3 text-sm text-[#8B9BB4]">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2A3441] flex justify-center text-sm text-[#8B9BB4]">
            <div>© 2025 STRATEEK. Tous droits réservés.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
