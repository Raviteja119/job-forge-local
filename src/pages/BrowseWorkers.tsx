import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Search, MapPin, Star, Award, Clock, Briefcase,
  CheckCircle2, MessageSquare, Phone, Mail, TrendingUp
} from 'lucide-react';
import { sampleWorkers, WorkerProfile } from '@/data/sampleWorkers';
import { useToast } from '@/hooks/use-toast';

const BrowseWorkers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  const filteredWorkers = sampleWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !locationFilter || worker.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || worker.category === categoryFilter;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleContactWorker = (worker: WorkerProfile) => {
    toast({
      title: "Contact Request Sent",
      description: `Your contact request has been sent to ${worker.name}`,
    });
  };

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

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Browse Skilled Workers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find qualified professionals for your projects
          </p>
        </div>

        <Card className="card-shadow animate-fade-in hover-glow border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, title, or skill..."
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

              <p className="text-sm text-muted-foreground">
                Showing {filteredWorkers.length} of {sampleWorkers.length} workers
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="card-shadow hover-lift animate-fade-in border-0 hover-glow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-600 text-white text-lg font-bold">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{worker.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{worker.title}</p>
                    <Badge variant="secondary">{worker.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {renderStars(worker.rating)}
                    <span className="ml-1 font-semibold">{worker.rating}</span>
                    <span className="text-muted-foreground">({worker.reviewCount})</span>
                  </div>
                  {worker.verified && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{worker.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-green-600 font-semibold">{worker.availability}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-semibold mb-2">Top Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {worker.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{worker.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-lg font-bold text-blue-600">
                  {worker.hourlyRate}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedWorker(worker)}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    View Profile
                  </Button>
                  <Button
                    onClick={() => handleContactWorker(worker)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <Card className="card-shadow animate-fade-in border-0">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No workers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find more workers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedWorker && (
        <Dialog open={!!selectedWorker} onOpenChange={(open) => !open && setSelectedWorker(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                    {selectedWorker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-2">{selectedWorker.name}</DialogTitle>
                  <p className="text-lg text-muted-foreground mb-2">{selectedWorker.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedWorker.rating)}
                      <span className="ml-1 font-semibold">{selectedWorker.rating}</span>
                      <span className="text-sm text-muted-foreground">({selectedWorker.reviewCount} reviews)</span>
                    </div>
                    {selectedWorker.verified && (
                      <Badge className="bg-green-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{selectedWorker.hourlyRate}</div>
                  <Badge variant="secondary" className="mt-1">{selectedWorker.category}</Badge>
                </div>
              </div>
              <DialogDescription className="sr-only">
                Complete worker profile and details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-green-600 font-semibold">{selectedWorker.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.completionRate} completion</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-lg mb-2">About</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedWorker.bio}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-lg mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {selectedWorker.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-lg mb-3">Work History</h3>
                <div className="space-y-3">
                  {selectedWorker.workHistory.map((work, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg">
                      <p className="font-semibold">{work.role}</p>
                      <p className="text-sm text-muted-foreground">{work.company}</p>
                      <p className="text-xs text-muted-foreground">{work.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-lg mb-3">Recent Projects</h3>
                <div className="space-y-3">
                  {selectedWorker.projects.map((project, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <p className="font-semibold">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{project.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex gap-3 justify-end sticky bottom-0 bg-white pt-4 pb-2">
                <Button variant="outline" onClick={() => setSelectedWorker(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleContactWorker(selectedWorker);
                    setSelectedWorker(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Worker
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BrowseWorkers;
