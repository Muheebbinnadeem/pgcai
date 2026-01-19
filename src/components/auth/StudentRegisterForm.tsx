import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, StudentProfile } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Calendar, Hash, Lock, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

type ClassLevel = '9' | '10' | '11' | '12' | 'ADP';

const classOptions: ClassLevel[] = ['9', '10', '11', '12', 'ADP'];

const subjectsByClass: Record<ClassLevel, string[]> = {
  '9': ['Computer Science', 'Biology'],
  '10': ['Computer Science', 'Biology'],
  '11': ['ICS (Physics)', 'ICS (Stats)', 'F.A', 'I.Com'],
  '12': ['ICS (Physics)', 'ICS (Stats)', 'F.A', 'I.Com'],
  'ADP': ['ADP CS', 'ADP BA', 'ADP Eng'],
};

export function StudentRegisterForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | ''>('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const availableSubjects = useMemo(() => {
    if (!selectedClass) return [];
    return subjectsByClass[selectedClass];
  }, [selectedClass]);

  const handleClassChange = (value: ClassLevel) => {
    setSelectedClass(value);
    setSubject(''); // Reset subject when class changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !rollNumber || !password || !selectedClass || !subject) {
      toast.error('Please fill in all fields');
      return;
    }

    if (parseInt(age) < 10 || parseInt(age) > 30) {
      toast.error('Please enter a valid age (10-30)');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const profile: StudentProfile = {
      role: 'student',
      name,
      age: parseInt(age),
      rollNumber,
      class: selectedClass,
      subject,
    };

    login(profile);
    toast.success('Welcome to Punjab College!');
    navigate('/dashboard');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={10}
            max={30}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roll" className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            Roll Number
          </Label>
          <Input
            id="roll"
            placeholder="e.g., 2024-001"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="class" className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          Class
        </Label>
        <Select value={selectedClass} onValueChange={handleClassChange}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select your class" />
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

      <div className="space-y-2">
        <Label htmlFor="subject" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Subject / Department
        </Label>
        <Select 
          value={subject} 
          onValueChange={setSubject}
          disabled={!selectedClass}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder={selectedClass ? "Select your subject" : "Select class first"} />
          </SelectTrigger>
          <SelectContent>
            {availableSubjects.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base shadow-glow hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Register as Student'}
      </Button>
    </form>
  );
}
