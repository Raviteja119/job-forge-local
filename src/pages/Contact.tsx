import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Twitter, 
  MessageCircle, HelpCircle, Send, Code, Palette, 
  Database, Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const developers = [
    {
      id: 1,
      name: 'Arjun Sharma',
      role: 'Lead Full-Stack Developer',
      contribution: 'Backend API, Database Design, Authentication',
      image: '', // Can add actual image URL
      email: 'arjun.sharma@jobconnect.com',
      github: 'https://github.com/arjunsharma',
      linkedin: 'https://linkedin.com/in/arjunsharma',
      skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Frontend Developer & UI/UX Designer',
      contribution: 'User Interface, User Experience, Responsive Design',
      image: '', // Can add actual image URL
      email: 'priya.patel@jobconnect.com',
      github: 'https://github.com/priyapatel',
      linkedin: 'https://linkedin.com/in/priyapatel',
      skills: ['UI/UX Design', 'React', 'Tailwind CSS', 'Figma'],
    },
    {
      id: 3,
      name: 'Raj Kumar',
      role: 'Backend Developer',
      contribution: 'API Development, Database Optimization, Job Matching Algorithm',
      image: '', // Can add actual image URL
      email: 'raj.kumar@jobconnect.com',
      github: 'https://github.com/rajkumar',
      linkedin: 'https://linkedin.com/in/rajkumar',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Quality Assurance & Testing',
      contribution: 'Testing, Bug Fixes, Performance Optimization, User Acceptance Testing',
      image: '', // Can add actual image URL
      email: 'sneha.reddy@jobconnect.com',
      github: 'https://github.com/snehareddy',
      linkedin: 'https://linkedin.com/in/snehareddy',
      skills: ['Manual Testing', 'Automation', 'Selenium', 'Performance Testing'],
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account on JobConnect?',
      answer: 'Click on the "Register" button in the top navigation, fill in your basic information, and then complete your worker profile with your skills and experience. It\'s free and takes just a few minutes!',
    },
    {
      question: 'Is JobConnect free to use for workers?',
      answer: 'Yes! JobConnect is completely free for workers. You can create a profile, search for jobs, and apply to as many positions as you like without any charges.',
    },
    {
      question: 'How do I apply for jobs?',
      answer: 'Browse the "Available Jobs" section, use filters to find relevant positions, and click "Apply Now" on any job that matches your skills. Make sure your profile is complete for better chances.',
    },
    {
      question: 'What types of jobs are available?',
      answer: 'We focus on semi-skilled jobs including construction work, electrical services, plumbing, carpentry, painting, cleaning, maintenance, security, and many more local service jobs.',
    },
    {
      question: 'How do employers contact me?',
      answer: 'Once you apply for a job, employers can view your profile and contact you directly through the phone number and email you provided during registration.',
    },
    {
      question: 'Can I edit my profile after creating it?',
      answer: 'Yes! You can edit your profile anytime by going to the "Profile" section. Keep your skills and experience updated to attract more employers.',
    },
    {
      question: 'How do I post a job as an employer?',
      answer: 'Go to the "Post a Job" section, fill in all the job details including title, description, skills required, location, and compensation. Your job will be visible to workers immediately after posting.',
    },
    {
      question: 'What should I do if I face technical issues?',
      answer: 'If you encounter any technical problems, please use the contact form below to reach out to our support team. We typically respond within 24 hours.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  const getRoleIcon = (role: string) => {
    if (role.includes('Full-Stack') || role.includes('Backend')) return <Code className="w-5 h-5" />;
    if (role.includes('Frontend') || role.includes('UI/UX')) return <Palette className="w-5 h-5" />;
    if (role.includes('Database')) return <Database className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team or find answers to your questions. We're here to help you succeed!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Have a question or need help? Fill out the form below and we'll respond quickly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your question or issue in detail..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isFormValid || isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Reach out to us directly through these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@jobconnect.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 1800-123-456</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Tech Hub, Sector 62<br />
                      Noida, UP 201309
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Development Team */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Meet Our Development Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented individuals who built JobConnect to help connect workers with opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {developers.map((developer) => (
              <Card key={developer.id} className="card-shadow hover:hover-shadow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={developer.image} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {developer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{developer.name}</h3>
                        <div className="flex items-center gap-2 text-primary">
                          {getRoleIcon(developer.role)}
                          <span className="font-medium">{developer.role}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {developer.contribution}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {developer.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <a
                          href={`mailto:${developer.email}`}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        <a
                          href={developer.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                        <a
                          href={developer.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about using JobConnect
            </p>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </CardTitle>
              <CardDescription>
                Get answers to common questions about JobConnect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;