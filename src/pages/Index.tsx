import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/PropertyCard";
import LocationSelector from "@/components/LocationSelector";
import Footer from "@/components/Footer";
import {
  Search,
  Home,
  TrendingUp,
  Shield,
  Star,
  MapPin,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { featuredProperties, mockProperties, locations } from "@/lib/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLocation) params.set("location", selectedLocation);
    navigate(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const stats = [
    { icon: Home, label: "Properties", value: "500+" },
    { icon: MapPin, label: "Locations", value: "8" },
    { icon: Star, label: "Happy Clients", value: "1000+" },
    { icon: TrendingUp, label: "Years Experience", value: "15" },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find your perfect property with our advanced search filters and AI-powered recommendations.",
    },
    {
      icon: Shield,
      title: "Verified Properties",
      description:
        "All properties are verified by our expert team ensuring authenticity and quality.",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-purple-gradient">
      {/* Navigation */}
      <nav className="glass-effect border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PropertyHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Home
              </a>
              <a
                href="/search"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                Search
              </a>
              <a
                href="/upload"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                List Property
              </a>
              <Button
                onClick={() => navigate("/admin")}
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                Admin
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20 pt-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  Home
                </a>
                <a
                  href="/search"
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Search
                </a>
                <a
                  href="/upload"
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  List Property
                </a>
                <Button
                  onClick={() => navigate("/admin")}
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 w-fit"
                >
                  Admin
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-purple-radial opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-float">
              Find Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Dream Property
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover premium properties across India and UAE with our
              comprehensive real estate platform. Your perfect home is just a
              search away.
            </p>

            {/* Search Bar */}
            <Card className="card-gradient max-w-4xl mx-auto p-6">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <LocationSelector
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                      placeholder="Select location"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Input
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="search-input"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Button
                      onClick={handleSearch}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Properties
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="card-gradient text-center p-6 hover-lift"
              >
                <CardContent className="p-0">
                  <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 mb-4">
              Featured Properties
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Premium Properties for You
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Handpicked luxury properties from our exclusive collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/search")}
              variant="outline"
              size="lg"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore Prime Locations
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover properties in the most sought-after destinations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="card-gradient hover-lift cursor-pointer group"
                onClick={() => {
                  setSelectedLocation(location);
                  navigate(`/search?location=${encodeURIComponent(location)}`);
                }}
              >
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-3 group-hover:text-purple-300 transition-colors" />
                  <div className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                    {location}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {
                      mockProperties.filter((p) => p.location === location)
                        .length
                    }{" "}
                    properties
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose PropertyHub?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the future of real estate with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-gradient hover-lift text-center"
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-gradient max-w-4xl mx-auto text-center p-12">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who found their perfect home
                through PropertyHub. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/search")}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Start Searching
                </Button>
                <Button
                  onClick={() => navigate("/upload")}
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                >
                  <Home className="h-5 w-5 mr-2" />
                  List Your Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
