import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Building,
  Search,
  Upload,
  Shield,
  HelpCircle,
  FileText,
  Users,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description:
          "You'll receive updates about new properties and market insights.",
      });
      setEmail("");
    }
  };

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ];

  const propertyLinks = [
    { label: "Buy Properties", href: "/search?type=sale" },
    { label: "Rent Properties", href: "/search?type=rent" },
    { label: "Luxury Homes", href: "/search?category=luxury" },
    { label: "Commercial", href: "/search?type=commercial" },
    { label: "New Projects", href: "/search?category=new" },
  ];

  const locationLinks = [
    { label: "Goa Properties", href: "/search?location=Goa, India" },
    { label: "Dubai Properties", href: "/search?location=Dubai, UAE" },
    { label: "Mumbai Properties", href: "/search?location=Mumbai, India" },
    {
      label: "Bangalore Properties",
      href: "/search?location=Bangalore, India",
    },
    { label: "Delhi Properties", href: "/search?location=Delhi, India" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Contact Support", href: "/support" },
    { label: "Property Valuation", href: "/valuation" },
    { label: "Mortgage Calculator", href: "/calculator" },
    { label: "Market Reports", href: "/reports" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR Compliance", href: "/gdpr" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/propertyhub",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/propertyhub",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/propertyhub",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/propertyhub",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/propertyhub",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-t border-purple-500/20">
      {/* Newsletter Section */}
      <div className="border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Latest Properties
            </h3>
            <p className="text-gray-300 mb-8">
              Get notified about new listings, price changes, and market
              insights in your preferred locations.
            </p>
            <form
              onSubmit={handleNewsletterSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="search-input flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PropertyHub</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in finding the perfect property. We connect
              buyers, sellers, and renters across India and UAE with
              comprehensive listings and expert guidance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>info@propertyhub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Mumbai, India & Dubai, UAE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-300 hover:bg-purple-600/40 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Building className="h-4 w-4 text-purple-400" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-purple-400" />
              Properties
            </h4>
            <ul className="space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              Locations
            </h4>
            <ul className="space-y-3">
              {locationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-purple-400" />
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h5 className="text-white font-semibold mb-1">
                Verified Listings
              </h5>
              <p className="text-gray-400 text-sm">100% authentic properties</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h5 className="text-white font-semibold mb-1">Expert Support</h5>
              <p className="text-gray-400 text-sm">
                24/7 professional guidance
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-purple-400" />
              </div>
              <h5 className="text-white font-semibold mb-1">5 Star Rating</h5>
              <p className="text-gray-400 text-sm">Trusted by thousands</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-3">
                <Upload className="h-6 w-6 text-purple-400" />
              </div>
              <h5 className="text-white font-semibold mb-1">Easy Listing</h5>
              <p className="text-gray-400 text-sm">
                List your property in minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 2025 PropertyHub. All rights reserved.</p>
              <p className="mt-1">
                Your trusted real estate partner across India and UAE
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-6">
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
