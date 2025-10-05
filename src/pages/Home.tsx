import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Zap, Hammer, Paintbrush, Wrench, Droplet, Scissors, Truck, HardHat, Drill, Ruler } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-image.jpg';

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
      // Store the intended category in sessionStorage
      sessionStorage.setItem('redirectAfterLogin', `/jobs?category=${encodeURIComponent(categoryName)}`);
      navigate('/login');
    } else {
      navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const jobCategories = [
    { name: 'Electrical', count: 145, icon: Zap, color: 'bg-yellow-500' },
    { name: 'Carpentry', count: 98, icon: Hammer, color: 'bg-amber-600' },
    { name: 'Painting', count: 87, icon: Paintbrush, color: 'bg-purple-500' },
    { name: 'Plumbing', count: 112, icon: Droplet, color: 'bg-blue-500' },
    { name: 'Welding', count: 73, icon: Drill, color: 'bg-orange-600' },
    { name: 'Masonry', count: 91, icon: HardHat, color: 'bg-stone-600' },
    { name: 'HVAC', count: 65, icon: Wrench, color: 'bg-cyan-500' },
    { name: 'Landscaping', count: 54, icon: Scissors, color: 'bg-green-600' },
    { name: 'Roofing', count: 48, icon: Ruler, color: 'bg-slate-600' },
    { name: 'Transportation', count: 102, icon: Truck, color: 'bg-red-600' },
  ];

  const featuredJobs = [
    { id: 1, title: 'Senior Electrician', company: 'BuildCorp', location: 'New York, NY', wage: '$45/hr', type: 'Full-time', skills: ['Electrical', 'Safety'] },
    { id: 2, title: 'Plumbing Specialist', company: 'HomeServe', location: 'Los Angeles, CA', wage: '$38/hr', type: 'Contract', skills: ['Plumbing', 'Repair'] },
    { id: 3, title: 'HVAC Technician', company: 'Climate Control', location: 'Chicago, IL', wage: '$42/hr', type: 'Full-time', skills: ['HVAC', 'Maintenance'] }
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
    <div className="min-h-screen">
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white" style={{ backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.9)), url(${heroImage})`, backgroundSize: 'cover' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Find Your Next Opportunity</h1>
            <p className="text-xl text-blue-100 mb-6">Connect with top employers and skilled workers</p>
            <Button
              onClick={() => navigate(user ? '/jobs' : '/register-selection')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg"
            >
              Get Started
            </Button>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input placeholder="Search for jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12 text-slate-800" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-10 h-12 text-slate-800" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700">Search Jobs</Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {jobCategories.map((cat) => (
              <Card key={cat.name} className="hover:shadow-lg cursor-pointer transition-all group" onClick={() => handleCategoryClick(cat.name)}>
                <CardContent className="p-6">
                  <div className={`${cat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                  <p className="text-slate-600 text-sm">{cat.count} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link to="/jobs"><Button variant="outline">View All</Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600"><MapPin className="h-4 w-4 mr-2" />{job.location}</div>
                    <div className="flex justify-between"><span className="text-xl font-bold text-blue-600">{job.wage}</span><Badge>{job.type}</Badge></div>
                    <Button onClick={handleFeaturedJobClick} className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
