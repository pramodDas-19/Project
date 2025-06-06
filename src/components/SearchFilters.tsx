import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Home, Building2, Building, Bed } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { amenities } from "@/lib/mockData";

export interface SearchFilters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
}

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
  compact?: boolean;
}

const SearchFilters = ({
  filters,
  onFiltersChange,
  onReset,
  compact = false,
}: SearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 50000000,
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    filters.amenities || [],
  );

  const propertyTypes = [
    { value: "villa", label: "Villa", icon: Home },
    { value: "apartment", label: "Apartment", icon: Building2 },
    { value: "house", label: "House", icon: Building },
    { value: "studio", label: "Studio", icon: Bed },
  ];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(0)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location });
  };

  const handleTypeChange = (type: string) => {
    onFiltersChange({ ...filters, type });
  };

  const handleBedroomsChange = (bedrooms: string) => {
    onFiltersChange({ ...filters, bedrooms: parseInt(bedrooms) });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(newAmenities);
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  const removeAmenity = (amenity: string) => {
    const newAmenities = selectedAmenities.filter((a) => a !== amenity);
    setSelectedAmenities(newAmenities);
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  const hasActiveFilters =
    filters.location ||
    filters.type ||
    filters.bedrooms ||
    filters.minPrice ||
    filters.maxPrice ||
    (filters.amenities && filters.amenities.length > 0);

  if (compact) {
    return (
      <Card className="card-gradient">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <LocationSelector
              value={filters.location}
              onValueChange={handleLocationChange}
              placeholder="Any location"
            />
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="glass-effect border-purple-500/30 text-white">
                <SelectValue placeholder="Property type" />
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
            <Select
              value={filters.bedrooms?.toString()}
              onValueChange={handleBedroomsChange}
            >
              <SelectTrigger className="glass-effect border-purple-500/30 text-white">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
                <SelectItem
                  value="1"
                  className="text-white hover:bg-purple-600/20"
                >
                  1+ Bedrooms
                </SelectItem>
                <SelectItem
                  value="2"
                  className="text-white hover:bg-purple-600/20"
                >
                  2+ Bedrooms
                </SelectItem>
                <SelectItem
                  value="3"
                  className="text-white hover:bg-purple-600/20"
                >
                  3+ Bedrooms
                </SelectItem>
                <SelectItem
                  value="4"
                  className="text-white hover:bg-purple-600/20"
                >
                  4+ Bedrooms
                </SelectItem>
                <SelectItem
                  value="5"
                  className="text-white hover:bg-purple-600/20"
                >
                  5+ Bedrooms
                </SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button
                onClick={onReset}
                variant="outline"
                className="border-purple-500/30 text-purple-300"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="ml-auto text-purple-300 hover:text-white"
            >
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-white mb-2 block">Location</Label>
          <LocationSelector
            value={filters.location}
            onValueChange={handleLocationChange}
            placeholder="Any location"
          />
        </div>

        <div>
          <Label className="text-white mb-3 block">Property Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = filters.type === type.value;
              return (
                <Button
                  key={type.value}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleTypeChange(isSelected ? "" : type.value)}
                  className={`justify-start ${
                    isSelected
                      ? "bg-purple-600 text-white"
                      : "border-purple-500/30 text-gray-300 hover:bg-purple-600/20"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Bedrooms</Label>
          <Select
            value={filters.bedrooms?.toString()}
            onValueChange={handleBedroomsChange}
          >
            <SelectTrigger className="glass-effect border-purple-500/30 text-white">
              <SelectValue placeholder="Any bedrooms" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
              <SelectItem
                value="1"
                className="text-white hover:bg-purple-600/20"
              >
                1+ Bedrooms
              </SelectItem>
              <SelectItem
                value="2"
                className="text-white hover:bg-purple-600/20"
              >
                2+ Bedrooms
              </SelectItem>
              <SelectItem
                value="3"
                className="text-white hover:bg-purple-600/20"
              >
                3+ Bedrooms
              </SelectItem>
              <SelectItem
                value="4"
                className="text-white hover:bg-purple-600/20"
              >
                4+ Bedrooms
              </SelectItem>
              <SelectItem
                value="5"
                className="text-white hover:bg-purple-600/20"
              >
                5+ Bedrooms
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white mb-4 block">
            Price Range: {formatPrice(priceRange[0])} -{" "}
            {formatPrice(priceRange[1])}
          </Label>
          <Slider
            min={0}
            max={50000000}
            step={500000}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-white mb-3 block">Amenities</Label>
          {selectedAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {amenity}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeAmenity(amenity)}
                  />
                </Badge>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
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
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
