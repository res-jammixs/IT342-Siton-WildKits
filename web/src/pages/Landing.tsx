import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag, ArrowRight, BookOpen, Laptop, Shirt, FlaskConical,
  Star, Shield, Users, Zap, Heart, Github, Linkedin, Mail,
  Menu, X, ChevronDown, Sparkles, GraduationCap, HandshakeIcon,
  Clock, MessageSquare, CreditCard, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "WildKits", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About the Developers", href: "#developers" },
];

const services = [
  {
    icon: ShoppingBag,
    title: "Buy & Sell",
    description: "Trade textbooks, electronics, uniforms, and more with fellow Wildcats securely within campus.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HandshakeIcon,
    title: "Peer-to-Peer Lending",
    description: "Borrow or lend items like calculators, lab equipment, and gadgets with flexible terms.",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: MessageSquare,
    title: "In-App Messaging",
    description: "Chat directly with sellers and borrowers. Negotiate prices and coordinate meetups on campus.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Verified Students Only",
    description: "Every user is verified through their CIT-U student credentials ensuring trust and safety.",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options with transaction tracking and digital receipts for every purchase.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Track your listings, transactions, earnings, and borrower ratings all in one place.",
    color: "bg-accent/20 text-accent-foreground",
  },
];

const developers = [
  {
    name: "Developer 1",
    role: "Full-Stack Developer",
    department: "BSIT",
    avatar: "D1",
    bio: "Passionate about building scalable web applications and creating meaningful campus solutions.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Developer 2",
    role: "UI/UX Designer & Frontend",
    department: "BSIT",
    avatar: "D2",
    bio: "Focused on crafting intuitive interfaces that make technology accessible to every student.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Developer 3",
    role: "Backend Developer",
    department: "BSCS",
    avatar: "D3",
    bio: "Dedicated to building robust APIs and database architectures for real-world applications.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Developer 4",
    role: "Project Manager & QA",
    department: "BSIT",
    avatar: "D4",
    bio: "Ensuring quality delivery through strategic planning and rigorous testing methodologies.",
    github: "#",
    linkedin: "#",
  },
];

const stats = [
  { value: "2,400+", label: "Active Students" },
  { value: "5,000+", label: "Items Listed" },
  { value: "₱1.2M", label: "Total Traded" },
  { value: "98%", label: "Satisfaction" },
];

function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <ShoppingBag className="h-6 w-6" />
          <span>Wild<span className="text-accent">Kits</span></span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="default" size="sm" className="gap-1.5" asChild>
            <Link href="/register">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-3 flex gap-2 border-t border-border pt-4">
                <Button variant="outline" className="flex-1" size="sm" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button className="flex-1" size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-hero pt-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10 py-24 md:py-36">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Exclusive to CIT-U Wildcats
              </div>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.1] text-primary-foreground md:text-6xl">
                Your Campus
                <br />
                Marketplace,
                <br />
                <span className="text-accent">Reimagined.</span>
              </h1>
              <p className="mb-8 max-w-md text-base text-primary-foreground/70 md:text-lg">
                Buy, sell, and lend items with fellow CIT-U students. A trusted peer-to-peer platform built by Wildcats, for Wildcats.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="accent" size="lg" className="gap-2 rounded-xl px-8 text-base shadow-accent" asChild>
                  <Link href="/register">
                    Join WildKits <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-xl border-primary-foreground/20 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Services <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative mx-auto w-80">
                {/* Floating cards */}
                <motion.div
                  className="absolute -left-8 top-8 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-4 backdrop-blur-sm"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                      <BookOpen className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">Textbooks</p>
                      <p className="text-xs text-primary-foreground/60">234 available</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-12 top-32 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-4 backdrop-blur-sm"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
                      <Laptop className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">Electronics</p>
                      <p className="text-xs text-primary-foreground/60">156 available</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-4 bottom-16 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-4 backdrop-blur-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/80">
                      <GraduationCap className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">Uniforms</p>
                      <p className="text-xs text-primary-foreground/60">89 available</p>
                    </div>
                  </div>
                </motion.div>

                {/* Central icon */}
                <div className="flex h-72 w-72 mx-auto items-center justify-center">
                  <motion.div
                    className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-accent/20 backdrop-blur-sm"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <ShoppingBag className="h-16 w-16 text-accent" />
                    <motion.div
                      className="absolute -inset-4 rounded-3xl border-2 border-dashed border-primary-foreground/10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 text-center backdrop-blur-sm"
              >
                <p className="font-display text-2xl font-bold text-accent md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-primary-foreground/60 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              What We Offer
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need,
              <br />
              <span className="text-primary">Right on Campus</span>
            </h2>
            <p className="text-muted-foreground">
              WildKits provides a complete ecosystem for campus commerce — from listing items to secure payments and real-time messaging.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${service.color} transition-transform duration-300 group-hover:scale-110`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-xl text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              How It <span className="text-accent">Works</span>
            </h2>
            <p className="text-muted-foreground">Get started in three simple steps</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: GraduationCap, title: "Verify Your Account", desc: "Sign up with your CIT-U student credentials and get verified within minutes." },
              { step: "02", icon: ShoppingBag, title: "List or Browse", desc: "Post items for sale or lending, or browse what fellow Wildcats are offering." },
              { step: "03", icon: HandshakeIcon, title: "Transact Safely", desc: "Chat, negotiate, and complete transactions securely within campus." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <item.icon className="h-7 w-7" />
                </div>
                <div className="absolute -top-2 right-1/4 font-display text-5xl font-bold text-primary/10">
                  {item.step}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Developers */}
      <section id="developers" className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-primary">
              <Heart className="h-3.5 w-3.5" />
              The Team
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Meet the <span className="text-primary">Developers</span>
            </h2>
            <p className="text-muted-foreground">
              Built with passion by CIT-U students who understand the campus community and its needs.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {developers.map((dev, i) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              >
                {/* Avatar area */}
                <div className="relative bg-gradient-hero p-6 pb-10">
                  <motion.div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-primary-foreground/20 bg-primary-foreground/10 font-display text-2xl font-bold text-accent backdrop-blur-sm"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    {dev.avatar}
                  </motion.div>
                </div>

                <div className="relative -mt-4 rounded-t-2xl bg-card px-5 pb-5 pt-6">
                  <h3 className="font-display text-base font-bold text-foreground">{dev.name}</h3>
                  <p className="text-xs font-medium text-primary">{dev.role}</p>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                    {dev.department}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{dev.bio}</p>
                  <div className="mt-4 flex gap-2">
                    <a href={dev.github} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href={dev.linkedin} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-lg text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Trade <span className="text-accent">on Campus?</span>
              </h2>
              <p className="mb-8 text-primary-foreground/70">
                Join thousands of CIT-U students already using WildKits to buy, sell, and lend within the campus community.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="accent" size="lg" className="gap-2 rounded-xl px-8 shadow-accent" asChild>
                  <Link href="/register">
                    Create Account <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2 rounded-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <ShoppingBag className="h-5 w-5" />
              Wild<span className="text-accent">Kits</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 WildKits — CIT-U. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
