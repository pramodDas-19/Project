import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminLogin from "@/components/AdminLogin";
import Footer from "@/components/Footer";
import { authUtils, useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Home,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Users,
  Building,
  TrendingUp,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  LogOut,
  Shield,
  Timer,
  RefreshCw,
} from "lucide-react";
import { mockProperties } from "@/lib/mockData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Check authentication status
  useEffect(() => {
    if (!auth.isAuthenticated) {
      return; // Show login form
    }

    // Check for session expiry warning
    if (auth.isSessionExpiringSoon && !showSessionWarning) {
      setShowSessionWarning(true);
    }
  }, [auth.isAuthenticated, auth.isSessionExpiringSoon, showSessionWarning]);

  // Auto-refresh session check every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        auth.isAuthenticated &&
        auth.isSessionExpiringSoon &&
        !showSessionWarning
      ) {
        setShowSessionWarning(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [auth.isAuthenticated, auth.isSessionExpiringSoon, showSessionWarning]);

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    const result = await authUtils.login(credentials);
    if (result.success) {
      window.location.reload(); // Reload to update auth state
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleExtendSession = () => {
    authUtils.extendSession();
    setShowSessionWarning(false);
    toast({
      title: "Session Extended",
      description: "Your session has been extended for another 24 hours.",
    });
  };

  // If not authenticated, show login form
  if (!auth.isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Mock pending submissions (in a real app, this would come from an API)
  const pendingSubmissions = [
    {
      id: "pending-1",
      title: "Modern 2BHK Apartment",
      location: "Mumbai, India",
      submittedBy: "John Doe",
      submittedAt: "2024-01-15",
      status: "pending",
      type: "apartment",
      price: 8500000,
    },
    {
      id: "pending-2",
      title: "Luxury Villa with Pool",
      location: "Goa, India",
      submittedBy: "Sarah Smith",
      submittedAt: "2024-01-14",
      status: "pending",
      type: "villa",
      price: 25000000,
    },
  ];

  const stats = [
    {
      title: "Total Properties",
      value: mockProperties.length,
      icon: Building,
      color: "text-blue-400",
    },
    {
      title: "Pending Reviews",
      value: pendingSubmissions.length,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Active Listings",
      value: mockProperties.filter((p) => p.status === "available").length,
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  const handleApprove = (id: string) => {
    console.log("Approving property:", id);
    toast({
      title: "Property Approved",
      description: "The property has been approved and published.",
    });
  };

  const handleReject = (id: string) => {
    console.log("Rejecting property:", id);
    toast({
      title: "Property Rejected",
      description: "The property submission has been rejected.",
      variant: "destructive",
    });
  };

  const handleEdit = (property: any) => {
    setSelectedProperty(property);
  };

  const handleDelete = (id: string) => {
    console.log("Deleting property:", id);
    toast({
      title: "Property Deleted",
      description: "The property has been removed from listings.",
      variant: "destructive",
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const filteredProperties = mockProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const PropertyCard = ({ property, isPending = false }: any) => (
    <Card className="card-gradient hover-lift">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              {property.title}
            </h3>
            <p className="text-gray-300 text-sm mb-2">{property.location}</p>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="border-purple-500/30 text-purple-300"
              >
                {property.type}
              </Badge>
              <span className="text-purple-300 font-semibold">
                {formatPrice(property.price)}
              </span>
            </div>
            {isPending && (
              <p className="text-gray-400 text-sm">
                Submitted by {property.submittedBy} on {property.submittedAt}
              </p>
            )}
          </div>
          {property.images && property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-20 h-20 object-cover rounded-lg ml-4"
            />
          )}
        </div>

        <div className="flex gap-2">
          {isPending ? (
            <>
              <Button
                size="sm"
                onClick={() => handleApprove(property.id)}
                className="bg-green-600 hover:bg-green-700 text-white border-0"
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReject(property.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/property/${property.id}`)}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(property)}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(property.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-dark-purple-gradient">
      {/* Session Warning */}
      {showSessionWarning && (
        <Alert className="mx-4 mt-4 border-yellow-500/30 bg-yellow-500/10">
          <Timer className="h-4 w-4" />
          <AlertDescription className="text-yellow-300 flex items-center justify-between">
            <span>
              Your session will expire in {auth.sessionTimeRemaining} minutes.
              Extend your session to continue working.
            </span>
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                onClick={handleExtendSession}
                className="bg-yellow-600 hover:bg-yellow-700 text-white border-0"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Extend Session
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSessionWarning(false)}
                className="text-yellow-300 hover:text-white"
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <nav className="glass-effect border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <span className="text-2xl font-bold text-white">
                  PropertyHub Admin
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-white text-sm">
                <Shield className="h-4 w-4 text-green-400" />
                <span>
                  Welcome,{" "}
                  <span className="font-semibold">{auth.user?.username}</span>
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-300">
            Manage properties, reviews, and user submissions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 bg-gray-800/50 border border-purple-500/30">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-purple-600"
            >
              Pending Reviews ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-purple-600"
            >
              All Properties ({mockProperties.length})
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-600"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Property Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {pendingSubmissions.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isPending={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No Pending Reviews
                    </h3>
                    <p className="text-gray-300">
                      All property submissions have been reviewed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    All Properties
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input pl-10 w-64"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-white">
                    Popular Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Goa, India",
                      "Dubai, UAE",
                      "Mumbai, India",
                      "Bangalore, India",
                    ].map((location, index) => (
                      <div
                        key={location}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-300">{location}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                              style={{ width: `${(4 - index) * 25}%` }}
                            ></div>
                          </div>
                          <span className="text-purple-300 text-sm">
                            {
                              mockProperties.filter(
                                (p) => p.location === location,
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-white">Property Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["villa", "apartment", "house", "studio"].map((type) => {
                      const count = mockProperties.filter(
                        (p) => p.type === type,
                      ).length;
                      const percentage = (count / mockProperties.length) * 100;
                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-300 capitalize">
                            {type}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-purple-300 text-sm">
                              {count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
