import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  username: string;
  mobile: string;
  profilePhotoUrl: string;
  preferredJobRoles: string[];
  address: string;
  experience: string;
  description: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: 'worker' | 'employer' | null;
  userProfile: UserProfile | null;
  signUp: (email: string, password: string, username?: string, mobile?: string, role?: 'worker' | 'employer') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGithub: () => Promise<{ error: any }>;
  setUserRole: (role: 'worker' | 'employer') => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for mock session on mount
    const mockSessionData = localStorage.getItem('mockSession');
    if (mockSessionData) {
      const mockSession = JSON.parse(mockSessionData);
      setSession(mockSession);
      setUser(mockSession.user);
      
      // Load role and profile from localStorage
      if (mockSession.user) {
        const savedRole = localStorage.getItem(`user_role_${mockSession.user.id}`) as 'worker' | 'employer' | null;
        setUserRoleState(savedRole);

        const savedProfile = localStorage.getItem(`user_profile_${mockSession.user.id}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          // Initialize default profile
          const defaultProfile: UserProfile = {
            username: mockSession.user.user_metadata?.username || mockSession.user.email?.split('@')[0] || '',
            mobile: mockSession.user.user_metadata?.mobile || '',
            profilePhotoUrl: '',
            preferredJobRoles: [],
            address: '',
            experience: '',
            description: ''
          };
          setUserProfile(defaultProfile);
          localStorage.setItem(`user_profile_${mockSession.user.id}`, JSON.stringify(defaultProfile));
        }
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

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedProfile = { ...userProfile, ...profile } as UserProfile;
      setUserProfile(updatedProfile);
      localStorage.setItem(`user_profile_${user.id}`, JSON.stringify(updatedProfile));
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

      // Initialize default profile
      const defaultProfile: UserProfile = {
        username: username || email.split('@')[0],
        mobile: mobile || '',
        profilePhotoUrl: '',
        preferredJobRoles: [],
        address: '',
        experience: '',
        description: ''
      };
      setUserProfile(defaultProfile);
      localStorage.setItem(`user_profile_${userId}`, JSON.stringify(defaultProfile));

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

      // Load role and profile
      const savedRole = localStorage.getItem(`user_role_${mockUser.id}`) as 'worker' | 'employer' | null;
      setUserRoleState(savedRole);

      const savedProfile = localStorage.getItem(`user_profile_${mockUser.id}`);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

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
      setUserProfile(null);

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
    userProfile,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGithub,
    setUserRole,
    updateUserProfile,
    isWorker,
    isEmployer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};