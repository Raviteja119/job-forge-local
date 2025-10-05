import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, DollarSign, Clock, Calendar, Star, CircleCheck as CheckCircle2, Briefcase, Users, TrendingUp } from 'lucide-react';

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    company: string;
    companyRating: number;
    location: string;
    type: string;
    category: string;
    wage: string;
    wageRange: string;
    duration: string;
    postedDate: string;
    urgency: string | null;
    description: string;
    requirements: string[];
    skills: string[];
    benefits: string[];
    employerDetails: {
      name: string;
      type: string;
      established: string;
      employees: string;
    };
  };
  onApply: () => void;
}

const JobDetailsDialog = ({ open, onOpenChange, job, onApply }: JobDetailsDialogProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                {job.urgency && (
                  <Badge variant="destructive" className="text-xs">
                    {job.urgency}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-blue-600">{job.company}</span>
                <div className="flex items-center gap-1 ml-2">
                  {renderStars(job.companyRating)}
                  <span className="text-sm text-slate-600">({job.companyRating})</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{job.wage}</div>
              <div className="text-sm text-slate-500">{job.wageRange}</div>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Complete job details and requirements
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{getDaysAgo(job.postedDate)} days ago</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="text-sm">{job.category}</Badge>
            <Badge variant="outline" className="text-sm">{job.type}</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Job Description
              </h3>
              <p className="text-slate-700 leading-relaxed">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                About the Employer
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-lg">{job.employerDetails.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600">
                  <div>
                    <span className="font-medium">Type:</span> {job.employerDetails.type}
                  </div>
                  <div>
                    <span className="font-medium">Established:</span> {job.employerDetails.established}
                  </div>
                  <div>
                    <span className="font-medium">Employees:</span> {job.employerDetails.employees}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3 justify-end sticky bottom-0 bg-white pt-4 pb-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                onApply();
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Apply for this Job
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
