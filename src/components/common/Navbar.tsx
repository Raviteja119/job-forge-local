import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, User, LogIn, UserPlus, FileText, Phone } from 'lucide-react';
import navbarPattern from '@/assets/navbar-pattern.jpg';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="sticky top-0 z-50 transition-slow border-b border-border shadow-lg relative"
      style={{
        backgroundImage: `url(${navbarPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-card/90 backdrop-blur-md"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-fast group">
            <div className="relative">
              <Briefcase className="h-8 w-8 text-primary hover:rotate-12 transition-fast drop-shadow-sm" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-fast"></div>
            </div>
            <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-accent-warm bg-clip-text text-transparent drop-shadow-sm">
              JobConnect
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"} 
                size="sm"
                className="transition-smooth"
              >
                Home
              </Button>
            </Link>
            
            <Link to="/jobs">
              <Button 
                variant={isActive('/jobs') ? "default" : "ghost"} 
                size="sm"
                className="transition-smooth"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Available Jobs
              </Button>
            </Link>
            
            <Link to="/post-job">
              <Button 
                variant={isActive('/post-job') ? "default" : "ghost"} 
                size="sm"
                className="transition-smooth"
              >
                <FileText className="w-4 h-4 mr-2" />
                Post a Job
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button 
                variant={isActive('/profile') ? "default" : "ghost"} 
                size="sm"
                className="transition-smooth"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                variant={isActive('/contact') ? "default" : "ghost"} 
                size="sm"
                className="transition-smooth"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="transition-smooth"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                variant="success" 
                size="sm"
                className="transition-smooth"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile menu button (for future mobile implementation) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Briefcase className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;