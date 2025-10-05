import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, DollarSign, Clock, CircleCheck as CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    wage: string;
    type: string;
    duration: string;
    category: string;
  };
}

const JobApplicationDialog = ({ open, onOpenChange, job }: JobApplicationDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted Successfully!",
      description: `Your application for ${job.title} at ${job.company} has been submitted.`,
    });
    onOpenChange(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      coverLetter: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Position</DialogTitle>
          <DialogDescription>
            Submit your application and we'll get back to you soon
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-green-600">{job.wage}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{job.duration}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge>{job.type}</Badge>
              <Badge variant="secondary">{job.category}</Badge>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter / Why are you interested? *</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleChange('coverLetter', e.target.value)}
                placeholder="Tell us why you're a great fit for this position..."
                rows={5}
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Application Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Highlight relevant experience and skills</li>
                  <li>Be specific about your qualifications</li>
                  <li>Proofread before submitting</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationDialog;
