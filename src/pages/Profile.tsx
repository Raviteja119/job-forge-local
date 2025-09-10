import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, Phone, Mail, MapPin, Briefcase, Star, Clock, 
  CheckCircle, Edit, Award, TrendingUp 
} from 'lucide-react';

const Profile = () => {
  // Mock user data - in real app this would come from API/state management
  const userData = {
    id: 'W001',
    username: 'rajesh_kumar',
    name: 'Rajesh Kumar',
    mobile: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    avatar: '', // Can add actual avatar URL
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 2024',
    rating: 4.7,
    totalJobs: 15,
    completedJobs: 12,
    skills: ['Construction Work', 'Electrical Work', 'Plumbing', 'Carpentry'],
    preferredRoles: ['Construction Worker', 'Electrician', 'Maintenance Worker'],
    experience: '3-5 years',
    description: 'Experienced construction worker with expertise in electrical and plumbing work. Reliable, punctual, and committed to quality work.',
  };

  const appliedJobs = [
    {
      id: 1,
      title: 'Electrician Helper',
      company: 'PowerTech Solutions',
      status: 'Under Review',
      appliedDate: '2024-01-15',
      location: 'Mumbai',
    },
    {
      id: 2,
      title: 'Construction Worker',
      company: 'BuildCorp Ltd',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-12',
      location: 'Thane',
    },
    {
      id: 3,
      title: 'Maintenance Technician',
      company: 'PropertyCare Services',
      status: 'Rejected',
      appliedDate: '2024-01-08',
      location: 'Mumbai',
    },
  ];

  const completedJobs = [
    {
      id: 1,
      title: 'Electrical Wiring Installation',
      company: 'Home Solutions',
      completedDate: '2024-01-05',
      duration: '3 days',
      rating: 5,
      feedback: 'Excellent work! Very professional and completed on time.',
      earnings: '₹2,400',
    },
    {
      id: 2,
      title: 'Bathroom Plumbing Repair',
      company: 'QuickFix Services',
      completedDate: '2023-12-28',
      duration: '1 day',
      rating: 4,
      feedback: 'Good work, though took slightly longer than expected.',
      earnings: '₹800',
    },
    {
      id: 3,
      title: 'Office Interior Painting',
      company: 'Corporate Spaces',
      completedDate: '2023-12-20',
      duration: '5 days',
      rating: 5,
      feedback: 'Outstanding quality and attention to detail.',
      earnings: '₹4,500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="card-shadow">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                  <p className="text-muted-foreground">@{userData.username} • ID: {userData.id}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{userData.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Since {userData.joinDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{userData.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Jobs Applied</p>
                  <p className="text-3xl font-bold text-primary">{userData.totalJobs}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Jobs Completed</p>
                  <p className="text-3xl font-bold text-success">{userData.completedJobs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-accent-warm">
                    {Math.round((userData.completedJobs / userData.totalJobs) * 100)}%
                  </p>
                </div>
                <Award className="w-8 h-8 text-accent-warm" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Applied Jobs */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Jobs Applied</CardTitle>
              <CardDescription>Your recent job applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appliedJobs.map((job, index) => (
                <div key={job.id}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Applied {job.appliedDate}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  {index < appliedJobs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Jobs */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Jobs Completed</CardTitle>
              <CardDescription>Your work history and ratings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedJobs.map((job, index) => (
                <div key={job.id}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Completed {job.completedDate}</span>
                          <span>{job.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(job.rating)}
                        </div>
                        <Badge variant="outline" className="text-success">
                          {job.earnings}
                        </Badge>
                      </div>
                    </div>
                    {job.feedback && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm italic">"{job.feedback}"</p>
                      </div>
                    )}
                  </div>
                  {index < completedJobs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Experience Level</h4>
                <Badge variant="secondary" className="mb-4">{userData.experience}</Badge>
                
                <h4 className="font-semibold mb-2">Preferred Job Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {userData.preferredRoles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-muted-foreground">{userData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;