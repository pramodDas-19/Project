import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageSquare, Send } from "lucide-react";
import { Property } from "@/lib/mockData";

interface ContactFormProps {
  property: Property;
}

const ContactForm = ({ property }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in the property "${property.title}" in ${property.location}. Could you please provide more details?`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "The property owner will contact you soon.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: `Hi, I'm interested in the property "${property.title}" in ${property.location}. Could you please provide more details?`,
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Contact Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent info */}
        <div className="glass-effect rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">
            {property.contact.name}
          </h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{property.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{property.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="search-input mt-1"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="search-input mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-white">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="search-input mt-1"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className="search-input mt-1 resize-none"
              placeholder="Enter your message"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
            onClick={() => window.open(`tel:${property.contact.phone}`)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
            onClick={() => window.open(`mailto:${property.contact.email}`)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
