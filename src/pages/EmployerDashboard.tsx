import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, Mail, Phone, MapPin, Briefcase, Users, 
  Edit, Plus, Eye, CheckCircle, Clock, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AvatarImage } from '@/components/ui/avatar';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  
  // Mock employer data
  const employerData = {
    companyName: 'BuildCorp Ltd',
    companyType: 'Construction Company',
    email: user?.email || 'employer@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    established: '2015',
    employees: '200-500',
    totalJobsPosted: 18,
    activeJobs: 7,
    totalApplications: 142,
    hiredWorkers: 25,
  };

  const activeJobs = [
    {
      id: 1,
      title: 'Electrician Helper',
      category: 'Electrical',
      postedDate: '2024-01-15',
      applications: 12,
      status: 'Active',
      wage: '₹500/day',
    },
    {
      id: 2,
      title: 'Construction Worker',
      category: 'Construction',
      postedDate: '2024-01-12',
      applications: 25,
      status: 'Active',
      wage: '₹450/day',
    },
    {
      id: 3,
      title: 'Plumber Assistant',
      category: 'Plumbing',
      postedDate: '2024-01-10',
      applications: 8,
      status: 'Active',
      wage: '₹400/day',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      workerName: 'Rajesh Kumar',
      jobTitle: 'Electrician Helper',
      appliedDate: '2024-01-16',
      rating: 4.7,
      experience: '3-5 years',
      status: 'New',
    },
    {
      id: 2,
      workerName: 'Amit Singh',
      jobTitle: 'Construction Worker',
      appliedDate: '2024-01-15',
      rating: 4.5,
      experience: '5-10 years',
      status: 'Reviewed',
    },
    {
      id: 3,
      workerName: 'Suresh Patel',
      jobTitle: 'Plumber Assistant',
      appliedDate: '2024-01-14',
      rating: 4.2,
      experience: '1-3 years',
      status: 'Shortlisted',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'New': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Reviewed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Shortlisted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Company Header */}
        <Card className="card-shadow hover-glow border-0 animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile?.profilePhotoUrl} />
                <AvatarFallback className="text-2xl bg-accent-warm text-accent-warm-foreground">
                  <Building2 className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-foreground">{employerData.companyName}</h1>
                    <Badge variant="secondary">Employer</Badge>
                  </div>
                  <p className="text-muted-foreground">{employerData.companyType}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{employerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{employerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{employerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">Est. {employerData.established}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => navigate('/employer-details')}
                >
                  <Edit className="w-4 h-4" />
                  Edit Company
                </Button>
                <Button 
                  variant="accent"
                  onClick={() => navigate('/post-job')}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Post New Job
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-3xl font-bold text-primary">{employerData.activeJobs}</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                  <p className="text-3xl font-bold text-success">{employerData.totalJobsPosted}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-3xl font-bold text-accent-warm">{employerData.totalApplications}</p>
                </div>
                <Clock className="w-8 h-8 text-accent-warm" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hired</p>
                  <p className="text-3xl font-bold text-success">{employerData.hiredWorkers}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Jobs */}
          <Card className="card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Job Postings</CardTitle>
                  <CardDescription>Your current job listings</CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/post-job')}>
                  <Plus className="w-4 h-4 mr-1" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job, index) => (
                <div key={job.id}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{job.title}</h4>
                        <Badge variant="outline" className="text-xs">{job.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Posted {job.postedDate}</span>
                        <span className="font-semibold text-success">{job.wage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium text-primary">{job.applications} applications</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  {index < activeJobs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest worker applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={app.id}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{app.workerName}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">⭐</span>
                          <span className="text-xs font-medium">{app.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Applied {app.appliedDate}</span>
                        <span>{app.experience}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                  {index < recentApplications.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center gap-2"
                onClick={() => navigate('/post-job')}
              >
                <Plus className="w-6 h-6" />
                <span>Post New Job</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center gap-2"
              >
                <Users className="w-6 h-6" />
                <span>View All Applications</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center gap-2"
                onClick={() => navigate('/employer-details')}
              >
                <Edit className="w-6 h-6" />
                <span>Update Company Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;
