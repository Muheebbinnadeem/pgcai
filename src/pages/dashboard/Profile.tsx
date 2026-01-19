import { useState } from 'react';
import { useAuth, StudentProfile, TeacherProfile } from '@/contexts/AuthContext';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Save, Edit2, X } from 'lucide-react';
import { toast } from 'sonner';

interface StudentFormData {
  name: string;
  age: string;
  class: string;
  subject: string;
}

interface TeacherFormData {
  name: string;
  subject: string;
  targetClass: string;
}

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const isStudent = user?.role === 'student';
  const studentUser = user as StudentProfile | null;
  const teacherUser = user as TeacherProfile | null;

  const [studentFormData, setStudentFormData] = useState<StudentFormData>({
    name: user?.name || '',
    age: isStudent ? String(studentUser?.age || '') : '',
    class: isStudent ? studentUser?.class || '' : '',
    subject: isStudent ? studentUser?.subject || '' : '',
  });

  const [teacherFormData, setTeacherFormData] = useState<TeacherFormData>({
    name: user?.name || '',
    subject: !isStudent ? teacherUser?.subject || '' : '',
    targetClass: !isStudent ? teacherUser?.targetClass || '' : '',
  });

  if (!user) return null;

  const handleSave = () => {
    if (isStudent) {
      updateProfile({
        name: studentFormData.name,
        age: parseInt(studentFormData.age),
        class: studentFormData.class as StudentProfile['class'],
        subject: studentFormData.subject,
      });
    } else {
      updateProfile({
        name: teacherFormData.name,
        subject: teacherFormData.subject,
        targetClass: teacherFormData.targetClass as TeacherProfile['targetClass'],
      });
    }
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="flex-1 p-4 lg:p-6">
      <ModuleCard
        title="My Profile"
        description="View and edit your account information"
        icon={<User className="w-5 h-5 text-primary-foreground" />}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              className={!isEditing ? "gradient-primary" : ""}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              {isEditing ? (
                <Input
                  value={isStudent ? studentFormData.name : teacherFormData.name}
                  onChange={(e) => {
                    if (isStudent) {
                      setStudentFormData(prev => ({ ...prev, name: e.target.value }));
                    } else {
                      setTeacherFormData(prev => ({ ...prev, name: e.target.value }));
                    }
                  }}
                />
              ) : (
                <p className="h-10 flex items-center px-3 rounded-md bg-muted">{user.name}</p>
              )}
            </div>

            {isStudent && studentUser ? (
              <>
                <div className="space-y-2">
                  <Label>Age</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={studentFormData.age}
                      onChange={(e) => setStudentFormData(prev => ({ ...prev, age: e.target.value }))}
                    />
                  ) : (
                    <p className="h-10 flex items-center px-3 rounded-md bg-muted">{studentUser.age} years</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Class</Label>
                  {isEditing ? (
                    <Select 
                      value={studentFormData.class} 
                      onValueChange={(v) => setStudentFormData(prev => ({ ...prev, class: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['9', '10', '11', '12', 'ADP'].map(c => (
                          <SelectItem key={c} value={c}>Class {c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="h-10 flex items-center px-3 rounded-md bg-muted">Class {studentUser.class}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subject / Department</Label>
                  <p className="h-10 flex items-center px-3 rounded-md bg-muted">{studentUser.subject}</p>
                </div>

                <div className="space-y-2">
                  <Label>Roll Number</Label>
                  <p className="h-10 flex items-center px-3 rounded-md bg-muted">{studentUser.rollNumber}</p>
                </div>
              </>
            ) : teacherUser ? (
              <>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <p className="h-10 flex items-center px-3 rounded-md bg-muted">{teacherUser.subject}</p>
                </div>

                <div className="space-y-2">
                  <Label>Target Class</Label>
                  <p className="h-10 flex items-center px-3 rounded-md bg-muted">Class {teacherUser.targetClass}</p>
                </div>
              </>
            ) : null}
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <Button onClick={handleSave} className="gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </ModuleCard>
    </div>
  );
}
