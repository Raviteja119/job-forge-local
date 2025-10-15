import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Building, MapPin, Clock, DollarSign, Users, 
  FileText, X, Briefcase, Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import postJobBg from '@/assets/post-job-bg.jpg';

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    jobTitle: '',
    category: '',
    description: '',
    skillsRequired: [] as string[],
    location: '',
    city: '',
    state: '',
    jobType: '',
    duration: '',
    startDate: '',
    workingHours: '',
    payType: '',
    payAmount: '',
    payRangeMin: '',
    payRangeMax: '',
    companyName: '',
    companyType: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    requirements: '',
    benefits: [] as string[],
    urgentHiring: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const availableSkills = [
    'Construction Work', 'Electrical Work', 'Plumbing', 'Carpentry', 
    'Painting', 'Cleaning', 'Welding', 'Masonry', 'Tile Work', 
    'Roofing', 'HVAC', 'Landscaping', 'Moving Services', 'Security',
    'Maintenance', 'Heavy Machinery', 'Safety Protocols'
  ];

  const availableBenefits = [
    'Medical Insurance', 'Performance Bonus', 'Training Provided',
    'Overtime Pay', 'Free Meals', 'Transportation', 'Skill Training',
    'Career Growth', 'Health Insurance', 'Material Allowance',
    'Project Bonus', 'Flexible Hours'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.includes(skill)
        ? prev.skillsRequired.filter(s => s !== skill)
        : [...prev.skillsRequired, skill]
    }));
  };

  const handleBenefitToggle = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.skillsRequired.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one required skill",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Save job posting to localStorage for demo purposes
    setTimeout(() => {
      const jobPosting = {
        ...formData,
        id: `job_${Date.now()}`,
        postedDate: new Date().toISOString(),
        status: 'active'
      };
      
      // Get existing jobs or create new array
      const existingJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
      existingJobs.push(jobPosting);
      localStorage.setItem('postedJobs', JSON.stringify(existingJobs));
      
      setIsLoading(false);
      toast({
        title: "Job Posted Successfully!",
        description: `Your job posting for ${formData.jobTitle} is now live and visible to job seekers.`,
      });
      navigate('/jobs');
    }, 2000);
  };

  const isFormValid = 
    formData.jobTitle && 
    formData.category && 
    formData.description && 
    formData.skillsRequired.length > 0 && 
    formData.location && 
    formData.payAmount && 
    formData.companyName &&
    formData.contactEmail;

  return (
    <div 
      className="min-h-screen py-8 px-4 relative animate-fade-in"
      style={{
        backgroundImage: `url(${postJobBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Post a Job</h1>
          <p className="text-white/90 max-w-2xl mx-auto drop-shadow">
            Find the right talent for your project. Post your job requirements and connect with skilled workers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Information */}
          <Card className="card-shadow bg-card/95 backdrop-blur-md border-0 animate-scale-in stagger-delay-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job Information
              </CardTitle>
              <CardDescription>
                Provide details about the job position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="e.g., Electrician Helper"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Carpentry">Carpentry</SelectItem>
                      <SelectItem value="Painting">Painting</SelectItem>
                      <SelectItem value="Cleaning">Cleaning</SelectItem>
                      <SelectItem value="Welding">Welding</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the job role and responsibilities..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              {/* Skills Required */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Skills Required *</Label>
                <p className="text-sm text-muted-foreground">
                  Select the skills needed for this job
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`
                        flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                        ${formData.skillsRequired.includes(skill) 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <Checkbox
                        checked={formData.skillsRequired.includes(skill)}
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                {formData.skillsRequired.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skillsRequired.map((skill) => (
                      <Badge key={skill} variant="default" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillToggle(skill);
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Any specific requirements, experience level, certifications needed..."
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Duration */}
          <Card className="card-shadow bg-card/95 backdrop-blur-md border-0 animate-scale-in stagger-delay-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Work Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Site Address"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleSelectChange('jobType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 3 months, Permanent"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    name="workingHours"
                    placeholder="e.g., 9 AM - 6 PM"
                    value={formData.workingHours}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
          <Card className="card-shadow bg-card/95 backdrop-blur-md border-0 animate-scale-in stagger-delay-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="payType">Pay Structure</Label>
                  <Select value={formData.payType} onValueChange={(value) => handleSelectChange('payType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pay type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Per Day</SelectItem>
                      <SelectItem value="hourly">Per Hour</SelectItem>
                      <SelectItem value="monthly">Per Month</SelectItem>
                      <SelectItem value="project">Per Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payAmount">Pay Amount *</Label>
                  <Input
                    id="payAmount"
                    name="payAmount"
                    placeholder="e.g., 500"
                    value={formData.payAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value="₹ INR" disabled />
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Benefits & Perks</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableBenefits.map((benefit) => (
                    <div
                      key={benefit}
                      onClick={() => handleBenefitToggle(benefit)}
                      className={`
                        flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                        ${formData.benefits.includes(benefit) 
                          ? 'border-success bg-success/10 text-success' 
                          : 'border-border hover:border-success/50'
                        }
                      `}
                    >
                      <Checkbox
                        checked={formData.benefits.includes(benefit)}
                      />
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="card-shadow bg-card/95 backdrop-blur-md border-0 animate-scale-in stagger-delay-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyType">Company Type</Label>
                  <Select value={formData.companyType} onValueChange={(value) => handleSelectChange('companyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Construction Company">Construction Company</SelectItem>
                      <SelectItem value="Electrical Contractor">Electrical Contractor</SelectItem>
                      <SelectItem value="Home Services">Home Services</SelectItem>
                      <SelectItem value="Facility Management">Facility Management</SelectItem>
                      <SelectItem value="Individual Contractor">Individual Contractor</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    placeholder="Enter phone number"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgentHiring"
                  checked={formData.urgentHiring}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, urgentHiring: checked as boolean }))
                  }
                />
                <Label htmlFor="urgentHiring" className="text-sm">
                  Mark as urgent hiring (will be highlighted to job seekers)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isLoading}
              className="min-w-48"
            >
              {isLoading ? 'Posting Job...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;