import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: 'worker' | 'employer' | null;
  signUp: (email: string, password: string, username?: string, mobile?: string, role?: 'worker' | 'employer') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGithub: () => Promise<{ error: any }>;
  setUserRole: (role: 'worker' | 'employer') => void;
  isWorker: () => boolean;
  isEmployer: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRoleState] = useState<'worker' | 'employer' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for mock session on mount
    const mockSessionData = localStorage.getItem('mockSession');
    if (mockSessionData) {
      const mockSession = JSON.parse(mockSessionData);
      setSession(mockSession);
      setUser(mockSession.user);
      
      // Load role from localStorage
      if (mockSession.user) {
        const savedRole = localStorage.getItem(`user_role_${mockSession.user.id}`) as 'worker' | 'employer' | null;
        setUserRoleState(savedRole);
      }
    }
    setLoading(false);
  }, []);

  const setUserRole = (role: 'worker' | 'employer') => {
    setUserRoleState(role);
    if (user) {
      localStorage.setItem(`user_role_${user.id}`, role);
    }
  };

  const isWorker = () => userRole === 'worker';
  const isEmployer = () => userRole === 'employer';

  const signUp = async (email: string, password: string, username?: string, mobile?: string, role?: 'worker' | 'employer') => {
    try {
      // Mock authentication - create user in localStorage
      const userId = `user_${Date.now()}`;
      const mockUser = {
        id: userId,
        email,
        user_metadata: { username, mobile },
        created_at: new Date().toISOString(),
      };

      // Store user data
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      localStorage.setItem('mockSession', JSON.stringify({ access_token: 'mock_token', user: mockUser }));
      
      if (role) {
        localStorage.setItem(`user_role_${userId}`, role);
        setUserRoleState(role);
      }

      setUser(mockUser as any);
      setSession({ access_token: 'mock_token', user: mockUser } as any);

      toast({
        title: "Registration Successful!",
        description: "Welcome to JobConnect! Please complete your profile.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - check if user exists in localStorage
      const mockUserData = localStorage.getItem('mockUser');
      
      if (!mockUserData) {
        const error = { message: "No account found. Please sign up first." };
        toast({
          title: "Sign In Error", 
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      const mockUser = JSON.parse(mockUserData);
      const mockSession = { access_token: 'mock_token', user: mockUser };
      
      localStorage.setItem('mockSession', JSON.stringify(mockSession));
      setUser(mockUser);
      setSession(mockSession as any);

      // Load role
      const savedRole = localStorage.getItem(`user_role_${mockUser.id}`) as 'worker' | 'employer' | null;
      setUserRoleState(savedRole);

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      return { error: null };
    } catch (error: any) {
      const err = { message: error.message || "An error occurred during sign in" };
      toast({
        title: "Sign In Error",
        description: err.message,
        variant: "destructive",
      });
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      // Clear mock session
      localStorage.removeItem('mockSession');
      setUser(null);
      setSession(null);
      setUserRoleState(null);

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in
    toast({
      title: "Coming Soon",
      description: "Google sign-in will be available soon!",
    });
    return { error: null };
  };

  const signInWithGithub = async () => {
    // Mock GitHub sign in
    toast({
      title: "Coming Soon",
      description: "GitHub sign-in will be available soon!",
    });
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    userRole,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGithub,
    setUserRole,
    isWorker,
    isEmployer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};