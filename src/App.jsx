import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Home as HomeIcon, Info, Briefcase, Mail, MessageSquare, Smartphone, Code, Search, ShoppingCart, Server,
  LayoutDashboard, Settings, ShieldCheck, TrendingUp, Zap, Users, FileText, Send, Loader2, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Activity,
  Globe, Smartphone as SmartphoneIcon, GitFork, Database, Layers, Rocket, Target, Eye, Lightbulb, Award
} from 'lucide-react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import axios from 'axios';

function cn(...inputs) {
  return clsx(inputs);
}

const COMPANY_INFO = {
  name: "AC TECH",
  email: "edenlabsmz@gmail.com",
  whatsapp: "+258865097696",
  whatsappLink: "https://wa.me/258865097696?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20AC%20TECH.",
  slogan: "Transformamos ideias em soluções digitais reais",
  copyright: `© ${new Date().getFullYear()} AC TECH. Todos os direitos reservados.`,
};

const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Sobre Nós', path: '/sobre', icon: Info },
  { name: 'Serviços', path: '/servicos', icon: Briefcase },
  { name: 'Orçamento', path: '/orcamento', icon: FileText },
  { name: 'Contato', path: '/contato', icon: Mail },
];

const servicesData = [
  {
    id: 'sites',
    title: 'Criação de Sites Profissionais',
    price: 'desde 10.000 MZN',
    icon: Globe,
    color: 'text-brand-cyan',
    bgColor: 'bg-brand-cyan/10',
    description: 'Websites modernos, rápidos e otimizados para todos os dispositivos.',
    features: [
      { text: 'Design Responsivo (Desktop, Tablet, Mobile)', icon: SmartphoneIcon },
      { text: 'Domínio (.com, .co.mz, etc.) por 1 ano', icon: Globe },
      { text: 'Hospedagem Profissional por 1 ano', icon: Server },
      { text: 'Integração com WhatsApp e Redes Sociais', icon: MessageSquare },
      { text: 'Otimização para Google (SEO Básico)', icon: Search },
      { text: 'Painel de Administração (WordPress/Similar opcional)', icon: LayoutDashboard },
    ],
    benefits: [
      { text: 'Presença online profissional e credível', icon: Award },
      { text: 'Alcance mais clientes potenciais', icon: Users },
      { text: 'Comunicação facilitada com seu público', icon: MessageSquare },
      { text: 'Melhor visibilidade nos motores de busca', icon: TrendingUp },
    ]
  },
  {
    id: 'ecommerce',
    title: 'Lojas Online (E-commerce)',
    price: 'desde 18.000 MZN',
    icon: ShoppingCart,
    color: 'text-brand-purple',
    bgColor: 'bg-brand-purple/10',
    description: 'Venda seus produtos online com uma plataforma completa e segura.',
    features: [
      { text: 'Design personalizado e focado em conversão', icon: ShoppingCart },
      { text: 'Carrinho de compras intuitivo', icon: ShoppingCart },
      { text: 'Integração com M-Pesa, e-Mola, Cartões', icon: Activity },
      { text: 'Painel para gestão de produtos e estoque', icon: LayoutDashboard },
      { text: 'Notificações automáticas por Email/SMS', icon: Send },
      { text: 'Relatórios de vendas e desempenho', icon: FileText },
    ],
    benefits: [
      { text: 'Venda 24/7 para todo Moçambique (ou globalmente)', icon: Globe },
      { text: 'Gestão simplificada de inventário e pedidos', icon: Layers },
      { text: 'Aumente suas vendas e receita', icon: TrendingUp },
      { text: 'Ofereça conveniência aos seus clientes', icon: Zap },
    ]
  },
  {
    id: 'mobile',
    title: 'Apps Mobile (Android/iOS)',
    price: 'desde 25.000 MZN',
    icon: Smartphone,
    color: 'text-brand-lime',
    bgColor: 'bg-brand-lime/10',
    description: 'Aplicativos nativos ou híbridos para expandir seu alcance.',
    features: [
      { text: 'Desenvolvimento para Android e/ou iOS', icon: Smartphone },
      { text: 'Publicação na Google Play Store / Apple App Store', icon: Rocket },
      { text: 'Notificações Push para engajamento', icon: MessageSquare },
      { text: 'Design UI/UX moderno e intuitivo', icon: Eye },
      { text: 'Integração com serviços locais e APIs', icon: GitFork },
      { text: 'Manutenção e suporte pós-lançamento', icon: Settings },
    ],
    benefits: [
      { text: 'Maior engajamento e fidelização de clientes', icon: Users },
      { text: 'Acesso direto ao seu público no celular', icon: Smartphone },
      { text: 'Fortalecimento da marca e inovação', icon: Lightbulb },
      { text: 'Possibilidade de monetização e novos fluxos de receita', icon: TrendingUp },
    ]
  },
  {
    id: 'sistemas',
    title: 'Sistemas Web Personalizados',
    price: 'orçamento sob consulta',
    icon: Code,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    description: 'Soluções sob medida para otimizar processos e gestão.',
    features: [
      { text: 'Sistemas ERP, CRM, Gestão Escolar, etc.', icon: Layers },
      { text: 'Relatórios detalhados e dashboards interativos', icon: FileText },
      { text: 'Gestão de usuários e permissões avançadas', icon: Users },
      { text: 'Desenvolvimento de APIs locais integráveis', icon: GitFork },
      { text: 'Segurança robusta e proteção de dados', icon: ShieldCheck },
      { text: 'Escalabilidade para crescimento futuro', icon: Database },
    ],
    benefits: [
      { text: 'Automatização de tarefas e processos manuais', icon: Zap },
      { text: 'Otimização da eficiência operacional', icon: TrendingUp },
      { text: 'Tomada de decisão baseada em dados precisos', icon: Target },
      { text: 'Solução 100% adaptada às suas necessidades', icon: Settings },
    ]
  }
];

const faqData = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "O tempo de desenvolvimento varia conforme a complexidade. Um site institucional básico pode levar de 2 a 4 semanas, enquanto projetos mais complexos como e-commerce ou sistemas personalizados podem levar mais tempo."
  },
  {
    question: "O que está incluído na hospedagem e domínio?",
    answer: "Para sites e lojas online, o primeiro ano de domínio (ex: .com, .co.mz) e hospedagem profissional estão inclusos. Após o primeiro ano, há uma taxa anual de renovação."
  },
  {
    question: "Vocês oferecem suporte após a entrega do projeto?",
    answer: "Sim, oferecemos um período de suporte técnico gratuito após a entrega para corrigir eventuais bugs. Planos de manutenção contínua também estão disponíveis."
  },
  {
    question: "Como funcionam os pagamentos para e-commerce em Moçambique?",
    answer: "Integramos sua loja online com as principais plataformas de pagamento em Moçambique, como M-Pesa e e-Mola, além de cartões de crédito/débito internacionais, se necessário."
  }
];

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-cyan text-dark-bg hover:bg-brand-cyan/90",
        destructive: "bg-red-500 text-dark-text hover:bg-red-500/90",
        outline: "border border-input bg-transparent hover:bg-dark-card hover:text-dark-text",
        secondary: "bg-brand-purple text-dark-text hover:bg-brand-purple/80",
        ghost: "hover:bg-dark-card hover:text-dark-text",
        link: "text-brand-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button"


const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm ring-offset-dark-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-dark-text",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm ring-offset-dark-bg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-dark-text",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-dark-text-secondary", className)}
    {...props}
  />
));
Label.displayName = "Label"

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedSection = ({ children, className, once = true, amount = 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <span className="text-3xl font-bold text-brand-cyan">AC</span>
            <span className="text-3xl font-bold text-white"> TECH</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out",
                      isActive ? "bg-brand-cyan text-dark-bg" : "text-dark-text-secondary hover:bg-dark-card hover:text-white"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-text-secondary hover:text-white hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-cyan"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out",
                      isActive ? "bg-brand-cyan text-dark-bg" : "text-dark-text-secondary hover:bg-dark-card hover:text-white"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-card text-dark-text-secondary border-t border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-sm">{COMPANY_INFO.slogan}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={`footer-${link.name}`}>
                  <Link to={link.path} className="hover:text-brand-cyan transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-brand-cyan transition-colors duration-300 flex items-center"><Mail className="w-4 h-4 mr-2" /> {COMPANY_INFO.email}</a></li>
              <li><a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors duration-300 flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> {COMPANY_INFO.whatsapp}</a></li>
            </ul>
            <div className="mt-4 flex space-x-4">
              {/* Placeholder icons, replace with actual links if you have them */}
              <a href="#" className="hover:text-brand-cyan"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
              <a href="#" className="hover:text-brand-cyan"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm">
          <p>{COMPANY_INFO.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <motion.a
      href={COMPANY_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl z-40 flex items-center justify-center"
      whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(34,197,94,0.7)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label="Contactar via WhatsApp"
    >
      <MessageSquare size={28} />
    </motion.a>
  );
}

function HomePage() {
  const servicesSummary = servicesData.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{COMPANY_INFO.name} - Soluções Digitais em Moçambique</title>
        <meta name="description" content="Criação de websites, aplicativos mobile e sistemas personalizados em Moçambique. Transformamos suas ideias em realidade digital." />
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        <div
            className="absolute inset-0 -z-10 h-full w-full bg-dark-bg bg-[linear-gradient(to_right,#2d3748_1px,transparent_1px),linear-gradient(to_bottom,#2d3748_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div
                className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-cyan opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <AnimatedSection>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-lime">
                {COMPANY_INFO.name}
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-dark-text-secondary mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {COMPANY_INFO.slogan}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link to="/servicos">
                <Button size="lg" variant="default" className="mr-4 mb-4 sm:mb-0 group">
                  Nossos Serviços <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                </Button>
              </Link>
              <Link to="/orcamento">
                <Button size="lg" variant="outline">
                  Pedir Orçamento <FileText className="ml-2 h-5 w-5"/>
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>

      <section id="services-summary" className="py-16 sm:py-24 bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Nossas Especialidades</h2>
            <p className="text-lg text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
              Oferecemos um leque de soluções digitais para impulsionar o seu negócio em Moçambique.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesSummary.map((service, index) => (
              <AnimatedSection key={service.id} className="h-full">
                <motion.div 
                  className="bg-dark-bg p-8 rounded-xl shadow-2xl h-full flex flex-col border border-slate-700 hover:border-brand-purple transition-colors duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(153,51,255,0.2)"}}
                >
                  <div className={`p-3 rounded-full ${service.bgColor} ${service.color} w-max mb-6`}>
                    <service.icon size={32} />
                  </div>
                  <h3 className={`text-2xl font-semibold mb-3 ${service.color}`}>{service.title}</h3>
                  <p className="text-dark-text-secondary mb-4 text-sm flex-grow">{service.description}</p>
                  <Link to={`/servicos#${service.id}`}>
                    <Button variant="link" className={`p-0 ${service.color}`}>
                      Saber Mais <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                    </Button>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
           <AnimatedSection className="text-center mt-12">
             <Link to="/servicos">
                <Button size="lg" variant="secondary">
                    Ver Todos os Serviços <Briefcase className="ml-2 h-5 w-5"/>
                </Button>
              </Link>
           </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Porquê Escolher a <span className="text-brand-cyan">AC TECH</span>?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lightbulb, title: "Inovação Constante", text: "Estamos sempre atualizados com as últimas tecnologias e tendências do mercado." },
              { icon: Target, title: "Foco no Cliente", text: "Suas necessidades e objetivos são a nossa prioridade em cada projeto." },
              { icon: Award, title: "Qualidade Garantida", text: "Entregamos soluções robustas, testadas e com alto padrão de qualidade." }
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <div className="p-6 bg-dark-card rounded-lg shadow-lg border border-slate-700">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-brand-lime/10 text-brand-lime">
                      <item.icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-dark-text-secondary text-sm">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós - {COMPANY_INFO.name}</title>
        <meta name="description" content={`Conheça a missão, visão e experiência da ${COMPANY_INFO.name} no desenvolvimento de soluções digitais em Moçambique.`} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Sobre a <span className="text-brand-cyan">AC TECH</span></h1>
          <p className="text-xl text-dark-text-secondary text-center mb-12 max-w-3xl mx-auto">
            Somos uma equipa apaixonada por tecnologia, dedicada a criar soluções digitais inovadoras que impulsionam negócios em Moçambique.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhbSUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" alt="Equipa AC TECH" className="rounded-lg shadow-2xl w-full h-auto object-cover aspect-video" />
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="text-3xl font-semibold text-brand-purple mb-4">Nossa Experiência</h2>
            <p className="text-dark-text-secondary mb-4">
              Com anos de experiência no mercado de desenvolvimento de software, a AC TECH consolidou-se como uma parceira tecnológica confiável para empresas de diversos portes e setores. Nossa jornada é marcada pela entrega de projetos de sucesso, sempre focados nas necessidades específicas de cada cliente e nas particularidades do mercado moçambicano.
            </p>
            <p className="text-dark-text-secondary">
              Dominamos uma vasta gama de tecnologias, desde o desenvolvimento web front-end e back-end, até a criação de aplicativos mobile nativos e híbridos, e sistemas de gestão complexos. Estamos preparados para enfrentar os desafios mais exigentes e transformar suas ideias em realidade digital.
            </p>
          </AnimatedSection>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-dark-card p-8 rounded-lg shadow-xl border border-slate-700 h-full">
              <div className="flex items-center mb-4">
                <Target className="text-brand-cyan h-10 w-10 mr-4" />
                <h2 className="text-3xl font-semibold text-white">Missão</h2>
              </div>
              <p className="text-dark-text-secondary">
                Capacitar empresas e empreendedores moçambicanos através de soluções tecnológicas inovadoras, intuitivas e de alto impacto, promovendo o crescimento e a transformação digital no país.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-dark-card p-8 rounded-lg shadow-xl border border-slate-700 h-full">
              <div className="flex items-center mb-4">
                <Eye className="text-brand-lime h-10 w-10 mr-4" />
                <h2 className="text-3xl font-semibold text-white">Visão</h2>
              </div>
              <p className="text-dark-text-secondary">
                Ser a empresa líder em desenvolvimento de software em Moçambique, reconhecida pela excelência, inovação e pelo compromisso com o sucesso dos nossos clientes e o desenvolvimento tecnológico nacional.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}

function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Serviços - {COMPANY_INFO.name}</title>
        <meta name="description" content={`Descubra os serviços de criação de sites, lojas online, apps mobile e sistemas personalizados oferecidos pela ${COMPANY_INFO.name} em Moçambique.`} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Nossos <span className="text-brand-purple">Serviços</span></h1>
          <p className="text-xl text-dark-text-secondary text-center mb-12 max-w-3xl mx-auto">
            Soluções digitais completas para atender às suas necessidades e impulsionar o seu negócio.
          </p>
        </AnimatedSection>
        <div className="space-y-16 sm:space-y-24">
          {servicesData.map((service) => (
            <AnimatedSection key={service.id} id={service.id} className="scroll-mt-24">
              <div className={`p-8 sm:p-10 rounded-xl shadow-2xl border ${service.bgColor} border-transparent hover:border-current ${service.color} transition-all duration-300`}>
                <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-6">
                  <div className={`p-4 rounded-full ${service.bgColor} ${service.color} w-max mb-4 md:mb-0`}>
                    <service.icon size={40} />
                  </div>
                  <div>
                    <h2 className={`text-3xl sm:text-4xl font-bold ${service.color}`}>{service.title}</h2>
                    <p className="text-lg font-semibold text-white mt-1">{service.price}</p>
                  </div>
                </div>
                
                <p className="text-dark-text-secondary mb-8">{service.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">O que está incluído:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <feature.icon className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${service.color}`} />
                          <span className="text-dark-text-secondary">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">O que o cliente ganha:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <benefit.icon className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${service.color}`} />
                           <span className="text-dark-text-secondary">{benefit.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link to="/orcamento">
                    <Button size="lg" variant="default" className={`${service.color === 'text-brand-cyan' ? '' : '!bg-current !text-dark-bg hover:!opacity-80'}`}>
                      
        Pedir Orçamento Personalizado
                    </Button>
                  </Link>
                   <a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
                     <Button size="lg" variant="outline" className={`border-current ${service.color} hover:bg-current/20`}>
                        Orçar via WhatsApp
                     </Button>
                   </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection className="mt-16 sm:mt-24">
          <FaqSection />
        </AnimatedSection>

      </div>
    </>
  );
}

function FaqItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-700">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left text-lg font-medium text-white hover:text-brand-cyan transition-colors"
      >
        <span>{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-dark-text-secondary">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes (FAQ)</h2>
      <div className="bg-dark-card p-6 sm:p-8 rounded-lg shadow-xl border border-slate-700">
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}


function CustomBudgetPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const onSubmit = async (data) => {
    setSubmitStatus(null); // Reset status on new submission
    try {
      // Simulação de envio
      // await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // COLOQUE AQUI O CÓDIGO PARA ENVIO DA API DE EMAIL
      // Exemplo com Axios (substitua pela sua URL real):
      // const response = await axios.post('URL_DA_SUA_API_DE_EMAIL', data);
      // if (response.status === 200 || response.status === 201) {
      //   setSubmitStatus('success');
      //   reset();
      // } else {
      //   throw new Error('Falha no envio');
      // }
      
      // Placeholder para simular sucesso
      console.log("Dados do formulário:", data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay da API
      setSubmitStatus('success');
      reset(); // Limpa o formulário

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus('error');
    }
  };
  return (
    <>
      <Helmet>
        <title>Orçamento Personalizado - {COMPANY_INFO.name}</title>
        <meta name="description" content={`Solicite um orçamento personalizado para seu projeto de website, app ou sistema com a ${COMPANY_INFO.name}.`} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Orçamento <span className="text-brand-lime">Personalizado</span></h1>
          <p className="text-xl text-dark-text-secondary text-center mb-12 max-w-3xl mx-auto">
            Descreva seu projeto e entraremos em contato com uma proposta detalhada.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl mx-auto bg-dark-card p-8 sm:p-10 rounded-xl shadow-2xl border border-slate-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" {...register("name", { required: "Nome é obrigatório" })} aria-invalid={errors.name ? "true" : "false"} />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }})} aria-invalid={errors.email ? "true" : "false"} />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Telefone (WhatsApp)</Label>
              <Input id="phone" type="tel" {...register("phone", { required: "Telefone é obrigatório", pattern: { value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message: "Número de telefone inválido"} })} placeholder="+258 xx xxx xxxx" aria-invalid={errors.phone ? "true" : "false"} />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="projectType">Tipo de Projeto</Label>
              <select 
                id="projectType" 
                {...register("projectType", { required: "Selecione o tipo de projeto" })}
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm ring-offset-dark-bg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-dark-text"
                aria-invalid={errors.projectType ? "true" : "false"}
              >
                <option value="">Selecione uma opção...</option>
                <option value="site_profissional">Criação de Site Profissional</option>
                <option value="loja_online">Loja Online (E-commerce)</option>
                <option value="app_mobile">Aplicativo Mobile (Android/iOS)</option>
                <option value="sistema_web">Sistema Web Personalizado</option>
                <option value="outro">Outro</option>
              </select>
              {errors.projectType && <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Descrição do Projeto</Label>
              <Textarea id="description" rows="5" {...register("description", { required: "Descrição é obrigatória", minLength: { value: 20, message: "Descreva com pelo menos 20 caracteres." } })} aria-invalid={errors.description ? "true" : "false"} />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
            </div>
            
            {submitStatus === 'success' && (
              <div className="flex items-center p-4 mb-4 text-sm text-green-400 rounded-lg bg-green-900/30" role="alert">
                <CheckCircle className="w-5 h-5 mr-2"/>
                <span>Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-400 rounded-lg bg-red-900/30" role="alert">
                <AlertCircle className="w-5 h-5 mr-2"/>
                <span>Ocorreu um erro ao enviar. Tente novamente ou contate-nos por WhatsApp.</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : "Enviar Solicitação"}
              </Button>
              <a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <MessageSquare className="mr-2 h-5 w-5" /> Orçar via WhatsApp
                </Button>
              </a>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </>
  );
}

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
      // SIMULAÇÃO DE ENVIO - Substitua pela sua lógica real de API
      console.log("Dados do formulário de contato:", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      // const response = await axios.post('URL_DA_SUA_API_DE_EMAIL_CONTATO', data);
      // if (response.status === 200 || response.status === 201) {
      //    setSubmitStatus('success');
      //    reset();
      // } else {
      //    throw new Error('Falha no envio');
      // }
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error("Erro ao enviar formulário de contato:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contato - {COMPANY_INFO.name}</title>
        <meta name="description" content={`Entre em contato com a ${COMPANY_INFO.name} para discutir seu próximo projeto digital. Email, WhatsApp e formulário de contato disponíveis.`} />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Fale <span className="text-brand-cyan">Conosco</span></h1>
          <p className="text-xl text-dark-text-secondary text-center mb-12 max-w-3xl mx-auto">
            Tem alguma dúvida ou quer iniciar um projeto? Estamos aqui para ajudar!
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection className="bg-dark-card p-8 sm:p-10 rounded-xl shadow-2xl border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Envie-nos uma mensagem</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="contactName">Nome</Label>
                <Input id="contactName" {...register("contactName", { required: "Nome é obrigatório" })} aria-invalid={errors.contactName ? "true" : "false"} />
                {errors.contactName && <p className="text-red-400 text-sm mt-1">{errors.contactName.message}</p>}
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" {...register("contactEmail", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }})} aria-invalid={errors.contactEmail ? "true" : "false"} />
                {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail.message}</p>}
              </div>
              <div>
                <Label htmlFor="contactMessage">Sua Mensagem</Label>
                <Textarea id="contactMessage" rows="5" {...register("contactMessage", { required: "Mensagem é obrigatória", minLength: { value: 10, message: "A mensagem deve ter pelo menos 10 caracteres." } })} aria-invalid={errors.contactMessage ? "true" : "false"} />
                {errors.contactMessage && <p className="text-red-400 text-sm mt-1">{errors.contactMessage.message}</p>}
              </div>
              
              {submitStatus === 'success' && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-400 rounded-lg bg-green-900/30" role="alert">
                  <CheckCircle className="w-5 h-5 mr-2"/>
                  <span>Mensagem enviada com sucesso! Responderemos em breve.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-400 rounded-lg bg-red-900/30" role="alert">
                  <AlertCircle className="w-5 h-5 mr-2"/>
                  <span>Ocorreu um erro. Tente novamente ou use outro meio de contato.</span>
                </div>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : "Enviar Mensagem"}
              </Button>
            </form>
          </AnimatedSection>
          <AnimatedSection className="space-y-8">
            <div className="bg-dark-card p-8 rounded-xl shadow-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-brand-purple" /> Email
              </h3>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-lg text-dark-text-secondary hover:text-brand-purple transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className="bg-dark-card p-8 rounded-xl shadow-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-brand-lime" /> WhatsApp
              </h3>
              <a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-lg text-dark-text-secondary hover:text-brand-lime transition-colors">
                {COMPANY_INFO.whatsapp}
              </a>
              <p className="text-sm text-slate-400 mt-1">Clique para iniciar uma conversa direta.</p>
            </div>
            <div className="bg-dark-card p-8 rounded-xl shadow-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Info className="w-6 h-6 mr-3 text-brand-cyan" /> Horário de Atendimento
              </h3>
              <p className="text-lg text-dark-text-secondary">Segunda a Sexta: 08:00 - 17:00</p>
              <p className="text-sm text-slate-400 mt-1">GMT+2 (Maputo)</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-dark-text">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/orcamento" element={<CustomBudgetPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
