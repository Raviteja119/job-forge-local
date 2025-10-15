import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import profileBg from '@/assets/profile-bg.jpg';

const EmployerDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    industry: '',
    companySize: '',
    established: '',
    website: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPerson: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.companyType || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Save company profile using updateUserProfile
    setTimeout(() => {
      const fullAddress = `${formData.address}, ${formData.city}${formData.state ? ', ' + formData.state : ''}${formData.pincode ? ' - ' + formData.pincode : ''}`;
      
      updateUserProfile({
        companyName: formData.companyName,
        companyType: formData.companyType,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website,
        companyDescription: formData.description,
        address: fullAddress,
        mobile: formData.phone,
      });
      
      setIsLoading(false);
      toast({
        title: "Company Profile Completed!",
        description: "Your employer profile has been saved successfully",
      });
      navigate('/employer-dashboard');
    }, 1500);
  };

  const isFormValid = 
    formData.companyName && 
    formData.companyType && 
    formData.phone && 
    formData.city;

  return (
    <div 
      className="min-h-screen py-12 px-4 relative animate-fade-in"
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-accent-warm/20 backdrop-blur-sm"></div>
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <div className="text-center animate-slide-up">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">Company Profile</h2>
          <p className="mt-2 text-white/90 drop-shadow">
            Complete your company profile to start posting jobs
          </p>
        </div>

        <Card className="card-shadow bg-card/95 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Information
            </CardTitle>
            <CardDescription>
              Provide details about your company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Basic Info */}
              <div className="space-y-4">
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyType">Company Type *</Label>
                    <Select value={formData.companyType} onValueChange={(value) => setFormData(prev => ({ ...prev, companyType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Construction Company">Construction Company</SelectItem>
                        <SelectItem value="Electrical Contractor">Electrical Contractor</SelectItem>
                        <SelectItem value="Plumbing Services">Plumbing Services</SelectItem>
                        <SelectItem value="Home Services">Home Services</SelectItem>
                        <SelectItem value="Facility Management">Facility Management</SelectItem>
                        <SelectItem value="Contractor">General Contractor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      name="industry"
                      placeholder="e.g., Construction"
                      value={formData.industry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="10-50">10-50 employees</SelectItem>
                        <SelectItem value="50-100">50-100 employees</SelectItem>
                        <SelectItem value="100-500">100-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="established">Established Year</Label>
                    <Input
                      id="established"
                      name="established"
                      type="number"
                      placeholder="e.g., 2015"
                      value={formData.established}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://www.example.com"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of your company and services..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Office Address
                </Label>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter office address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
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

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Information
                </Label>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person Name</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Full name"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
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

export default EmployerDetails;
