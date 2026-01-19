import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, TeacherProfile } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

type ClassLevel = '9' | '10' | '11' | '12' | 'ADP';

const classOptions: ClassLevel[] = ['9', '10', '11', '12', 'ADP'];

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Urdu',
  'Islamiat',
  'Pakistan Studies',
  'Economics',
  'Statistics',
];

export function TeacherLoginForm() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [targetClass, setTargetClass] = useState<ClassLevel | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !subject || !targetClass) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const profile: TeacherProfile = {
      role: 'teacher',
      name,
      subject,
      targetClass,
    };

    login(profile);
    toast.success('Welcome back, Professor!');
    navigate('/dashboard');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="teacher-name" className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Teacher Name
        </Label>
        <Input
          id="teacher-name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher-subject" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Subject
        </Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select your subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target-class" className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          Target Class
        </Label>
        <Select value={targetClass} onValueChange={(v: ClassLevel) => setTargetClass(v)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select target class" />
          </SelectTrigger>
          <SelectContent>
            {classOptions.map((cls) => (
              <SelectItem key={cls} value={cls}>
                Class {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base shadow-glow hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Login as Teacher'}
      </Button>
    </form>
  );
}
