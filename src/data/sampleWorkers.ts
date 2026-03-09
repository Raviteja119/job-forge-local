export interface WorkerProfile {
  id: number;
  name: string;
  title: string;
  category: string;
  location: string;
  experience: string;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  availability: string;
  bio: string;
  skills: string[];
  certifications: string[];
  languages: string[];
  education: string;
  workHistory: { company: string; role: string; duration: string; }[];
  projects: { name: string; description: string; year: string; }[];
  verified: boolean;
  responseTime: string;
  completionRate: string;
}

export const sampleWorkers: WorkerProfile[] = [
  {
    id: 1, name: 'Ravi Sharma', title: 'Licensed Master Electrician', category: 'Electrical',
    location: 'Mumbai, MH', experience: '12 years', rating: 4.9, reviewCount: 127,
    hourlyRate: '₹500-700/hr', availability: 'Available Now',
    bio: 'Highly experienced master electrician specializing in residential and commercial electrical systems. Committed to safety, quality workmanship, and customer satisfaction.',
    skills: ['Electrical Installation', 'Troubleshooting', 'Circuit Design', 'Panel Upgrades', 'Smart Home Systems', 'Emergency Repairs', 'Code Compliance', 'Blueprint Reading'],
    certifications: ['Master Electrician License', 'OSHA Safety Certified', 'NEC Code Certified', 'Low Voltage Systems Certified'],
    languages: ['Hindi', 'English', 'Marathi'], education: 'ITI Certification - Electrical Technology',
    workHistory: [{ company: 'PowerTech Solutions', role: 'Lead Electrician', duration: '2018 - Present' }, { company: 'Metro Electric Corp', role: 'Journeyman Electrician', duration: '2013 - 2018' }],
    projects: [{ name: 'Office Building Renovation', description: 'Complete electrical system upgrade for commercial building', year: '2024' }, { name: 'Residential Complex', description: 'New construction electrical installation for 200-unit complex', year: '2023' }],
    verified: true, responseTime: '2 hours', completionRate: '98%'
  },
  {
    id: 2, name: 'Deepak Patel', title: 'Master Carpenter & Cabinet Maker', category: 'Carpentry',
    location: 'Ahmedabad, GJ', experience: '15 years', rating: 5.0, reviewCount: 93,
    hourlyRate: '₹600-800/hr', availability: 'Available in 2 weeks',
    bio: 'Award-winning master carpenter specializing in custom cabinetry and fine woodworking. I bring creativity and precision to every project.',
    skills: ['Custom Cabinetry', 'Fine Woodworking', 'Furniture Making', 'Joinery', 'Wood Finishing', 'Design Consultation', 'Restoration Work', 'CNC Operation'],
    certifications: ['Master Carpenter Certification', 'AWI Quality Standards Certified', 'OSHA Safety Certified'],
    languages: ['Hindi', 'Gujarati', 'English'], education: 'Diploma in Woodworking & Furniture Design',
    workHistory: [{ company: 'Patel Custom Woodworks', role: 'Owner & Master Carpenter', duration: '2015 - Present' }, { company: 'Artisan Cabinetry', role: 'Senior Carpenter', duration: '2010 - 2015' }],
    projects: [{ name: 'Heritage Home Restoration', description: 'Custom millwork and cabinetry for historic home', year: '2024' }, { name: 'Modern Kitchen Remodel', description: 'Contemporary custom kitchen with smart storage', year: '2024' }],
    verified: true, responseTime: '1 hour', completionRate: '100%'
  },
  {
    id: 3, name: 'Priya Menon', title: 'Professional Painter & Color Specialist', category: 'Painting',
    location: 'Bangalore, KA', experience: '8 years', rating: 4.8, reviewCount: 156,
    hourlyRate: '₹350-500/hr', availability: 'Available Now',
    bio: 'Detail-oriented professional painter with expertise in both residential and commercial projects. I specialize in color consultation and decorative finishes.',
    skills: ['Interior Painting', 'Exterior Painting', 'Color Consultation', 'Faux Finishing', 'Cabinet Refinishing', 'Wallpaper Installation', 'Drywall Repair', 'Spray Painting'],
    certifications: ['Professional Painting Certification', 'Lead-Safe Certified', 'Color Expert Certified'],
    languages: ['Hindi', 'Kannada', 'English'], education: 'Diploma in Interior Design',
    workHistory: [{ company: 'Menon Painting Services', role: 'Owner & Lead Painter', duration: '2019 - Present' }, { company: 'ProPaint Solutions', role: 'Senior Painter', duration: '2017 - 2019' }],
    projects: [{ name: 'Corporate Office Complex', description: 'Interior painting for 30,000 sq ft commercial space', year: '2024' }, { name: 'Historic Home Exterior', description: 'Restoration painting of heritage bungalow', year: '2023' }],
    verified: true, responseTime: '3 hours', completionRate: '97%'
  },
  {
    id: 4, name: 'Suresh Kumar', title: 'Licensed Master Plumber', category: 'Plumbing',
    location: 'Delhi, DL', experience: '14 years', rating: 4.9, reviewCount: 201,
    hourlyRate: '₹550-750/hr', availability: 'Available in 1 week',
    bio: 'Master plumber with comprehensive experience in residential and commercial plumbing systems. Reliable, high-quality service with focus on long-term solutions.',
    skills: ['Plumbing Installation', 'Pipe Repair & Replacement', 'Water Heater Service', 'Drain Cleaning', 'Gas Line Work', 'Sewer Line Service', 'Fixture Installation', 'Leak Detection'],
    certifications: ['Master Plumber License', 'Gas Fitting Certified', 'Backflow Prevention Certified', 'OSHA Safety Certified'],
    languages: ['Hindi', 'English', 'Punjabi'], education: 'ITI Plumbing Technology Certificate',
    workHistory: [{ company: 'Kumar Plumbing Solutions', role: 'Owner & Master Plumber', duration: '2017 - Present' }, { company: 'City Plumbing Services', role: 'Lead Plumber', duration: '2011 - 2017' }],
    projects: [{ name: 'Residential Tower', description: 'Complete plumbing system for 20-story apartment building', year: '2024' }, { name: 'Restaurant Plumbing Overhaul', description: 'Full commercial kitchen plumbing renovation', year: '2023' }],
    verified: true, responseTime: '1 hour', completionRate: '99%'
  },
  {
    id: 5, name: 'Arjun Singh', title: 'Certified Welder & Fabricator', category: 'Welding',
    location: 'Jamshedpur, JH', experience: '10 years', rating: 4.7, reviewCount: 87,
    hourlyRate: '₹450-650/hr', availability: 'Available Now',
    bio: 'Certified welder with expertise in structural, pipe, and ornamental welding. Strong, clean welds that meet or exceed specifications.',
    skills: ['MIG Welding', 'TIG Welding', 'Stick Welding', 'Pipe Welding', 'Structural Welding', 'Metal Fabrication', 'Blueprint Reading', 'Welding Inspection'],
    certifications: ['AWS Certified Welder', 'Pipe Welding Certification', 'Structural Welding Certification', 'Safety Training Certified'],
    languages: ['Hindi', 'English'], education: 'Welding Technology Diploma',
    workHistory: [{ company: 'Industrial Fabrication Inc.', role: 'Lead Welder', duration: '2019 - Present' }, { company: 'Steel Works Manufacturing', role: 'Journeyman Welder', duration: '2015 - 2019' }],
    projects: [{ name: 'Industrial Plant Expansion', description: 'Structural steel welding for industrial facility', year: '2024' }, { name: 'Custom Metal Gates', description: 'Ornamental welding for luxury residential entrance', year: '2023' }],
    verified: true, responseTime: '4 hours', completionRate: '96%'
  },
  {
    id: 6, name: 'Mohan Reddy', title: 'Master Mason & Stone Worker', category: 'Masonry',
    location: 'Hyderabad, TG', experience: '18 years', rating: 5.0, reviewCount: 64,
    hourlyRate: '₹500-700/hr', availability: 'Available in 3 weeks',
    bio: 'Master mason specializing in historic restoration and custom stonework. Combines traditional techniques with modern methods.',
    skills: ['Brick Laying', 'Stone Masonry', 'Historic Restoration', 'Chimney Construction', 'Tuckpointing', 'Concrete Work', 'Pattern Work', 'Architectural Details'],
    certifications: ['Master Mason Certification', 'Historic Preservation Specialist', 'OSHA Construction Safety'],
    languages: ['Hindi', 'Telugu', 'English'], education: 'Masonry & Stone Working Apprenticeship',
    workHistory: [{ company: 'Reddy Masonry', role: 'Master Mason & Owner', duration: '2010 - Present' }, { company: 'Heritage Building Restoration', role: 'Senior Mason', duration: '2007 - 2010' }],
    projects: [{ name: 'Historic Temple Restoration', description: 'Restoration of 200-year-old stone temple', year: '2024' }, { name: 'Custom Outdoor Kitchen', description: 'Stone and brick outdoor living space', year: '2023' }],
    verified: true, responseTime: '2 hours', completionRate: '100%'
  },
  {
    id: 7, name: 'Vikram Joshi', title: 'HVAC Master Technician', category: 'HVAC',
    location: 'Pune, MH', experience: '11 years', rating: 4.8, reviewCount: 143,
    hourlyRate: '₹450-650/hr', availability: 'Available Now',
    bio: 'Certified HVAC technician with expertise in installation, repair, and maintenance of all types of heating and cooling systems.',
    skills: ['HVAC Installation', 'System Diagnostics', 'Refrigerant Management', 'Ductwork Design', 'Heat Pump Service', 'Air Quality Systems', 'Preventive Maintenance', 'Energy Efficiency'],
    certifications: ['EPA Certification', 'HVAC Excellence Certified', 'Energy Star Partner', 'Commercial HVAC Certified'],
    languages: ['Hindi', 'Marathi', 'English'], education: 'HVAC Technology Certificate',
    workHistory: [{ company: 'Joshi Climate Solutions', role: 'Owner & Master Technician', duration: '2018 - Present' }, { company: 'Desert Air Systems', role: 'Senior HVAC Technician', duration: '2014 - 2018' }],
    projects: [{ name: 'Medical Office HVAC System', description: 'Complete HVAC installation for medical facility', year: '2024' }, { name: 'Smart Home Climate Control', description: 'High-efficiency system with smart controls', year: '2023' }],
    verified: true, responseTime: '2 hours', completionRate: '98%'
  },
  {
    id: 8, name: 'Lakshmi Nair', title: 'Landscape Designer & Crew Leader', category: 'Landscaping',
    location: 'Kochi, KL', experience: '9 years', rating: 4.9, reviewCount: 112,
    hourlyRate: '₹400-550/hr', availability: 'Available Now',
    bio: 'Creative landscape designer with passion for sustainable and native plant landscaping. Specializes in outdoor spaces that are beautiful and eco-friendly.',
    skills: ['Landscape Design', 'Plant Selection', 'Irrigation Systems', 'Hardscaping', 'Sustainable Landscaping', 'Native Plants', 'Landscape Lighting', 'Water Features'],
    certifications: ['Certified Landscape Designer', 'Irrigation Certified', 'Native Plant Specialist', 'Sustainable Landscaping Certified'],
    languages: ['Hindi', 'Malayalam', 'English'], education: 'BSc Landscape Architecture',
    workHistory: [{ company: 'Nair Landscape Design', role: 'Owner & Lead Designer', duration: '2019 - Present' }, { company: 'Green Earth Landscapes', role: 'Designer & Project Manager', duration: '2016 - 2019' }],
    projects: [{ name: 'Corporate Campus Garden', description: 'Native plant landscape for tech company campus', year: '2024' }, { name: 'Residential Rain Garden', description: 'Water-wise garden with rainwater management', year: '2023' }],
    verified: true, responseTime: '3 hours', completionRate: '99%'
  },
  {
    id: 9, name: 'Anil Gupta', title: 'Commercial Roofer & Inspector', category: 'Roofing',
    location: 'Chennai, TN', experience: '13 years', rating: 4.7, reviewCount: 98,
    hourlyRate: '₹500-700/hr', availability: 'Available in 1 week',
    bio: 'Experienced commercial roofer specializing in flat and sloped roofing systems. Expert in leak detection and repair.',
    skills: ['Commercial Roofing', 'Leak Detection', 'Roof Inspection', 'Waterproofing', 'Safety Procedures', 'TPO Installation'],
    certifications: ['Certified Roofing Professional', 'OSHA Safety Training', 'Roof Inspection Certified'],
    languages: ['Hindi', 'Tamil', 'English'], education: 'Diploma in Construction Technology',
    workHistory: [{ company: 'Gupta Roofing Co', role: 'Lead Roofer', duration: '2016 - Present' }, { company: 'Summit Roofing', role: 'Roofer', duration: '2012 - 2016' }],
    projects: [{ name: 'Shopping Mall Roof Replacement', description: 'Complete roof replacement for 50,000 sq ft mall', year: '2024' }, { name: 'Factory Waterproofing', description: 'Industrial roofing and waterproofing project', year: '2023' }],
    verified: true, responseTime: '2 hours', completionRate: '97%'
  },
  {
    id: 10, name: 'Rajesh Yadav', title: 'Professional CDL Driver', category: 'Transportation',
    location: 'Lucknow, UP', experience: '8 years', rating: 4.6, reviewCount: 76,
    hourlyRate: '₹300-450/hr', availability: 'Available Now',
    bio: 'Reliable professional driver with clean driving record. Experienced in transporting construction materials and heavy equipment.',
    skills: ['Commercial Driving', 'Load Securement', 'Route Planning', 'Safety Protocols', 'Time Management', 'Vehicle Maintenance'],
    certifications: ['Heavy Vehicle License', 'Hazardous Materials Certified', 'Defensive Driving Certified'],
    languages: ['Hindi', 'English'], education: 'Commercial Driving School Certificate',
    workHistory: [{ company: 'Metro Logistics', role: 'Senior Driver', duration: '2019 - Present' }, { company: 'Express Transport', role: 'Driver', duration: '2017 - 2019' }],
    projects: [{ name: 'Construction Site Supply Chain', description: 'Daily material transport for large construction project', year: '2024' }, { name: 'Interstate Equipment Transport', description: 'Heavy equipment relocation across states', year: '2023' }],
    verified: true, responseTime: '1 hour', completionRate: '99%'
  },
];
