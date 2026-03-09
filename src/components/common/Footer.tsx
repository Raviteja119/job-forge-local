import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">JobConnect</span>
            </div>
            <p className="text-sm text-background/70">
              India's leading platform connecting skilled workers with employers. Find jobs, hire talent, grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register-selection" className="hover:text-primary transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/post-job" className="hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link to="/browse-workers" className="hover:text-primary transition-colors">Browse Workers</Link></li>
              <li><Link to="/register-selection" className="hover:text-primary transition-colors">Employer Registration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" />support@jobconnect.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" />+91 1800-123-456</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" />Noida, UP 201309</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} JobConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
