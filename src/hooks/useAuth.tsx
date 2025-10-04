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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        // Load role from localStorage
        if (session?.user) {
          const savedRole = localStorage.getItem(`user_role_${session.user.id}`) as 'worker' | 'employer' | null;
          setUserRoleState(savedRole);
        } else {
          setUserRoleState(null);
        }
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // Load role from localStorage
      if (session?.user) {
        const savedRole = localStorage.getItem(`user_role_${session.user.id}`) as 'worker' | 'employer' | null;
        setUserRoleState(savedRole);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            mobile,
          }
        }
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user && role) {
        // Save role to localStorage
        localStorage.setItem(`user_role_${data.user.id}`, role);
        setUserRoleState(role);
      }

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Error", 
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "Google Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "GitHub Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
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