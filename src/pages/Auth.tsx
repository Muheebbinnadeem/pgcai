import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentRegisterForm } from '@/components/auth/StudentRegisterForm';
import { TeacherLoginForm } from '@/components/auth/TeacherLoginForm';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export default function Auth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 gradient-hero rounded-full opacity-20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <Logo size="md" />
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Learning
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Punjab College</h1>
            <p className="text-muted-foreground">Sign in to access your personalized learning portal</p>
          </div>

          <div className="glass-strong rounded-2xl shadow-elevated p-6">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="student" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="animate-slide-up">
                <StudentRegisterForm />
              </TabsContent>
              <TabsContent value="teacher" className="animate-slide-up">
                <TeacherLoginForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
