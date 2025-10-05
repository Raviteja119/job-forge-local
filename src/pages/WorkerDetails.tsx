import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Award, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import workerDetailsBg from '@/assets/worker-details-bg.jpg';

const WorkerDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    skills: [] as string[],
    preferredRoles: [] as string[],
    experience: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const availableSkills = [
    'Electrical Installation', 'Circuit Design', 'Safety Protocols',
    'Carpentry', 'Custom Cabinetry', 'Furniture Making', 'Joinery',
    'Interior Painting', 'Exterior Painting', 'Color Mixing', 'Spray Painting',
    'Plumbing Installation', 'Pipe Fitting', 'Drain Cleaning', 'Water Heater Service',
    'MIG Welding', 'TIG Welding', 'Stick Welding', 'Metal Fabrication',
    'Brick Laying', 'Stone Work', 'Mortar Application', 'Restoration Work',
    'HVAC Installation', 'System Diagnostics', 'Refrigerant Handling',
    'Landscape Design', 'Plant Selection', 'Irrigation Systems', 'Hardscaping',
    'Roofing', 'TPO Installation', 'Leak Detection',
    'Commercial Driving', 'Load Securement', 'DOT Compliance'
  ];

  const jobRoles = [
    'Electrician', 'Master Electrician', 'Electrical Helper',
    'Carpenter', 'Master Carpenter', 'Finish Carpenter', 'Cabinet Maker',
    'Painter', 'Commercial Painter', 'Residential Painter',
    'Plumber', 'Master Plumber', 'Plumber Assistant',
    'Welder', 'Certified Welder', 'Fabricator',
    'Mason', 'Brick Mason', 'Stone Mason',
    'HVAC Technician', 'HVAC Installer', 'HVAC Service Technician',
    'Landscaper', 'Landscape Designer', 'Groundskeeper',
    'Roofer', 'Commercial Roofer', 'Residential Roofer',
    'CDL Driver', 'Truck Driver', 'Delivery Driver'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      preferredRoles: prev.preferredRoles.includes(role)
        ? prev.preferredRoles.filter(r => r !== role)
        : [...prev.preferredRoles, role]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.skills.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one skill",
        variant: "destructive",
      });
      return;
    }

    if (formData.preferredRoles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one preferred job role",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to save worker details
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Completed!",
        description: "Your worker profile has been saved successfully",
      });
      // Navigate to profile page
      navigate('/profile');
    }, 1500);
  };

  const isFormValid = 
    formData.skills.length > 0 && 
    formData.preferredRoles.length > 0 && 
    formData.experience && 
    formData.address && 
    formData.city;

  return (
    <div 
      className="min-h-screen py-12 px-4 relative animate-fade-in"
      style={{
        backgroundImage: `url(${workerDetailsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-muted/40 backdrop-blur-sm"></div>
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <div className="text-center animate-slide-up">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">Complete Your Profile</h2>
          <p className="mt-2 text-white/90 drop-shadow">
            Tell us about your skills and experience to get better job matches
          </p>
        </div>

        <Card className="card-shadow bg-card/95 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Worker Details
            </CardTitle>
            <CardDescription>
              Fill in your professional information to attract employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skills Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Skills *</Label>
                <p className="text-sm text-muted-foreground">
                  Select all skills that you possess
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`
                        flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                        ${formData.skills.includes(skill) 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <Checkbox
                        checked={formData.skills.includes(skill)}
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
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

              {/* Preferred Job Roles */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Preferred Job Roles *</Label>
                <p className="text-sm text-muted-foreground">
                  Select the types of jobs you're interested in
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobRoles.map((role) => (
                    <div
                      key={role}
                      onClick={() => handleRoleToggle(role)}
                      className={`
                        flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                        ${formData.preferredRoles.includes(role) 
                          ? 'border-success bg-success/10 text-success' 
                          : 'border-border hover:border-success/50'
                        }
                      `}
                    >
                      <Checkbox
                        checked={formData.preferredRoles.includes(role)}
                      />
                      <span className="text-sm font-medium">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address Information
                </Label>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
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
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell employers more about yourself, your work style, availability, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? 'Saving Profile...' : 'Complete Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDetails;