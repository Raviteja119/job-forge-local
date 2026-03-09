import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Zap, Hammer, Paintbrush, Wrench, Droplet, Scissors, Truck, HardHat, Drill, Ruler, ArrowRight, Users, Briefcase, Star, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-image.jpg';
import PageTransition from '@/components/common/PageTransition';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (searchQuery || location) {
      navigate(`/jobs?search=${searchQuery}&location=${location}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (!user) {
      sessionStorage.setItem('redirectAfterLogin', `/jobs?category=${encodeURIComponent(categoryName)}`);
      navigate('/login');
    } else {
      navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const jobCategories = [
    { name: 'Electrical', count: 145, icon: Zap, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Carpentry', count: 98, icon: Hammer, color: 'from-amber-500 to-amber-700' },
    { name: 'Painting', count: 87, icon: Paintbrush, color: 'from-purple-400 to-purple-600' },
    { name: 'Plumbing', count: 112, icon: Droplet, color: 'from-blue-400 to-blue-600' },
    { name: 'Welding', count: 73, icon: Drill, color: 'from-orange-500 to-orange-700' },
    { name: 'Masonry', count: 91, icon: HardHat, color: 'from-stone-500 to-stone-700' },
    { name: 'HVAC', count: 65, icon: Wrench, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Landscaping', count: 54, icon: Scissors, color: 'from-green-500 to-green-700' },
    { name: 'Roofing', count: 48, icon: Ruler, color: 'from-slate-500 to-slate-700' },
    { name: 'Transportation', count: 102, icon: Truck, color: 'from-red-500 to-red-700' },
  ];

  const featuredJobs = [
    { id: 1, title: 'Senior Electrician', company: 'BuildCorp', location: 'Mumbai, MH', wage: '₹600/hr', type: 'Full-time', skills: ['Electrical', 'Safety'] },
    { id: 2, title: 'Plumbing Specialist', company: 'HomeServe', location: 'Delhi, DL', wage: '₹500/hr', type: 'Contract', skills: ['Plumbing', 'Repair'] },
    { id: 3, title: 'HVAC Technician', company: 'Climate Control', location: 'Bangalore, KA', wage: '₹550/hr', type: 'Full-time', skills: ['HVAC', 'Maintenance'] }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Skilled Workers', color: 'text-primary' },
    { icon: Briefcase, value: '5,000+', label: 'Jobs Posted', color: 'text-success' },
    { icon: Star, value: '4.8/5', label: 'Avg Rating', color: 'text-yellow-500' },
    { icon: Shield, value: '100%', label: 'Verified', color: 'text-accent-warm' },
  ];

  const handleFeaturedJobClick = () => {
    if (!user) {
      sessionStorage.setItem('redirectAfterLogin', '/jobs');
      navigate('/register-selection');
    } else {
      navigate('/jobs');
    }
  };

  return (
    <PageTransition>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-white overflow-hidden" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1.5 text-sm">
              🚀 India's #1 Skilled Worker Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Find Your Next<br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">Opportunity</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow">
              Connect with top employers and skilled workers across India
            </p>
            <Button
              onClick={() => navigate(user ? '/jobs' : '/register-selection')}
              size="lg"
              className="bg-white text-primary hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover-lift"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-slide-up stagger-delay-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input placeholder="Search for jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12 text-foreground border-border" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-10 h-12 text-foreground border-border" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full mt-4 h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-base">
              <Search className="w-4 h-4 mr-2" />Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/5 via-background to-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mx-auto w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge variant="secondary" className="mb-3">Categories</Badge>
            <h2 className="text-3xl font-bold text-foreground">Popular Job Categories</h2>
            <p className="text-muted-foreground mt-2">Explore opportunities across various skilled trades</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {jobCategories.map((cat, index) => (
              <Card 
                key={cat.name} 
                className="hover:shadow-xl cursor-pointer transition-all group border-0 card-shadow hover-lift animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <CardContent className="p-5 text-center">
                  <div className={`bg-gradient-to-br ${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-muted-foreground text-sm">{cat.count} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge variant="secondary" className="mb-3">Featured</Badge>
              <h2 className="text-3xl font-bold text-foreground">Featured Jobs</h2>
            </div>
            <Link to="/jobs"><Button variant="outline" className="hover-lift">View All <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <Card key={job.id} className="border-0 card-shadow hover-lift animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground"><MapPin className="h-4 w-4 mr-2" />{job.location}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">{job.wage}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map(skill => <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>)}
                    </div>
                    <Button onClick={handleFeaturedJobClick} className="w-full mt-2">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-hover to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for skilled workers or searching for your next job, JobConnect has you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register-selection')} 
              size="lg" 
              className="bg-white text-primary hover:bg-blue-50 font-semibold px-8 shadow-xl hover-lift"
            >
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => navigate('/jobs')} 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
