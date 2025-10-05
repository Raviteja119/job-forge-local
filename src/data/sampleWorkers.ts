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
  workHistory: {
    company: string;
    role: string;
    duration: string;
  }[];
  projects: {
    name: string;
    description: string;
    year: string;
  }[];
  verified: boolean;
  responseTime: string;
  completionRate: string;
}

export const sampleWorkers: WorkerProfile[] = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    title: 'Licensed Master Electrician',
    category: 'Electrical',
    location: 'New York, NY',
    experience: '12 years',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: '$55-75/hr',
    availability: 'Available Now',
    bio: 'Highly experienced master electrician specializing in residential and commercial electrical systems. Committed to safety, quality workmanship, and customer satisfaction. Licensed in NY and NJ with extensive experience in new construction, renovations, and troubleshooting.',
    skills: [
      'Electrical Installation',
      'Troubleshooting',
      'Circuit Design',
      'Panel Upgrades',
      'Smart Home Systems',
      'Emergency Repairs',
      'Code Compliance',
      'Blueprint Reading'
    ],
    certifications: [
      'Master Electrician License - NY',
      'Master Electrician License - NJ',
      'OSHA 30-Hour Construction',
      'NEC Code Certified',
      'Low Voltage Systems Certified'
    ],
    languages: ['English', 'Spanish'],
    education: 'Trade School Certification - Electrical Technology',
    workHistory: [
      {
        company: 'PowerTech Solutions',
        role: 'Lead Electrician',
        duration: '2018 - Present'
      },
      {
        company: 'Metro Electric Corp',
        role: 'Journeyman Electrician',
        duration: '2013 - 2018'
      }
    ],
    projects: [
      {
        name: 'Manhattan Office Building Renovation',
        description: 'Complete electrical system upgrade for 15-story commercial building',
        year: '2024'
      },
      {
        name: 'Luxury Apartment Complex',
        description: 'New construction electrical installation for 200-unit complex',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '2 hours',
    completionRate: '98%'
  },
  {
    id: 2,
    name: 'David Chen',
    title: 'Master Carpenter & Cabinet Maker',
    category: 'Carpentry',
    location: 'San Francisco, CA',
    experience: '15 years',
    rating: 5.0,
    reviewCount: 93,
    hourlyRate: '$65-85/hr',
    availability: 'Available in 2 weeks',
    bio: 'Award-winning master carpenter specializing in custom cabinetry and fine woodworking. I bring creativity and precision to every project, from concept to completion. My work has been featured in several home design magazines.',
    skills: [
      'Custom Cabinetry',
      'Fine Woodworking',
      'Furniture Making',
      'Joinery',
      'Wood Finishing',
      'Design Consultation',
      'Restoration Work',
      'CNC Operation'
    ],
    certifications: [
      'Master Carpenter Certification',
      'AWI Quality Standards Certified',
      'OSHA Safety Certified',
      'Sustainable Forestry Certified'
    ],
    languages: ['English', 'Mandarin'],
    education: 'Bachelor of Fine Arts - Woodworking & Furniture Design',
    workHistory: [
      {
        company: 'Chen Custom Woodworks (Own Business)',
        role: 'Owner & Master Carpenter',
        duration: '2015 - Present'
      },
      {
        company: 'Artisan Cabinetry Co.',
        role: 'Senior Carpenter',
        duration: '2010 - 2015'
      }
    ],
    projects: [
      {
        name: 'Victorian Home Restoration',
        description: 'Custom millwork and cabinetry for historic home restoration',
        year: '2024'
      },
      {
        name: 'Modern Kitchen Remodel',
        description: 'Contemporary custom kitchen with integrated smart storage',
        year: '2024'
      }
    ],
    verified: true,
    responseTime: '1 hour',
    completionRate: '100%'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    title: 'Professional Painter & Color Specialist',
    category: 'Painting',
    location: 'Austin, TX',
    experience: '8 years',
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: '$40-55/hr',
    availability: 'Available Now',
    bio: 'Detail-oriented professional painter with expertise in both residential and commercial projects. I specialize in color consultation and decorative finishes. My goal is to transform spaces with quality craftsmanship and attention to detail.',
    skills: [
      'Interior Painting',
      'Exterior Painting',
      'Color Consultation',
      'Faux Finishing',
      'Cabinet Refinishing',
      'Wallpaper Installation',
      'Drywall Repair',
      'Spray Painting'
    ],
    certifications: [
      'Professional Painting Certification',
      'Lead-Safe Certified',
      'Sherwin-Williams Color Expert',
      'Benjamin Moore Certified'
    ],
    languages: ['English'],
    education: 'Associate Degree - Interior Design',
    workHistory: [
      {
        company: 'Johnson Painting Services (Own Business)',
        role: 'Owner & Lead Painter',
        duration: '2019 - Present'
      },
      {
        company: 'ProPaint Solutions',
        role: 'Senior Painter',
        duration: '2017 - 2019'
      }
    ],
    projects: [
      {
        name: 'Downtown Office Complex',
        description: 'Interior painting for 30,000 sq ft commercial space',
        year: '2024'
      },
      {
        name: 'Historic Home Exterior',
        description: 'Restoration painting of 1920s craftsman home',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '3 hours',
    completionRate: '97%'
  },
  {
    id: 4,
    name: 'Robert Martinez',
    title: 'Licensed Master Plumber',
    category: 'Plumbing',
    location: 'Chicago, IL',
    experience: '14 years',
    rating: 4.9,
    reviewCount: 201,
    hourlyRate: '$60-80/hr',
    availability: 'Available in 1 week',
    bio: 'Master plumber with comprehensive experience in residential and commercial plumbing systems. I provide reliable, high-quality service with a focus on long-term solutions. Available for emergency calls 24/7.',
    skills: [
      'Plumbing Installation',
      'Pipe Repair & Replacement',
      'Water Heater Service',
      'Drain Cleaning',
      'Gas Line Work',
      'Sewer Line Service',
      'Fixture Installation',
      'Leak Detection'
    ],
    certifications: [
      'Master Plumber License - IL',
      'Gas Fitting Certified',
      'Backflow Prevention Certified',
      'OSHA Safety Certified',
      'Medical Gas Systems Certified'
    ],
    languages: ['English', 'Spanish'],
    education: 'Plumbing Technology Certificate',
    workHistory: [
      {
        company: 'Martinez Plumbing Solutions',
        role: 'Owner & Master Plumber',
        duration: '2017 - Present'
      },
      {
        company: 'City Plumbing Services',
        role: 'Lead Plumber',
        duration: '2011 - 2017'
      }
    ],
    projects: [
      {
        name: 'High-Rise Residential Building',
        description: 'Complete plumbing system for 20-story apartment building',
        year: '2024'
      },
      {
        name: 'Restaurant Plumbing Overhaul',
        description: 'Full commercial kitchen and restroom plumbing renovation',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '1 hour',
    completionRate: '99%'
  },
  {
    id: 5,
    name: 'James Wilson',
    title: 'Certified Welder & Fabricator',
    category: 'Welding',
    location: 'Houston, TX',
    experience: '10 years',
    rating: 4.7,
    reviewCount: 87,
    hourlyRate: '$50-70/hr',
    availability: 'Available Now',
    bio: 'AWS certified welder with expertise in structural, pipe, and ornamental welding. I take pride in producing strong, clean welds that meet or exceed specifications. Experienced in both shop and field work.',
    skills: [
      'MIG Welding',
      'TIG Welding',
      'Stick Welding',
      'Pipe Welding',
      'Structural Welding',
      'Metal Fabrication',
      'Blueprint Reading',
      'Welding Inspection'
    ],
    certifications: [
      'AWS Certified Welder',
      'ASME Pressure Vessel Certified',
      'Pipe Welding Certification',
      'Structural Welding Certification',
      'Safety Training Certified'
    ],
    languages: ['English'],
    education: 'Welding Technology Diploma',
    workHistory: [
      {
        company: 'Industrial Fabrication Inc.',
        role: 'Lead Welder',
        duration: '2019 - Present'
      },
      {
        company: 'Steel Works Manufacturing',
        role: 'Journeyman Welder',
        duration: '2015 - 2019'
      }
    ],
    projects: [
      {
        name: 'Petrochemical Plant Expansion',
        description: 'Structural steel welding for industrial facility',
        year: '2024'
      },
      {
        name: 'Custom Metal Gates',
        description: 'Ornamental welding for luxury residential entrance',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '4 hours',
    completionRate: '96%'
  },
  {
    id: 6,
    name: 'Thomas Anderson',
    title: 'Master Mason & Stone Worker',
    category: 'Masonry',
    location: 'Boston, MA',
    experience: '18 years',
    rating: 5.0,
    reviewCount: 64,
    hourlyRate: '$55-75/hr',
    availability: 'Available in 3 weeks',
    bio: 'Third-generation master mason specializing in historic restoration and custom stonework. My work combines traditional techniques with modern methods to create lasting structures of beauty and strength.',
    skills: [
      'Brick Laying',
      'Stone Masonry',
      'Historic Restoration',
      'Chimney Construction',
      'Tuckpointing',
      'Concrete Work',
      'Pattern Work',
      'Architectural Details'
    ],
    certifications: [
      'Master Mason Certification',
      'Historic Preservation Specialist',
      'OSHA Construction Safety',
      'Masonry Institute Certified'
    ],
    languages: ['English'],
    education: 'Masonry & Stone Working Apprenticeship',
    workHistory: [
      {
        company: 'Anderson Masonry (Family Business)',
        role: 'Master Mason & Partner',
        duration: '2010 - Present'
      },
      {
        company: 'Heritage Building Restoration',
        role: 'Senior Mason',
        duration: '2007 - 2010'
      }
    ],
    projects: [
      {
        name: 'Historic Church Restoration',
        description: 'Restoration of 150-year-old brick and stone church',
        year: '2024'
      },
      {
        name: 'Custom Outdoor Kitchen',
        description: 'Stone and brick outdoor living space with pizza oven',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '2 hours',
    completionRate: '100%'
  },
  {
    id: 7,
    name: 'Kevin Lee',
    title: 'HVAC Master Technician',
    category: 'HVAC',
    location: 'Phoenix, AZ',
    experience: '11 years',
    rating: 4.8,
    reviewCount: 143,
    hourlyRate: '$50-70/hr',
    availability: 'Available Now',
    bio: 'EPA certified HVAC technician with expertise in installation, repair, and maintenance of all types of heating and cooling systems. I provide honest assessments and quality work that keeps systems running efficiently.',
    skills: [
      'HVAC Installation',
      'System Diagnostics',
      'Refrigerant Management',
      'Ductwork Design',
      'Heat Pump Service',
      'Air Quality Systems',
      'Preventive Maintenance',
      'Energy Efficiency'
    ],
    certifications: [
      'EPA Universal Certification',
      'NATE Certified',
      'HVAC Excellence Certified',
      'Energy Star Partner',
      'Commercial HVAC Certified'
    ],
    languages: ['English', 'Korean'],
    education: 'HVAC Technology Certificate',
    workHistory: [
      {
        company: 'Lee Climate Solutions',
        role: 'Owner & Master Technician',
        duration: '2018 - Present'
      },
      {
        company: 'Desert Air Systems',
        role: 'Senior HVAC Technician',
        duration: '2014 - 2018'
      }
    ],
    projects: [
      {
        name: 'Medical Office HVAC System',
        description: 'Complete HVAC installation for 12,000 sq ft medical facility',
        year: '2024'
      },
      {
        name: 'Smart Home Climate Control',
        description: 'High-efficiency system with smart controls and zoning',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '2 hours',
    completionRate: '98%'
  },
  {
    id: 8,
    name: 'Maria Garcia',
    title: 'Landscape Designer & Crew Leader',
    category: 'Landscaping',
    location: 'Portland, OR',
    experience: '9 years',
    rating: 4.9,
    reviewCount: 112,
    hourlyRate: '$45-60/hr',
    availability: 'Available Now',
    bio: 'Creative landscape designer with a passion for sustainable and native plant landscaping. I specialize in creating outdoor spaces that are both beautiful and environmentally responsible.',
    skills: [
      'Landscape Design',
      'Plant Selection',
      'Irrigation Systems',
      'Hardscaping',
      'Sustainable Landscaping',
      'Native Plants',
      'Landscape Lighting',
      'Water Features'
    ],
    certifications: [
      'Certified Landscape Designer',
      'Irrigation Association Certified',
      'Native Plant Specialist',
      'Sustainable Landscaping Certified'
    ],
    languages: ['English', 'Spanish'],
    education: 'Bachelor of Science - Landscape Architecture',
    workHistory: [
      {
        company: 'Garcia Landscape Design',
        role: 'Owner & Lead Designer',
        duration: '2019 - Present'
      },
      {
        company: 'Pacific Northwest Landscapes',
        role: 'Designer & Project Manager',
        duration: '2016 - 2019'
      }
    ],
    projects: [
      {
        name: 'Sustainable Corporate Campus',
        description: 'Native plant landscape design for tech company headquarters',
        year: '2024'
      },
      {
        name: 'Residential Rain Garden',
        description: 'Water-wise garden with integrated rainwater management',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '3 hours',
    completionRate: '99%'
  },
  {
    id: 9,
    name: 'Christopher Brown',
    title: 'Commercial Roofing Specialist',
    category: 'Roofing',
    location: 'Denver, CO',
    experience: '13 years',
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: '$50-70/hr',
    availability: 'Available in 1 week',
    bio: 'Experienced commercial roofer specializing in flat roof systems and roof restoration. I provide thorough inspections, honest assessments, and quality workmanship backed by manufacturer warranties.',
    skills: [
      'Commercial Roofing',
      'TPO Installation',
      'EPDM Systems',
      'Built-Up Roofing',
      'Roof Inspection',
      'Leak Detection',
      'Roof Coatings',
      'Safety Management'
    ],
    certifications: [
      'Commercial Roofing Certified',
      'GAF Master Elite',
      'OSHA 30-Hour Construction',
      'Fall Protection Certified',
      'Roof Inspector Certification'
    ],
    languages: ['English'],
    education: 'Roofing Technology Certification',
    workHistory: [
      {
        company: 'Alpine Roofing Systems',
        role: 'Project Manager & Lead Roofer',
        duration: '2017 - Present'
      },
      {
        company: 'Mountain Peak Roofing',
        role: 'Roofing Foreman',
        duration: '2012 - 2017'
      }
    ],
    projects: [
      {
        name: 'Shopping Center Roof Replacement',
        description: 'Complete TPO roof system for 80,000 sq ft retail center',
        year: '2024'
      },
      {
        name: 'Industrial Warehouse Restoration',
        description: 'Roof coating and repair system for manufacturing facility',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '4 hours',
    completionRate: '95%'
  },
  {
    id: 10,
    name: 'Daniel Thompson',
    title: 'Professional CDL Driver',
    category: 'Transportation',
    location: 'Atlanta, GA',
    experience: '7 years',
    rating: 4.6,
    reviewCount: 89,
    hourlyRate: '$35-45/hr',
    availability: 'Available Now',
    bio: 'Reliable and safety-focused CDL driver with a clean driving record and extensive experience transporting construction materials and equipment. I take pride in on-time delivery and professional service.',
    skills: [
      'Commercial Driving',
      'Load Securement',
      'DOT Compliance',
      'Route Planning',
      'Safety Protocols',
      'Equipment Transport',
      'Heavy Haul',
      'Logistics Coordination'
    ],
    certifications: [
      'Class A CDL',
      'HAZMAT Endorsement',
      'Tanker Endorsement',
      'OSHA Forklift Certified',
      'DOT Medical Card Current'
    ],
    languages: ['English'],
    education: 'Commercial Driving Training Certificate',
    workHistory: [
      {
        company: 'Southeastern Transport',
        role: 'Senior CDL Driver',
        duration: '2020 - Present'
      },
      {
        company: 'BuildHaul Logistics',
        role: 'CDL Driver',
        duration: '2018 - 2020'
      }
    ],
    projects: [
      {
        name: 'Stadium Construction Project',
        description: 'Material transport for major stadium construction',
        year: '2024'
      },
      {
        name: 'Bridge Renovation Support',
        description: 'Heavy equipment and material delivery for infrastructure project',
        year: '2023'
      }
    ],
    verified: true,
    responseTime: '5 hours',
    completionRate: '97%'
  }
];
