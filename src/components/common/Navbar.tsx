import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, User, LogIn, UserPlus, FileText, Phone, 
  LogOut, Users, Menu, Bell, Moon, Sun, X, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const location = useLocation();
  const { user, userRole, userProfile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    setMobileOpen(false);
  };

  // Mock notifications - will be replaced with Supabase data
  const notifications = user ? [
    { id: 1, title: 'New Job Match', message: 'A new job matching your skills has been posted', type: 'job_update', read: false, time: '2 hours ago' },
    { id: 2, title: 'Application Update', message: 'Your application has been reviewed', type: 'application_update', read: false, time: '5 hours ago' },
    { id: 3, title: 'Welcome!', message: 'Welcome to JobConnect. Complete your profile to get started.', type: 'info', read: true, time: '1 day ago' },
  ] : [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { path: '/', label: 'Home', icon: null, show: true },
    { path: '/jobs', label: 'Available Jobs', icon: Briefcase, show: true },
    { path: '/post-job', label: 'Post a Job', icon: FileText, show: userRole === 'employer' },
    { path: '/browse-workers', label: 'Find Workers', icon: Users, show: userRole === 'employer' },
    { path: userRole === 'employer' ? '/employer-dashboard' : '/worker-dashboard', label: 'Dashboard', icon: User, show: !!user },
    { path: '/contact', label: 'Contact', icon: Phone, show: true },
  ];

  const NavLink = ({ path, label, icon: Icon, onClick }: { path: string; label: string; icon: any; onClick?: () => void }) => (
    <Link to={path} onClick={onClick}>
      <Button 
        variant={isActive(path) ? "default" : "ghost"} 
        size="sm"
        className="transition-smooth w-full justify-start"
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {label}
      </Button>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-border shadow-sm bg-card/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-fast group">
            <div className="relative">
              <Briefcase className="h-7 w-7 text-primary hover:rotate-12 transition-fast" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-warm bg-clip-text text-transparent">
              JobConnect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.filter(l => l.show).map(link => (
              <Link key={link.path} to={link.path}>
                <Button variant={isActive(link.path) ? "default" : "ghost"} size="sm" className="transition-smooth">
                  {link.icon && <link.icon className="w-4 h-4 mr-1.5" />}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="transition-smooth">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Notifications */}
            {user && (
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative transition-smooth">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold animate-scale-in">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="text-xs">{unreadCount} new</Badge>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${!notif.read ? 'bg-primary/5' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" size="sm" className="w-full text-primary">
                        <CheckCircle className="w-4 h-4 mr-2" />Mark all as read
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            )}

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button variant={isActive('/profile') ? "default" : "ghost"} size="sm" className="transition-smooth">
                      <User className="w-4 h-4 mr-1.5" />Profile
                    </Button>
                  </Link>
                  <span className="text-sm text-foreground/80 hidden lg:block font-medium px-3 py-1.5 bg-primary/10 rounded-md">
                    {userProfile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                  </span>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="transition-smooth">
                    <LogOut className="w-4 h-4 mr-1.5" />Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="transition-smooth">
                      <LogIn className="w-4 h-4 mr-1.5" />Login
                    </Button>
                  </Link>
                  <Link to="/register-selection">
                    <Button variant="success" size="sm" className="transition-smooth">
                      <UserPlus className="w-4 h-4 mr-1.5" />Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-foreground">JobConnect</span>
                  </div>
                  {user && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Welcome, {userProfile?.username || user.email?.split('@')[0]}
                    </p>
                  )}
                </div>
                
                <div className="p-4 space-y-1">
                  {navLinks.filter(l => l.show).map(link => (
                    <NavLink key={link.path} {...link} onClick={() => setMobileOpen(false)} />
                  ))}
                  
                  <Separator className="my-4" />
                  
                  {user ? (
                    <>
                      <NavLink path="/profile" label="My Profile" icon={User} onClick={() => setMobileOpen(false)} />
                      <Button onClick={handleLogout} variant="outline" className="w-full justify-start mt-2">
                        <LogOut className="w-4 h-4 mr-2" />Logout
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />Login
                        </Button>
                      </Link>
                      <Link to="/register-selection" onClick={() => setMobileOpen(false)}>
                        <Button variant="success" className="w-full">
                          <UserPlus className="w-4 h-4 mr-2" />Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
