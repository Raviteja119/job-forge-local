import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building2, CheckCircle } from 'lucide-react';
import registerBg from '@/assets/register-bg.jpg';

const RegisterSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'worker' | 'employer') => {
    navigate('/register', { state: { role } });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 relative animate-fade-in"
      style={{
        backgroundImage: `url(${registerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent-warm/30 backdrop-blur-sm"></div>
      
      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-8">
        <div className="text-center animate-slide-up">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
            Join JobConnect
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Choose how you want to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Worker Registration */}
          <Card className="card-shadow hover-lift bg-card/95 backdrop-blur-md border-0 hover-glow animate-scale-in stagger-delay-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">I'm a Worker</CardTitle>
              <CardDescription className="text-base">
                Looking for job opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Browse and apply to local jobs
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Showcase your skills and experience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Track applications and build your rating
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Get hired by verified employers
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => handleRoleSelection('worker')} 
                className="w-full"
                size="lg"
              >
                Register as Worker
              </Button>
            </CardContent>
          </Card>

          {/* Employer Registration */}
          <Card className="card-shadow hover-lift bg-card/95 backdrop-blur-md border-0 hover-glow animate-scale-in stagger-delay-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-accent-warm/10 flex items-center justify-center mb-4">
                <Building2 className="w-10 h-10 text-accent-warm" />
              </div>
              <CardTitle className="text-2xl">I'm an Employer</CardTitle>
              <CardDescription className="text-base">
                Looking to hire skilled workers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Post unlimited job listings
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Access to verified skilled workers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Manage applications efficiently
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Build your company reputation
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => handleRoleSelection('employer')} 
                variant="accent"
                className="w-full"
                size="lg"
              >
                Register as Employer
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-white drop-shadow">
            Already have an account?{' '}
            <Button 
              variant="link" 
              className="text-white underline p-0 h-auto"
              onClick={() => navigate('/login')}
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelection;
