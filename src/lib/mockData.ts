export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  size: string;
  bedrooms: number;
  bathrooms: number;
  type: "villa" | "apartment" | "house" | "studio";
  images: string[];
  description: string;
  amenities: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  featured: boolean;
  status: "available" | "sold" | "pending";
  coordinates: {
    lat: number;
    lng: number;
  };
  yearBuilt: number;
  parking: boolean;
  furnished: boolean;
}

export const locations = [
  "Goa, India",
  "Dubai, UAE",
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Chennai, India",
  "Abu Dhabi, UAE",
  "Sharjah, UAE",
];

export const amenities = [
  "Swimming Pool",
  "Gym",
  "Garden",
  "Balcony",
  "Parking",
  "Security",
  "Wi-Fi",
  "Air Conditioning",
  "Elevator",
  "Terrace",
  "Sea View",
  "City View",
  "Near Beach",
  "Shopping Mall Nearby",
  "Restaurant",
  "Spa",
  "Concierge",
  "Pet Friendly",
];

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    location: "Goa, India",
    price: 25000000,
    size: "4500 sq ft",
    bedrooms: 5,
    bathrooms: 6,
    type: "villa",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    description:
      "Stunning beachfront villa with panoramic ocean views, private beach access, and world-class amenities. Perfect for luxury living with spacious rooms and modern architecture.",
    amenities: [
      "Swimming Pool",
      "Private Beach",
      "Garden",
      "Parking",
      "Security",
      "Sea View",
    ],
    contact: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul@propertydeals.com",
    },
    featured: true,
    status: "available",
    coordinates: { lat: 15.2993, lng: 74.124 },
    yearBuilt: 2022,
    parking: true,
    furnished: true,
  },
  {
    id: "2",
    title: "Modern Downtown Apartment",
    location: "Dubai, UAE",
    price: 8500000,
    size: "2200 sq ft",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    description:
      "Contemporary apartment in the heart of Dubai with stunning city views, premium finishes, and access to world-class amenities. Close to shopping, dining, and business districts.",
    amenities: [
      "Gym",
      "Swimming Pool",
      "Concierge",
      "Parking",
      "City View",
      "Shopping Mall Nearby",
    ],
    contact: {
      name: "Ahmed Al-Mansouri",
      phone: "+971 50 123 4567",
      email: "ahmed@dubaihomes.ae",
    },
    featured: true,
    status: "available",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    yearBuilt: 2021,
    parking: true,
    furnished: false,
  },
  {
    id: "3",
    title: "Cozy Studio Near IT Park",
    location: "Bangalore, India",
    price: 3500000,
    size: "650 sq ft",
    bedrooms: 1,
    bathrooms: 1,
    type: "studio",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    description:
      "Perfect studio apartment for young professionals. Modern design, fully furnished, and located near major IT companies and metro stations.",
    amenities: ["Wi-Fi", "Gym", "Security", "Elevator", "Parking"],
    contact: {
      name: "Priya Krishnan",
      phone: "+91 8765432109",
      email: "priya@bangalorestudios.in",
    },
    featured: false,
    status: "available",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    yearBuilt: 2020,
    parking: true,
    furnished: true,
  },
  {
    id: "4",
    title: "Spacious Family House",
    location: "Mumbai, India",
    price: 15000000,
    size: "3200 sq ft",
    bedrooms: 4,
    bathrooms: 4,
    type: "house",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    description:
      "Beautiful family house in a prime Mumbai location. Features a large garden, modern kitchen, and excellent connectivity to business districts.",
    amenities: ["Garden", "Parking", "Security", "Terrace", "Air Conditioning"],
    contact: {
      name: "Vikram Patel",
      phone: "+91 9123456789",
      email: "vikram@mumbaihomes.com",
    },
    featured: true,
    status: "available",
    coordinates: { lat: 19.076, lng: 72.8777 },
    yearBuilt: 2019,
    parking: true,
    furnished: false,
  },
  {
    id: "5",
    title: "Penthouse with Sky Views",
    location: "Abu Dhabi, UAE",
    price: 12000000,
    size: "3800 sq ft",
    bedrooms: 4,
    bathrooms: 5,
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
    ],
    description:
      "Luxury penthouse with breathtaking city and sea views. Features premium finishes, private elevator access, and exclusive rooftop terrace.",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Concierge",
      "Terrace",
      "City View",
      "Sea View",
      "Elevator",
    ],
    contact: {
      name: "Sara Al-Zahra",
      phone: "+971 50 987 6543",
      email: "sara@abudhabipremium.ae",
    },
    featured: true,
    status: "available",
    coordinates: { lat: 24.4539, lng: 54.3773 },
    yearBuilt: 2023,
    parking: true,
    furnished: true,
  },
  {
    id: "6",
    title: "Heritage Bungalow",
    location: "Goa, India",
    price: 18000000,
    size: "5200 sq ft",
    bedrooms: 6,
    bathrooms: 5,
    type: "house",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    ],
    description:
      "Charming heritage-style bungalow with traditional Goan architecture. Large compound, fruit trees, and walking distance to popular beaches.",
    amenities: [
      "Garden",
      "Parking",
      "Terrace",
      "Near Beach",
      "Air Conditioning",
      "Pet Friendly",
    ],
    contact: {
      name: "Carlos D'Souza",
      phone: "+91 9234567890",
      email: "carlos@goaheritage.in",
    },
    featured: false,
    status: "available",
    coordinates: { lat: 15.3004, lng: 74.1278 },
    yearBuilt: 1995,
    parking: true,
    furnished: false,
  },
];

export const featuredProperties = mockProperties.filter((p) => p.featured);

export const getPropertiesByLocation = (location: string) => {
  return mockProperties.filter((p) => p.location === location);
};

export const getPropertiesByType = (type: string) => {
  return mockProperties.filter((p) => p.type === type);
};

export const getPropertiesByPriceRange = (min: number, max: number) => {
  return mockProperties.filter((p) => p.price >= min && p.price <= max);
};

export const searchProperties = (
  query: string,
  filters?: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    amenities?: string[];
  },
) => {
  let results = mockProperties;

  if (query) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filters) {
    if (filters.location) {
      results = results.filter((p) => p.location === filters.location);
    }
    if (filters.type) {
      results = results.filter((p) => p.type === filters.type);
    }
    if (filters.minPrice) {
      results = results.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      results = results.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.bedrooms) {
      results = results.filter((p) => p.bedrooms >= filters.bedrooms!);
    }
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((p) =>
        filters.amenities!.some((amenity) => p.amenities.includes(amenity)),
      );
    }
  }

  return results;
};
