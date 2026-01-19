import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher';

export interface StudentProfile {
  role: 'student';
  name: string;
  age: number;
  rollNumber: string;
  class: '9' | '10' | '11' | '12' | 'ADP';
  subject: string;
}

export interface TeacherProfile {
  role: 'teacher';
  name: string;
  subject: string;
  targetClass: '9' | '10' | '11' | '12' | 'ADP';
}

export type UserProfile = StudentProfile | TeacherProfile;

interface AuthContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('punjab-college-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('punjab-college-user', JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('punjab-college-user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates } as UserProfile;
      setUser(updatedUser);
      localStorage.setItem('punjab-college-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
