import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters, {
  SearchFilters as SearchFiltersType,
} from "@/components/SearchFilters";
import {
  Search,
  Filter,
  Grid,
  List,
  Home,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react";
import { searchProperties } from "@/lib/mockData";
import Footer from "@/components/Footer";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const results = searchProperties(searchQuery, filters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    setSearchParams(params);
  }, [searchQuery, filters, setSearchParams]);

  const handleSearch = () => {
    // Trigger search with current query and filters
    const newResults = searchProperties(searchQuery, filters);
    console.log("Search results:", newResults.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.yearBuilt - a.yearBuilt;
      case "bedrooms":
        return b.bedrooms - a.bedrooms;
      default:
        return 0;
    }
  });

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
                  PropertyHub
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                Home
              </a>
              <a
                href="/search"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Search
              </a>
              <a
                href="/upload"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                List Property
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Search Properties
          </h1>
          <p className="text-gray-300">
            {results.length} {results.length === 1 ? "property" : "properties"}{" "}
            found
            {searchQuery && ` for "${searchQuery}"`}
            {filters.location && ` in ${filters.location}`}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="card-gradient mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search properties, locations, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  {results.length} Results
                </Badge>
                {(searchQuery || filters.location || filters.type) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-purple-300 hover:text-white"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 glass-effect border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
                    <SelectItem
                      value="newest"
                      className="text-white hover:bg-purple-600/20"
                    >
                      Newest First
                    </SelectItem>
                    <SelectItem
                      value="price-low"
                      className="text-white hover:bg-purple-600/20"
                    >
                      Price: Low to High
                    </SelectItem>
                    <SelectItem
                      value="price-high"
                      className="text-white hover:bg-purple-600/20"
                    >
                      Price: High to Low
                    </SelectItem>
                    <SelectItem
                      value="bedrooms"
                      className="text-white hover:bg-purple-600/20"
                    >
                      Most Bedrooms
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-purple-500/30 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-none ${
                      viewMode === "grid"
                        ? "bg-purple-600 text-white"
                        : "text-purple-300 hover:bg-purple-600/20"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-none ${
                      viewMode === "list"
                        ? "bg-purple-600 text-white"
                        : "text-purple-300 hover:bg-purple-600/20"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            {results.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {sortedResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    compact={viewMode === "list"}
                  />
                ))}
              </div>
            ) : (
              <Card className="card-gradient text-center p-12">
                <CardContent className="p-0">
                  <Search className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Try adjusting your search criteria or browse all properties
                  </p>
                  <Button
                    onClick={handleResetFilters}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchPage;
