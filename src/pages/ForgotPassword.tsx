import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/common/PageTransition';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: 'Email Sent',
        description: 'Check your inbox for a password reset link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset email.',
        variant: 'destructive',
      });
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
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-white/80">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <Card className="form-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center font-semibold text-slate-800">
                {sent ? 'Check Your Email' : 'Forgot Password'}
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                {sent
                  ? 'We sent a password reset link to your email'
                  : 'We\'ll send you instructions to reset your password'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button onClick={() => setSent(false)} className="text-primary font-medium hover:underline">
                      try again
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input border-0 bg-white/80 placeholder:text-slate-400 text-slate-700 rounded-xl py-3 px-4"
                    required
                  />
                  <Button
                    type="submit"
                    className="form-button w-full border-0 text-white font-semibold py-3 rounded-xl"
                    disabled={!email || isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
