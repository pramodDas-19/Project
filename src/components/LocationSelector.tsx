import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/mockData";

interface LocationSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const LocationSelector = ({
  value,
  onValueChange,
  placeholder = "Select location",
}: LocationSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="glass-effect border-purple-500/30 text-white">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-purple-300" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30">
        {locations.map((location) => (
          <SelectItem
            key={location}
            value={location}
            className="text-white hover:bg-purple-600/20"
          >
            {location}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationSelector;
