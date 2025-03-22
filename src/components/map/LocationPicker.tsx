"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, XCircle } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationPickerProps {
  onSaveLocation: (location: Location) => void;
  initialLocation?: Location;
  buttonLabel?: string;
}

// Default center location (Bangladesh)
const defaultCenter: Location = { lat: 23.8103, lng: 90.4125, address: "" };

// Libraries to load
const libraries: Libraries = ["places"];

const LocationPicker: React.FC<LocationPickerProps> = ({
  onSaveLocation,
  initialLocation,
  buttonLabel = "সংরক্ষণ করুন"
}) => {
  const [center, setCenter] = useState(initialLocation ? 
    { lat: initialLocation.lat, lng: initialLocation.lng } : 
    defaultCenter
  );
  const [marker, setMarker] = useState<Location | null>(
    initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng, address: initialLocation.address } : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries
  });

  // Get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = useCallback(async (location: Location) => {
    if (!isLoaded) return;
    
    try {
      const geocoder = new google.maps.Geocoder();
      
      const geocodeResult = await new Promise<google.maps.GeocoderResponse>((resolve, reject) => {
        geocoder.geocode(
          { location: { lat: location.lat, lng: location.lng } },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              resolve({ results, status } as google.maps.GeocoderResponse);
            } else {
              reject(status);
            }
          }
        );
      });
      
      if (geocodeResult.results.length > 0) {
        const updatedLocation = {
          ...location,
          address: geocodeResult.results[0].formatted_address
        };
        setMarker(updatedLocation);
      } else {
        const updatedLocation = {
          ...location,
          address: "Address not found"
        };
        setMarker(updatedLocation);
      }
    } catch (error) {
      console.error("Geocoder failed:", error);
      const updatedLocation = {
        ...location,
        address: "Error getting address"
      };
      setMarker(updatedLocation);
    }
  }, [isLoaded]);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: ""
          };
          setCenter(userLocation);
          setMarker(userLocation);
          getAddressFromCoordinates(userLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [getAddressFromCoordinates]);

  // Search for locations
  const searchLocation = useCallback(async () => {
    if (!isLoaded || !searchQuery) return;
    
    setIsSearching(true);
    
    try {
      const geocoder = new google.maps.Geocoder();
      
      const geocodeResult = await new Promise<google.maps.GeocoderResponse>((resolve, reject) => {
        geocoder.geocode(
          { address: searchQuery },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              resolve({ results, status } as google.maps.GeocoderResponse);
            } else {
              reject(status);
            }
          }
        );
      });
      
      if (geocodeResult.results.length > 0) {
        const location: Location = {
          lat: geocodeResult.results[0].geometry.location.lat(),
          lng: geocodeResult.results[0].geometry.location.lng(),
          address: geocodeResult.results[0].formatted_address
        };
        setCenter(location);
        setMarker(location);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  }, [isLoaded, searchQuery]);

  // Handle map click to set marker
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedLocation: Location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        address: ""
      };
      setMarker(clickedLocation);
      getAddressFromCoordinates(clickedLocation);
    }
  }, [getAddressFromCoordinates]);

  // Handle saving location
  const handleSaveLocation = useCallback(() => {
    if (marker) {
      onSaveLocation(marker);
    }
  }, [marker, onSaveLocation]);

  // Handle Enter key for search
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  }, [searchLocation]);

  // If initialLocation changes, update state
  useEffect(() => {
    if (initialLocation) {
      setCenter({ lat: initialLocation.lat, lng: initialLocation.lng });
      setMarker({ lat: initialLocation.lat, lng: initialLocation.lng, address: initialLocation.address });
    }
  }, [initialLocation]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <Card className="p-4 w-full">
      <div className="mb-4">
        <div className="flex mb-2 gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="স্থান খুঁজুন"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            {searchQuery && (
              <button 
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery("")}
              >
                <XCircle size={18} />
              </button>
            )}
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={searchLocation}
              disabled={isSearching}
            >
              <Search size={18} />
            </button>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={getCurrentLocation}
            title="আমার অবস্থান"
          >
            <MapPin />
          </Button>
        </div>
      </div>

      <div className="h-[400px] w-full border rounded-md mb-4">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={13}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>

      {marker && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">ঠিকানা:</p>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{marker.address}</p>
        </div>
      )}

      <Button
        onClick={handleSaveLocation}
        disabled={!marker}
        className="w-full"
      >
        {buttonLabel}
      </Button>
    </Card>
  );
};

export default LocationPicker;
