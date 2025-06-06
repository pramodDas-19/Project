import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PropertyGallery from "@/components/PropertyGallery";
import ContactForm from "@/components/ContactForm";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Car,
  Sofa,
  Heart,
  Share2,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  Home,
} from "lucide-react";
import { mockProperties, featuredProperties } from "@/lib/mockData";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find((p) => p.id === id);
  const similarProperties = featuredProperties
    .filter(
      (p) =>
        p.id !== id &&
        (p.location === property?.location || p.type === property?.type),
    )
    .slice(0, 3);

  if (!property) {
    return (
      <div className="min-h-screen bg-dark-purple-gradient flex items-center justify-center">
        <Card className="card-gradient text-center p-12">
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold text-white mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-300 mb-6">
              The property you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/search")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              Browse Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleShare = () => {
    navigator
      .share?.({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
      });
  };

  return (
    <div className="min-h-screen bg-dark-purple-gradient">
      {/* Navigation */}
      <nav className="glass-effect border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-purple-600/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  PropertyHub
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-white hover:bg-purple-600/20"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-white hover:bg-purple-600/20"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {property.featured && (
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                Featured
              </Badge>
            )}
            <Badge
              variant={
                property.status === "available" ? "default" : "secondary"
              }
              className={property.status === "available" ? "bg-green-600" : ""}
            >
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </Badge>
            <Badge
              variant="outline"
              className="border-purple-500/30 text-purple-300"
            >
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            {property.title}
          </h1>

          <div className="flex items-center text-gray-300 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">{property.location}</span>
          </div>

          <div className="text-4xl font-bold text-purple-300 mb-6">
            {formatPrice(property.price)}
            {property.location.includes("UAE") && (
              <span className="text-lg text-gray-400 ml-2">
                (AED {((property.price * 0.22) / 10000000).toFixed(1)}M)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              <span>{property.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Built in {property.yearBuilt}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8">
              <PropertyGallery
                images={property.images}
                title={property.title}
              />
            </div>

            {/* Description */}
            <Card className="card-gradient mb-8">
              <CardHeader>
                <CardTitle className="text-white">
                  About This Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="card-gradient mb-8">
              <CardHeader>
                <CardTitle className="text-white">Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Property Details
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span>Property Type:</span>
                        <span className="capitalize">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{property.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bedrooms:</span>
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bathrooms:</span>
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year Built:</span>
                        <span>{property.yearBuilt}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Additional Features
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <span>
                          Parking:{" "}
                          {property.parking ? "Available" : "Not Available"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sofa className="h-4 w-4" />
                        <span>
                          Furnished: {property.furnished ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>
                          Status:{" "}
                          {property.status.charAt(0).toUpperCase() +
                            property.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="card-gradient mb-8">
              <CardHeader>
                <CardTitle className="text-white">Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800/50 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive map coming soon</p>
                    <p className="text-sm">{property.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Form */}
              <ContactForm property={property} />

              {/* Quick Actions */}
              <Card className="card-gradient">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                      onClick={() =>
                        window.open(`tel:${property.contact.phone}`)
                      }
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                      onClick={() =>
                        window.open(`mailto:${property.contact.email}`)
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PropertyDetails;
