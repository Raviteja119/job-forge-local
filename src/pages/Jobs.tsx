import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import JobApplicationDialog from '@/components/jobs/JobApplicationDialog';
import JobDetailsDialog from '@/components/jobs/JobDetailsDialog';
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
import { sampleJobs, Job } from '@/data/sampleJobs';

const Jobs = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<Job | null>(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);

  const jobs = sampleJobs;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || job.category === categoryFilter;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleApply = (job: Job) => {
    setSelectedJobForApplication(job);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJobForDetails(job);
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
        <Card className="card-shadow animate-fade-in hover-glow border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-fast" />
                  <Input
                    placeholder="Search jobs by title, company, or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 transition-fast focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-fast" />
                  <Input
                    placeholder="Location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 transition-fast focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Select onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Carpentry">Carpentry</SelectItem>
                    <SelectItem value="Painting">Painting</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Welding">Welding</SelectItem>
                    <SelectItem value="Masonry">Masonry</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Landscaping">Landscaping</SelectItem>
                    <SelectItem value="Roofing">Roofing</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
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
          {filteredJobs.map((job, index) => (
            <Card key={job.id} className={`card-shadow hover-lift animate-fade-in border-0 hover-glow stagger-delay-${Math.min(index + 1, 6)}`}>
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
                          <h4 className="font-semibold mb-2 text-primary">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-fast">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-success">Benefits</h4>
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
                        onClick={() => handleViewDetails(job)}
                        className="transition-smooth hover:border-primary hover:text-primary"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleApply(job)}
                        variant="hero"
                        size="sm"
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
          <Card className="card-shadow animate-fade-in border-0">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-scale-in" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedJobForApplication && (
        <JobApplicationDialog
          open={!!selectedJobForApplication}
          onOpenChange={(open) => !open && setSelectedJobForApplication(null)}
          job={selectedJobForApplication}
        />
      )}

      {selectedJobForDetails && (
        <JobDetailsDialog
          open={!!selectedJobForDetails}
          onOpenChange={(open) => !open && setSelectedJobForDetails(null)}
          job={selectedJobForDetails}
          onApply={() => setSelectedJobForApplication(selectedJobForDetails)}
        />
      )}
    </div>
  );
};

export default Jobs;