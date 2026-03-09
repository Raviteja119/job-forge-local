import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/common/PageTransition';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (!hash.includes('type=recovery')) {
      toast({
        title: 'Invalid Link',
        description: 'This password reset link is invalid or has expired.',
        variant: 'destructive',
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }

    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setSuccess(true);
      toast({ title: 'Password Updated', description: 'Your password has been successfully reset.' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to reset password.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen form-container flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-6 relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">New Password</h2>
            <p className="text-white/80">Create a strong new password</p>
          </div>

          <Card className="form-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center font-semibold text-slate-800">
                {success ? 'Password Reset!' : 'Set New Password'}
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                {success ? 'Redirecting to login...' : 'Enter your new password below'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">You'll be redirected to login shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input border-0 bg-white/80 placeholder:text-slate-400 text-slate-700 rounded-xl py-3 px-4 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input border-0 bg-white/80 placeholder:text-slate-400 text-slate-700 rounded-xl py-3 px-4"
                    required
                  />
                  <Button
                    type="submit"
                    className="form-button w-full border-0 text-white font-semibold py-3 rounded-xl"
                    disabled={!password || !confirmPassword || isLoading}
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;
