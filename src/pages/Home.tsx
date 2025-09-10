import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Users, CheckCircle, Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const jobCategories = [
    { name: 'Construction', count: 45, icon: '🏗️' },
    { name: 'Electrical', count: 32, icon: '⚡' },
    { name: 'Plumbing', count: 28, icon: '🔧' },
    { name: 'Carpentry', count: 38, icon: '🪚' },
    { name: 'Painting', count: 25, icon: '🎨' },
    { name: 'Cleaning', count: 52, icon: '🧹' },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Electrician Helper',
      company: 'PowerTech Solutions',
      location: 'Mumbai',
      wage: '₹500/day',
      type: 'Full-time',
      skills: ['Electrical Work', 'Safety Protocols'],
    },
    {
      id: 2,
      title: 'Construction Worker',
      company: 'BuildCorp Ltd',
      location: 'Delhi',
      wage: '₹450/day',
      type: 'Contract',
      skills: ['Construction', 'Heavy Lifting'],
    },
    {
      id: 3,
      title: 'Plumber Assistant',
      company: 'AquaFix Services',
      location: 'Bangalore',
      wage: '₹400/day',
      type: 'Full-time',
      skills: ['Plumbing', 'Pipe Fitting'],
    },
  ];

  const handleSearch = () => {
    // Navigate to jobs page with search params
    console.log('Searching for:', searchQuery, 'in', location);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-20 px-4">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Next <span className="text-accent-warm">Local Job</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Connect with local employers seeking skilled workers. From construction to home services, find opportunities that match your skills.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Search jobs by skill or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <Button 
                variant="accent" 
                size="lg" 
                onClick={handleSearch}
                className="md:px-8"
              >
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {jobCategories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <Badge variant="secondary">{category.count} jobs</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link to="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="card-shadow hover:hover-shadow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-success font-semibold">
                      <Clock className="w-4 h-4 mr-2" />
                      {job.wage}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-4">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How JobConnect Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Create Profile</h3>
              <p className="text-muted-foreground">Sign up and showcase your skills and experience</p>
            </div>
            <div className="text-center">
              <div className="bg-success text-success-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Browse Jobs</h3>
              <p className="text-muted-foreground">Search and filter jobs that match your skills</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-warm text-accent-warm-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Apply & Connect</h3>
              <p className="text-muted-foreground">Apply to jobs and connect with employers</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Build Rating</h3>
              <p className="text-muted-foreground">Complete jobs and build your reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 primary-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Job?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of skilled workers who have found their perfect match on JobConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="accent" size="lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;