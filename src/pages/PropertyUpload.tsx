import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import LocationSelector from "@/components/LocationSelector";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Home,
  ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { amenities } from "@/lib/mockData";

interface FormData {
  title: string;
  location: string;
  price: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  type: string;
  description: string;
  yearBuilt: string;
  parking: boolean;
  furnished: boolean;
  selectedAmenities: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: File[];
}

const PropertyUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    location: "",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    type: "",
    description: "",
    yearBuilt: "",
    parking: false,
    furnished: false,
    selectedAmenities: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    images: [],
  });

  const propertyTypes = [
    { value: "villa", label: "Villa" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "studio", label: "Studio" },
  ];

  const steps = [
    { id: 1, title: "Basic Details", icon: Home },
    { id: 2, title: "Property Info", icon: CheckCircle },
    { id: 3, title: "Contact Info", icon: AlertCircle },
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.images.length + files.length > 10) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 10 images.",
        variant: "destructive",
      });
      return;
    }
    updateFormData("images", [...formData.images, ...files]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData("images", newImages);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = formData.selectedAmenities.includes(amenity)
      ? formData.selectedAmenities.filter((a) => a !== amenity)
      : [...formData.selectedAmenities, amenity];
    updateFormData("selectedAmenities", newAmenities);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.title && formData.location && formData.price && formData.type
        );
      case 2:
        return (
          formData.bedrooms &&
          formData.bathrooms &&
          formData.size &&
          formData.description
        );
      case 3:
        return (
          formData.contactName && formData.contactPhone && formData.contactEmail
        );
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Property Submitted!",
      description:
        "Your property will be reviewed and published within 24-48 hours.",
    });

    navigate("/");
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Property Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g., Luxury 3BHK Villa with Sea View"
                className="search-input mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-white">Location *</Label>
              <div className="mt-1">
                <LocationSelector
                  value={formData.location}
                  onValueChange={(value) => updateFormData("location", value)}
                  placeholder="Select location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Property Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => updateFormData("type", value)}
                >
                  <SelectTrigger className="glass-effect border-purple-500/30 text-white mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
                    {propertyTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-white hover:bg-purple-600/20"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  placeholder="e.g., 5000000"
                  className="search-input mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Property Images</Label>
              <div className="mt-1">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="glass-effect border-purple-500/30 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-purple-600/10 transition-colors block"
                >
                  <ImageIcon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-white mb-2">Click to upload images</p>
                  <p className="text-gray-400 text-sm">
                    Maximum 10 images, each up to 5MB
                  </p>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Bedrooms *</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value) => updateFormData("bedrooms", value)}
                >
                  <SelectTrigger className="glass-effect border-purple-500/30 text-white mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="text-white hover:bg-purple-600/20"
                      >
                        {num} {num === 1 ? "Bedroom" : "Bedrooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Bathrooms *</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) => updateFormData("bathrooms", value)}
                >
                  <SelectTrigger className="glass-effect border-purple-500/30 text-white mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="text-white hover:bg-purple-600/20"
                      >
                        {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Size *</Label>
                <Input
                  value={formData.size}
                  onChange={(e) => updateFormData("size", e.target.value)}
                  placeholder="e.g., 2500 sq ft"
                  className="search-input mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Year Built</Label>
              <Input
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => updateFormData("yearBuilt", e.target.value)}
                placeholder="e.g., 2020"
                className="search-input mt-1"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <Label className="text-white">Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your property in detail..."
                rows={4}
                className="search-input mt-1 resize-none"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parking"
                  checked={formData.parking}
                  onCheckedChange={(checked) =>
                    updateFormData("parking", checked)
                  }
                  className="border-purple-500/30"
                />
                <Label htmlFor="parking" className="text-white cursor-pointer">
                  Parking Available
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furnished"
                  checked={formData.furnished}
                  onCheckedChange={(checked) =>
                    updateFormData("furnished", checked)
                  }
                  className="border-purple-500/30"
                />
                <Label
                  htmlFor="furnished"
                  className="text-white cursor-pointer"
                >
                  Furnished
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">Amenities</Label>
              {formData.selectedAmenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.selectedAmenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {amenity}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => toggleAmenity(amenity)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                      className="border-purple-500/30"
                    />
                    <Label
                      htmlFor={amenity}
                      className="text-gray-300 text-sm cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Contact Name *</Label>
              <Input
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="Your full name"
                className="search-input mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-white">Phone Number *</Label>
              <Input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                placeholder="Your phone number"
                className="search-input mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-white">Email Address *</Label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="Your email address"
                className="search-input mt-1"
                required
              />
            </div>

            <Card className="glass-effect border-yellow-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Review Process
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Your property will be reviewed by our team within 24-48
                      hours. We'll contact you if any additional information is
                      needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-purple-gradient">
      {/* Navigation */}
      <nav className="glass-effect border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-white hover:bg-purple-600/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PropertyHub</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              List Your Property
            </h1>
            <p className="text-gray-300">
              Share your property details and reach thousands of potential
              buyers or tenants
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-purple-500/30 text-purple-300"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="ml-2 hidden md:block">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id
                        ? "bg-purple-600"
                        : "bg-purple-500/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                    >
                      Previous
                    </Button>
                  )}

                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Submit Property
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PropertyUpload;
