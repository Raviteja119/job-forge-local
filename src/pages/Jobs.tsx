import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Search, MapPin, Clock, Filter, Briefcase, Building, 
  Star, Calendar, DollarSign, Users 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Jobs = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: 'Electrician Helper',
      company: 'PowerTech Solutions',
      companyRating: 4.5,
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      category: 'Electrical',
      wage: '₹500/day',
      wageRange: '₹450-550/day',
      duration: '3 months',
      postedDate: '2024-01-15',
      urgency: 'Urgent',
      description: 'Looking for an experienced electrician helper to assist with residential and commercial electrical installations. Must have basic knowledge of electrical systems and safety protocols.',
      requirements: ['Basic electrical knowledge', 'Safety certification preferred', '1+ years experience'],
      skills: ['Electrical Work', 'Safety Protocols', 'Tool Handling'],
      benefits: ['Medical Insurance', 'Performance Bonus', 'Training Provided'],
      employerDetails: {
        name: 'PowerTech Solutions',
        type: 'Electrical Contractor',
        established: '2018',
        employees: '50-100',
      },
    },
    {
      id: 2,
      title: 'Construction Worker',
      company: 'BuildCorp Ltd',
      companyRating: 4.2,
      location: 'Delhi, NCR',
      type: 'Contract',
      category: 'Construction',
      wage: '₹450/day',
      wageRange: '₹400-500/day',
      duration: '6 months',
      postedDate: '2024-01-12',
      urgency: null,
      description: 'Seeking skilled construction workers for a major residential project. Candidates should have experience in concrete work, masonry, and general construction activities.',
      requirements: ['2+ years construction experience', 'Physical fitness', 'Team player'],
      skills: ['Construction', 'Masonry', 'Heavy Lifting', 'Concrete Work'],
      benefits: ['Overtime Pay', 'Free Meals', 'Transportation'],
      employerDetails: {
        name: 'BuildCorp Ltd',
        type: 'Construction Company',
        established: '2015',
        employees: '200-500',
      },
    },
    {
      id: 3,
      title: 'Plumber Assistant',
      company: 'AquaFix Services',
      companyRating: 4.8,
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      category: 'Plumbing',
      wage: '₹400/day',
      wageRange: '₹350-450/day',
      duration: 'Permanent',
      postedDate: '2024-01-10',
      urgency: null,
      description: 'Join our team as a plumber assistant. Help with pipe installations, repairs, and maintenance work. Great opportunity to learn and grow in the plumbing field.',
      requirements: ['Willingness to learn', 'Basic tool knowledge', 'Good communication'],
      skills: ['Plumbing', 'Pipe Fitting', 'Problem Solving'],
      benefits: ['Skill Training', 'Career Growth', 'Health Insurance'],
      employerDetails: {
        name: 'AquaFix Services',
        type: 'Home Services',
        established: '2020',
        employees: '20-50',
      },
    },
    {
      id: 4,
      title: 'Painter - Interior & Exterior',
      company: 'ColorCraft Painters',
      companyRating: 4.3,
      location: 'Pune, Maharashtra',
      type: 'Contract',
      category: 'Painting',
      wage: '₹600/day',
      wageRange: '₹550-650/day',
      duration: '4 months',
      postedDate: '2024-01-08',
      urgency: 'Urgent',
      description: 'Experienced painter needed for residential and commercial painting projects. Must be skilled in both interior and exterior painting techniques.',
      requirements: ['3+ years painting experience', 'Own painting tools', 'Quality focused'],
      skills: ['Interior Painting', 'Exterior Painting', 'Color Mixing', 'Surface Preparation'],
      benefits: ['Material Allowance', 'Project Bonus', 'Flexible Hours'],
      employerDetails: {
        name: 'ColorCraft Painters',
        type: 'Painting Contractor',
        established: '2017',
        employees: '10-20',
      },
    },
    {
      id: 5,
      title: 'Cleaning Supervisor',
      company: 'CleanPro Services',
      companyRating: 4.1,
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      category: 'Cleaning',
      wage: '₹350/day',
      wageRange: '₹300-400/day',
      duration: 'Permanent',
      postedDate: '2024-01-05',
      urgency: null,
      description: 'Looking for a cleaning supervisor to manage cleaning operations in commercial buildings. Responsible for team coordination and quality control.',
      requirements: ['Leadership skills', 'Cleaning experience', 'Good communication'],
      skills: ['Team Management', 'Quality Control', 'Cleaning Techniques'],
      benefits: ['Leadership Role', 'Team Bonus', 'Professional Growth'],
      employerDetails: {
        name: 'CleanPro Services',
        type: 'Facility Management',
        established: '2019',
        employees: '100-200',
      },
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || job.category === categoryFilter;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleApply = (jobId: number, jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} has been submitted successfully.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Available Jobs</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover local job opportunities that match your skills and experience
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, company, or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Painting">Painting</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </p>
                <Select onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="salary-high">Highest Salary</SelectItem>
                    <SelectItem value="salary-low">Lowest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="card-shadow hover:hover-shadow transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Job Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                        {job.urgency && (
                          <Badge variant="destructive" className="text-xs">
                            {job.urgency}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium text-primary">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(job.companyRating)}
                          <span className="text-sm">({job.companyRating})</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {getDaysAgo(job.postedDate)} days ago
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-success">{job.wage}</div>
                      <div className="text-sm text-muted-foreground">{job.wageRange}</div>
                      <Badge variant="secondary">{job.category}</Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Job Description */}
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit) => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Employer: {job.employerDetails.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.employerDetails.type} • Est. {job.employerDetails.established} • {job.employerDetails.employees} employees
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="transition-smooth"
                      >
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleApply(job.id, job.title)}
                        className="transition-smooth"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="card-shadow">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;