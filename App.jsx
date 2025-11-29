
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, EngineeringAbstractScene } from './components/QuantumScene';
import { SkillsDiagram, ProjectFlowDiagram, StatsDiagram } from './components/Diagrams';
import LoadingScreen from './components/LoadingScreen';
import { ArrowDown, Menu, X, BookOpen, Code, Terminal, Mail, Linkedin, Github, ExternalLink, Folder } from 'lucide-react';

const ContactCard = ({ platform, handle, link, delay, icon: Icon }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50 cursor-pointer" style={{ animationDelay: delay }}>
      <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-700 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-2">{platform}</h3>
      <div className="w-8 h-0.5 bg-nobel-gold mb-3 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{handle}</p>
    </a>
  );
};

const ProjectCard = ({ title, description, tech, link, delay }) => {
  return (
    <div 
      className="group bg-stone-800 rounded-xl border border-stone-700 p-6 hover:border-nobel-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-nobel-gold/10"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center text-nobel-gold group-hover:bg-nobel-gold group-hover:text-stone-900 transition-colors">
          <Folder size={24} />
        </div>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-nobel-gold transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      
      <h3 className="font-serif text-xl text-white mb-3 group-hover:text-nobel-gold transition-colors">
        {title}
      </h3>
      
      <p className="text-stone-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span 
            key={idx}
            className="text-xs px-2 py-1 bg-stone-700/50 text-stone-300 rounded border border-stone-600"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const projects = [
    {
      title: "AI-Powered Chatbot",
      description: "Developed an intelligent conversational AI using NLP techniques and machine learning to provide automated customer support with high accuracy.",
      tech: ["Python", "TensorFlow", "Flask", "NLP"],
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Built a full-stack online shopping platform with real-time inventory management, secure payment integration, and responsive design.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created an interactive analytics dashboard for visualizing complex datasets with customizable charts and real-time data updates.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      link: "#"
    },
    {
      title: "Task Management System",
      description: "Designed a collaborative task tracking application with team management features, deadlines, and progress monitoring capabilities.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Weather Forecast App",
      description: "Developed a mobile-responsive weather application that provides accurate forecasts using external API integration and geolocation services.",
      tech: ["JavaScript", "OpenWeather API", "CSS3"],
      link: "#"
    },
    {
      title: "Portfolio Generator",
      description: "Created an automated portfolio builder that generates professional developer portfolios from GitHub data and customizable templates.",
      tech: ["React", "GitHub API", "Vite"],
      link: "#"
    }
  ];

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">HR</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              HARSHITH R <span className="font-normal text-stone-500 text-sm">PORTFOLIO</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Skills</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Projects</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Hire Me
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Skills</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Projects</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Portfolio • 2024
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Harshith R <br/><span className="italic font-normal text-stone-600 text-2xl md:text-4xl block mt-6">Engineering Student & Innovator</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Pursuing 2nd Year Engineering. Building the future through code, design, and complex problem solving.
          </p>
          
          <div className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>EXPLORE</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* About */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            {/* Profile Photo Section */}
            <div className="flex justify-center mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nobel-gold to-stone-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="Harshith R" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-nobel-gold to-stone-600 flex items-center justify-center hidden">
                    <span className="text-white font-serif font-bold text-6xl md:text-7xl">HR</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">About Me</div>
                <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">The Engineering Journey</h2>
                <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              </div>
              <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
                <p>
                  <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">A</span>s a dedicated 2nd-year engineering student, I am constantly exploring the intersection of theoretical principles and practical application. My journey is defined by a curiosity for how things work and a drive to create systems that solve real-world problems.
                </p>
                <p>
                  I am actively building a strong foundation in computer science and core engineering concepts. From algorithms to system design, I strive for excellence in every project I undertake, believing that clean code and robust architecture are art forms in themselves.
                </p>
              </div>
            </div>

            {/* Educational Timeline */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Educational Journey</div>
                <h2 className="font-serif text-4xl mb-6 text-stone-900">Timeline</h2>
                <div className="w-16 h-1 bg-nobel-gold mx-auto"></div>
              </div>

              <div className="max-w-4xl mx-auto relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nobel-gold via-stone-300 to-nobel-gold"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* Birth */}
                  <div className="relative flex items-center md:justify-start">
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-nobel-gold rounded-full border-4 border-white shadow-md transform -translate-x-1/2"></div>
                    <div className="ml-20 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-sm font-bold text-nobel-gold mb-2">November 20, 2005</div>
                        <h3 className="font-serif text-xl text-stone-900 mb-2">Born</h3>
                        <p className="text-stone-600 text-sm">The beginning of my journey</p>
                      </div>
                    </div>
                  </div>

                  {/* School */}
                  <div className="relative flex items-center md:justify-end">
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-nobel-gold rounded-full border-4 border-white shadow-md transform -translate-x-1/2"></div>
                    <div className="ml-20 md:ml-0 md:w-1/2 md:pl-12">
                      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-sm font-bold text-nobel-gold mb-2">2010 - 2022</div>
                        <h3 className="font-serif text-xl text-stone-900 mb-2">Prarthana Central School</h3>
                        <p className="text-stone-600 text-sm">Completed schooling and built foundational knowledge</p>
                      </div>
                    </div>
                  </div>

                  {/* Pre-University */}
                  <div className="relative flex items-center md:justify-start">
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-nobel-gold rounded-full border-4 border-white shadow-md transform -translate-x-1/2"></div>
                    <div className="ml-20 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-sm font-bold text-nobel-gold mb-2">2022 - 2024</div>
                        <h3 className="font-serif text-xl text-stone-900 mb-2">Alva's Pre-University College</h3>
                        <p className="text-stone-600 text-sm">Pre-university education with focus on science and mathematics</p>
                      </div>
                    </div>
                  </div>

                  {/* University - Current */}
                  <div className="relative flex items-center md:justify-end">
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-nobel-gold rounded-full border-4 border-white shadow-md transform -translate-x-1/2 animate-pulse"></div>
                    <div className="ml-20 md:ml-0 md:w-1/2 md:pl-12">
                      <div className="bg-gradient-to-br from-nobel-gold/10 to-stone-100 p-6 rounded-xl border-2 border-nobel-gold shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-sm font-bold text-nobel-gold mb-2">2024 - Present</div>
                        <h3 className="font-serif text-xl text-stone-900 mb-2">Jain University</h3>
                        <p className="text-stone-600 text-sm">Pursuing Bachelor of Engineering</p>
                        <div className="mt-3 inline-block px-3 py-1 bg-nobel-gold text-white text-xs font-bold rounded-full">
                          Currently Enrolled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <Code size={14}/> CAPABILITIES
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Technical Skills</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           My skillset spans across various domains of software engineering and design. I believe in being language-agnostic, adapting to the best tool for the job.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            Interact with the grid to explore my proficiency areas. From low-level languages like C++ to modern web frameworks like React, I am building a versatile toolkit.
                        </p>
                    </div>
                    <div>
                        <SkillsDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Projects Section with Cards */}
        <section id="projects" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                        FEATURED WORK
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">My Projects</h2>
                    <p className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
                        A collection of projects showcasing my skills in software development, problem-solving, and innovative thinking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            title={project.title}
                            description={project.description}
                            tech={project.tech}
                            link={project.link}
                            delay={`${idx * 0.1}s`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
                     <div className="order-2 lg:order-1">
                        <ProjectFlowDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            METHODOLOGY
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Project Workflow</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Every project begins with a clear understanding of the problem. I apply a systematic approach to development, ensuring that the architecture is scalable and the code is maintainable.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            My workflow emphasizes iterative testing and refinement. Whether it's a simple script or a complex web application, the goal is always efficient, clean, and bug-free execution.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Stats / Academic */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Academic & Development Stats</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        Consistency is key. I track my progress not just by grades, but by the practical skills I acquire and the efficiency I demonstrate in coding challenges.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <StatsDiagram />
                </div>
            </div>
        </section>

        {/* Future Vision / 3D Abstract */}
        <section className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <EngineeringAbstractScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Abstract visualization of structured logic</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">VISION</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Building for Tomorrow</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        As I progress through my engineering degree, my focus is shifting towards scalable systems and emerging technologies. I am particularly interested in how software can optimize physical processes.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        I am always open to collaboration on open-source projects or academic research that pushes the boundaries of what's possible with current technology.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Engineering is not merely knowing and being knowledgeable, like a walking encyclopedia; engineering is not merely analysis; engineering is not merely the possession of the capacity to get elegant solutions to non-existent engineering problems; engineering is practicing the art of the organized forcing of technological change."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Dean Gordon Brown</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">GET IN TOUCH</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Connect With Me</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">I'm currently open to internships and collaborative projects.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <ContactCard 
                        platform="LinkedIn" 
                        handle="@HarshithR" 
                        link="https://www.linkedin.com/in/harshith-r-a2b18921a/"
                        delay="0s" 
                        icon={Linkedin}
                    />
                    <ContactCard 
                        platform="GitHub" 
                        handle="@HarshithDev" 
                        link="https://github.com/Harshithr-ui"
                        delay="0.1s" 
                        icon={Github}
                    />
                    <ContactCard 
                        platform="Email" 
                        handle="rharshith576@gmail.com" 
                        link="mailto:rharshith576@gmail.com"
                        delay="0.2s" 
                        icon={Mail}
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Harshith R</div>
                <p className="text-sm">Engineering Student Portfolio • 2024</p>
            </div>
            <div className="text-xs text-stone-600">
                Designed with React, Three.js & Tailwind
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
