import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Mail, Lock, Eye, EyeOff, User, GraduationCap,
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles, IdCard, Upload, X, Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentIdImage, setStudentIdImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { registerWithImage, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    router.push('/dashboard');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      setStudentIdImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setStudentIdImage(null);
    setImagePreview(null);
  };

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

    if (!studentId.trim() || !/^\d{2}-\d{4}-\d{3}$/.test(studentId)) {
      toast({
        title: "Validation Error",
        description: "Student ID must follow format XX-XXXX-XXX (e.g., 21-1234-567).",
        variant: "destructive",
      });
      return;
    }

    if (!department) {
      toast({
        title: "Validation Error",
        description: "Please select your department.",
        variant: "destructive",
      });
      return;
    }

    if (!yearLevel) {
      toast({
        title: "Validation Error",
        description: "Please select your year level.",
        variant: "destructive",
      });
      return;
    }

    if (!studentIdImage) {
      toast({
        title: "Validation Error",
        description: "Please upload your student ID image.",
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
      await registerWithImage(fullName, email, password, studentId, department, yearLevel, studentIdImage!);
      
      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (targetStep: number) => {
    // Only allow going back or staying on current step
    // Cannot jump ahead without validation
    if (targetStep > currentStep) {
      // Trying to jump ahead - validate current step first
      if (currentStep === 1) {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !email.includes('@')) {
          toast({
            title: "Complete Current Step",
            description: "Please fill in all fields before proceeding.",
            variant: "destructive",
          });
          return;
        }
      } else if (currentStep === 2) {
        if (!studentId.trim() || !/^\d{2}-\d{4}-\d{3}$/.test(studentId) || !department || !yearLevel || !studentIdImage) {
          toast({
            title: "Complete Current Step",
            description: "Please fill in all fields before proceeding.",
            variant: "destructive",
          });
          return;
        }
      }
    }
    
    // Allow navigation
    setCurrentStep(targetStep);
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
    
    if (currentStep === 2) {
      if (!studentId.trim() || !/^\d{2}-\d{4}-\d{3}$/.test(studentId)) {
        toast({
          title: "Validation Error",
          description: "Student ID must follow format XX-XXXX-XXX (e.g., 21-1234-567).",
          variant: "destructive",
        });
        return;
      }
      if (!department) {
        toast({
          title: "Validation Error",
          description: "Please select your department.",
          variant: "destructive",
        });
        return;
      }
      if (!yearLevel) {
        toast({
          title: "Validation Error",
          description: "Please select your year level.",
          variant: "destructive",
        });
        return;
      }
      if (!studentIdImage) {
        toast({
          title: "Validation Error",
          description: "Please upload your student ID image.",
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
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  disabled={isSubmitting}
                  className={`flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : currentStep > step.id
                      ? "bg-accent/20 text-accent-foreground cursor-pointer hover:bg-accent/30"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  } ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
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
                        placeholder="21-1234-567"
                        className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        onFocus={() => setFocused("studentId")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>

                  <div className={inputWrapper("department")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Department
                    </Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMPUTER_SCIENCE">Computer Science</SelectItem>
                        <SelectItem value="INFORMATION_TECHNOLOGY">Information Technology</SelectItem>
                        <SelectItem value="COMPUTER_ENGINEERING">Computer Engineering</SelectItem>
                        <SelectItem value="ELECTRONICS_ENGINEERING">Electronics Engineering</SelectItem>
                        <SelectItem value="ELECTRICAL_ENGINEERING">Electrical Engineering</SelectItem>
                        <SelectItem value="CIVIL_ENGINEERING">Civil Engineering</SelectItem>
                        <SelectItem value="MECHANICAL_ENGINEERING">Mechanical Engineering</SelectItem>
                        <SelectItem value="ARCHITECTURE">Architecture</SelectItem>
                        <SelectItem value="BUSINESS_ADMINISTRATION">Business Administration</SelectItem>
                        <SelectItem value="ACCOUNTANCY">Accountancy</SelectItem>
                        <SelectItem value="NURSING">Nursing</SelectItem>
                        <SelectItem value="EDUCATION">Education</SelectItem>
                        <SelectItem value="ARTS_AND_SCIENCES">Arts and Sciences</SelectItem>
                        <SelectItem value="HOSPITALITY_MANAGEMENT">Hospitality Management</SelectItem>
                        <SelectItem value="TOURISM_MANAGEMENT">Tourism Management</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={inputWrapper("yearLevel")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Year Level
                    </Label>
                    <Select value={yearLevel} onValueChange={setYearLevel}>
                      <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIRST_YEAR">1st Year</SelectItem>
                        <SelectItem value="SECOND_YEAR">2nd Year</SelectItem>
                        <SelectItem value="THIRD_YEAR">3rd Year</SelectItem>
                        <SelectItem value="FOURTH_YEAR">4th Year</SelectItem>
                        <SelectItem value="FIFTH_YEAR">5th Year</SelectItem>
                        <SelectItem value="GRADUATE">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Student ID Image Upload */}
                  <div className={inputWrapper("studentIdImage")}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Student ID Image
                    </Label>
                    <div className="mt-2">
                      {!imagePreview ? (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-8 transition-colors hover:border-primary hover:bg-primary/5">
                          <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                          <span className="mb-1 text-sm font-medium text-foreground">Upload Student ID</span>
                          <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            onFocus={() => setFocused("studentIdImage")}
                            onBlur={() => setFocused(null)}
                          />
                        </label>
                      ) : (
                        <div className="relative rounded-lg border-2 border-primary bg-primary/5 p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                              <ImageIcon className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="truncate text-sm font-medium">{studentIdImage?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(studentIdImage!.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeImage}
                              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          {imagePreview && (
                            <div className="mt-3 overflow-hidden rounded-md">
                              <img
                                src={imagePreview}
                                alt="Student ID Preview"
                                className="h-auto w-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              Registration Successful!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <div className="space-y-3 pt-2">
                <p className="text-base">
                  Welcome to <span className="font-semibold text-primary">WildKits</span>!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your account has been created successfully. Please log in with your credentials to continue.
                </p>
                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  <p className="font-medium">⏳ Pending Verification</p>
                  <p className="mt-1 text-xs">
                    Your account is awaiting admin approval. You'll be notified once verified.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                router.push('/login');
              }}
              className="w-full"
              size="lg"
            >
              Continue to Login
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
