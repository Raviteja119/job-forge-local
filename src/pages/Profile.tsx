import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  User, Phone, Mail, MapPin, Briefcase, Star, Clock,
  CheckCircle, Edit, Award, TrendingUp, Camera, Save, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: userProfile?.username || '',
    mobile: userProfile?.mobile || '',
    address: userProfile?.address || '',
    experience: userProfile?.experience || '',
    description: userProfile?.description || '',
    preferredJobRoles: userProfile?.preferredJobRoles || []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableJobRoles = [
    'Construction Worker', 'Electrician', 'Plumber', 'Carpenter',
    'Painter', 'Welder', 'Mason', 'HVAC Technician',
    'Maintenance Worker', 'Security Guard', 'Driver', 'Helper'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ profilePhotoUrl: reader.result as string });
        toast({
          title: "Profile photo updated",
          description: "Your profile photo has been updated successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleToggle = (role: string) => {
    setEditFormData(prev => ({
      ...prev,
      preferredJobRoles: prev.preferredJobRoles.includes(role)
        ? prev.preferredJobRoles.filter(r => r !== role)
        : [...prev.preferredJobRoles, role]
    }));
  };

  const handleSaveProfile = () => {
    updateUserProfile(editFormData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully"
    });
  };

  const userData = {
    id: user?.id || 'U001',
    username: userProfile?.username || user?.email?.split('@')[0] || 'User',
    name: userProfile?.username || user?.email?.split('@')[0] || 'User',
    mobile: userProfile?.mobile || '+91 XXXXXXXXXX',
    email: user?.email || '',
    avatar: userProfile?.profilePhotoUrl || '',
    location: userProfile?.address || 'Location not set',
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently',
    rating: 4.7,
    totalJobs: 15,
    completedJobs: 12,
    skills: ['Construction Work', 'Electrical Work', 'Plumbing', 'Carpentry'],
    preferredRoles: userProfile?.preferredJobRoles || [],
    experience: userProfile?.experience || 'Not specified',
    description: userProfile?.description || 'No description provided yet.',
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
        <Card className="card-shadow hover-glow border-0 animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
              
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
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your profile information and preferences
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={editFormData.username}
                            onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            id="mobile"
                            value={editFormData.mobile}
                            onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={editFormData.address}
                          onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select
                          value={editFormData.experience}
                          onValueChange={(value) => setEditFormData({ ...editFormData, experience: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1 years">0-1 years</SelectItem>
                            <SelectItem value="1-3 years">1-3 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5-10 years">5-10 years</SelectItem>
                            <SelectItem value="10+ years">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">About / Description</Label>
                        <Textarea
                          id="description"
                          value={editFormData.description}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Preferred Job Roles</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {availableJobRoles.map((role) => (
                            <div
                              key={role}
                              onClick={() => handleRoleToggle(role)}
                              className={`
                                flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                                ${editFormData.preferredJobRoles.includes(role)
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50'
                                }
                              `}
                            >
                              <Checkbox checked={editFormData.preferredJobRoles.includes(role)} />
                              <span className="text-sm font-medium">{role}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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