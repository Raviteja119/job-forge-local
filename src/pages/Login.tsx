import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import loginBg from '@/assets/login-bg.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithGithub, user, userRole, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      // Redirect based on role
      setTimeout(() => {
        const role = localStorage.getItem(`user_role_${user?.id}`);
        if (role === 'employer') {
          navigate('/employer-dashboard');
        } else if (role === 'worker') {
          navigate('/worker-dashboard');
        } else {
          navigate('/register-selection');
        }
      }, 100);
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    if (provider === 'google') {
      await signInWithGoogle();
    } else {
      await signInWithGithub();
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen form-container flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center animate-slide-up">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">J</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/80">
            Sign in to your JobConnect account
          </p>
        </div>

        <Card className="form-card border-0 animate-scale-in stagger-delay-1">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl text-center font-semibold text-slate-800">Sign In</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email or Username"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input border-0 bg-white/80 placeholder:text-slate-400 text-slate-700 rounded-xl py-3 px-4"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input border-0 bg-white/80 placeholder:text-slate-400 text-slate-700 rounded-xl py-3 px-4 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="form-button w-full border-0 text-white font-semibold py-3 rounded-xl"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('google')}
                  className="bg-white/80 border-slate-200 hover:bg-white/90"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('github')}
                  className="bg-white/80 border-slate-200 hover:bg-white/90"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-center">
                <span className="text-slate-600 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register-selection" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
            <p className="text-white/90 text-sm">
              <strong>Demo:</strong> Use any email and password to test
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;