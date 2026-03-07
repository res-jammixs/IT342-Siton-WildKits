import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Mail, Lock, Eye, EyeOff, User, GraduationCap,
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles, IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Student Details", icon: GraduationCap },
  { id: 3, title: "Account Setup", icon: Lock },
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { register: registerUser, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep !== 3) {
      return;
    }

    // Validate all fields
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your first and last name.",
        variant: "destructive",
      });
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName.length < 2) {
      toast({
        title: "Validation Error",
        description: "Name must be at least 2 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser(fullName, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        toast({
          title: "Validation Error",
          description: "Please enter your first and last name.",
          variant: "destructive",
        });
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const inputWrapper = (name: string) =>
    `space-y-2 rounded-xl border-2 p-4 transition-colors ${
      focused === name ? "border-primary bg-primary/[0.02]" : "border-transparent bg-muted/50"
    }`;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Left form */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="mb-10 flex items-center gap-2 font-display text-2xl font-bold text-primary">
            <ShoppingBag className="h-7 w-7" />
            Wild<span className="text-accent">Kits</span>
          </Link>

          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Join the community</span>
          </div>
          <h1 className="mb-1 font-display text-3xl font-bold text-foreground">
            Create your <span className="text-primary">account</span>
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Register with your CIT-U student credentials
          </p>

          {/* Step indicator */}
          <div className="mb-8 flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : currentStep > step.id
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.id}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-6 rounded-full ${currentStep > step.id ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className={inputWrapper("firstName")}>
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Juan"
                          className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          onFocus={() => setFocused("firstName")}
                          onBlur={() => setFocused(null)}
                          required
                        />
                      </div>
                    </div>
                    <div className={inputWrapper("lastName")}>
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Last Name
                      </Label>
                      <Input
                        placeholder="Dela Cruz"
                        className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() => setFocused("lastName")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>

                  <div className={inputWrapper("email")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Student Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="you@cit.edu"
                        className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className={inputWrapper("studentId")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Student ID
                    </Label>
                    <div className="relative">
                      <IdCard className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="XX-XXXX-XXX"
                        className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                        onFocus={() => setFocused("studentId")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div className={inputWrapper("department")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ccs">College of Computer Studies</SelectItem>
                        <SelectItem value="coe">College of Engineering</SelectItem>
                        <SelectItem value="cas">College of Arts & Sciences</SelectItem>
                        <SelectItem value="cba">College of Business Admin</SelectItem>
                        <SelectItem value="ced">College of Education</SelectItem>
                        <SelectItem value="cn">College of Nursing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={inputWrapper("yearLevel")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Year Level
                    </Label>
                    <Select>
                      <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="5">5th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className={inputWrapper("password")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="border-0 bg-transparent pl-7 pr-10 shadow-none focus-visible:ring-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className={inputWrapper("confirmPassword")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocused("confirmPassword")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>

                  {/* Google OAuth */}
                  <div className="my-4 flex items-center gap-4">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs font-medium text-muted-foreground">or sign up with</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <Button variant="outline" type="button" className="w-full gap-3 rounded-xl border-2 py-6 text-sm font-medium" size="lg">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3 pt-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  size="lg"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  className="group flex-1 gap-2"
                  size="lg"
                  onClick={handleNextStep}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button type="submit" className="group flex-1 gap-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              )}
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right branding - desktop */}
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
              animate={{ rotate: -360 }}
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
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GraduationCap className="h-12 w-12 text-accent-foreground" />
            </motion.div>

            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-primary-foreground">
              Join the
              <br />
              <span className="text-accent">WildKits</span> Family
            </h2>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Exclusive to CIT-U students. Start trading, lending, and connecting with your campus community.
            </p>

            <div className="mt-12 space-y-3">
              {[
                "✓ Verified student accounts only",
                "✓ Secure peer-to-peer transactions",
                "✓ Campus-wide lending system",
              ].map((feature, i) => (
                <motion.p
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="text-sm text-primary-foreground/70"
                >
                  {feature}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
