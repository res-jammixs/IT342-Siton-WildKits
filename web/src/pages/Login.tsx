import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      // Error is handled by the AuthContext toast
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Animated background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Left branding - desktop */}
      <div className="relative hidden w-[45%] overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: 100 + i * 120,
                height: 100 + i * 120,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <div className="relative flex h-full flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-accent shadow-accent"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShoppingBag className="h-12 w-12 text-accent-foreground" />
            </motion.div>

            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-primary-foreground">
              Your Campus
              <br />
              <span className="text-accent">Marketplace</span>
            </h2>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Buy, sell, and lend with fellow CIT-U students in a safe, campus-exclusive community.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: "2.4K+", label: "Students" },
                { value: "850+", label: "Listings" },
                { value: "3.2K+", label: "Trades" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur-sm"
                >
                  <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="text-xs text-primary-foreground/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="mb-10 flex items-center gap-2 font-display text-2xl font-bold text-primary lg:hidden">
            <ShoppingBag className="h-7 w-7" />
            Wild<span className="text-accent">Kits</span>
          </Link>

          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Welcome back</span>
          </div>
          <h1 className="mb-1 font-display text-3xl font-bold text-foreground">
            Sign in to <span className="text-primary">WildKits</span>
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Access your CIT-U campus marketplace account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              className={`space-y-2 rounded-xl border-2 p-4 transition-colors ${
                focused === "email" ? "border-primary bg-primary/[0.02]" : "border-transparent bg-muted/50"
              }`}
            >
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Student Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@cit.edu"
                  className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </motion.div>

            <motion.div
              className={`space-y-2 rounded-xl border-2 p-4 transition-colors ${
                focused === "password" ? "border-primary bg-primary/[0.02]" : "border-transparent bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-0 bg-transparent pl-7 pr-10 shadow-none focus-visible:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            <Button type="submit" className="group w-full gap-2" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
              {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full gap-3 rounded-xl border-2 py-6 text-sm font-medium" size="lg">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New to WildKits?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
