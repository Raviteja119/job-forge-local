import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Users, FileText, CheckCircle, Building2, Wrench, Code, Palette } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (searchQuery || location) {
      navigate(`/jobs?search=${searchQuery}&location=${location}`);
    } else {
      navigate('/jobs');
    }
  };

  const jobCategories = [
    { name: 'Construction', count: 245, icon: Building2, color: 'bg-orange-500' },
    { name: 'Technical Services', count: 189, icon: Wrench, color: 'bg-blue-500' },
    { name: 'IT & Development', count: 312, icon: Code, color: 'bg-purple-500' },
    { name: 'Creative & Design', count: 156, icon: Palette, color: 'bg-pink-500' },
  ];

  const featuredJobs = [
    { id: 1, title: 'Senior Electrician', company: 'BuildCorp', location: 'New York, NY', wage: '$45/hr', type: 'Full-time', skills: ['Electrical', 'Safety'] },
    { id: 2, title: 'Plumbing Specialist', company: 'HomeServe', location: 'Los Angeles, CA', wage: '$38/hr', type: 'Contract', skills: ['Plumbing', 'Repair'] },
    { id: 3, title: 'HVAC Technician', company: 'Climate Control', location: 'Chicago, IL', wage: '$42/hr', type: 'Full-time', skills: ['HVAC', 'Maintenance'] }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white" style={{ backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.9)), url(${heroImage})`, backgroundSize: 'cover' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Find Your Next Opportunity</h1>
            <p className="text-xl text-blue-100">Connect with top employers and skilled workers</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {jobCategories.map((cat) => (
              <Card key={cat.name} className="hover:shadow-lg cursor-pointer" onClick={() => navigate(`/jobs?category=${cat.name}`)}>
                <CardContent className="p-6">
                  <div className={`${cat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
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
                    <Link to="/jobs"><Button className="w-full">View Details</Button></Link>
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
