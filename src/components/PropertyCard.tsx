import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Square, Phone } from "lucide-react";
import { Property } from "@/lib/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

const PropertyCard = ({ property, compact = false }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="property-card group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            compact ? "h-48" : "h-64"
          }`}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              Featured
            </Badge>
          )}
          <Badge
            variant={property.status === "available" ? "default" : "secondary"}
            className={property.status === "available" ? "bg-green-600" : ""}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {property.title}
          </h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-300">
              {formatPrice(property.price)}
            </p>
            {property.location.includes("UAE") && (
              <p className="text-sm text-gray-400">
                AED {((property.price * 0.22) / 10000000).toFixed(1)}M
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center text-gray-300 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.size}</span>
          </div>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          onClick={handleViewDetails}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
        >
          <Phone className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
