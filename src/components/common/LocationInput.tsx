/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface LocationInputProps {
  value: string;
  onChange: (location: Location) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

const KUSHTIA_BOUNDS = {
  north: 23.9391,
  south: 23.8891,
  east: 89.15,
  west: 89.09,
};

export default function LocationInput({
  value,
  onChange,
  placeholder = "ঠিকানা",
  className,
}: LocationInputProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initGoogleMaps = () => {
        initializeAutocomplete();
      };

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeAutocomplete();
    }
  }, []);

  const initializeAutocomplete = () => {
    if (!inputRef.current) return;

    const options = {
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(KUSHTIA_BOUNDS.south, KUSHTIA_BOUNDS.west),
        new google.maps.LatLng(KUSHTIA_BOUNDS.north, KUSHTIA_BOUNDS.east)
      ),
      componentRestrictions: { country: "BD" },
      fields: ["address_components", "geometry", "formatted_address"],
      strictBounds: true,
    };

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const location = {
          address: place.formatted_address || value || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onChange(location);
        if (map && marker) {
          map.setCenter(place.geometry.location);
          marker.setPosition(place.geometry.location);
        }
      }
    });

    setAutocomplete(autocomplete);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultLocation = { lat: 23.9088, lng: 89.122 }; // Kushtia center
    const mapOptions: google.maps.MapOptions = {
      center: defaultLocation,
      zoom: 14,
      restriction: {
        latLngBounds: KUSHTIA_BOUNDS,
        strictBounds: true,
      },
      mapTypeControl: false,
    };

    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    const newMarker = new google.maps.Marker({
      map: newMap,
      position: defaultLocation,
      draggable: true,
    });

    newMarker.addListener("dragend", () => {
      const position = newMarker.getPosition();
      if (position) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: position.lat(), lng: position.lng() } },
          (results, status) => {
            if (status === "OK" && results?.[0]) {
              const location = {
                address: results[0].formatted_address || value || "",
                lat: position.lat(),
                lng: position.lng(),
              };
              onChange(location);
            }
          }
        );
      }
    });

    setMap(newMap);
    setMarker(newMarker);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Check if location is within Kushtia bounds
          if (
            lat > KUSHTIA_BOUNDS.south &&
            lat < KUSHTIA_BOUNDS.north &&
            lng > KUSHTIA_BOUNDS.west &&
            lng < KUSHTIA_BOUNDS.east
          ) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === "OK" && results?.[0]) {
                const location = {
                  address: results[0].formatted_address || value || "",
                  lat,
                  lng,
                };
                onChange(location);
                if (map && marker) {
                  map.setCenter({ lat, lng });
                  marker.setPosition({ lat, lng });
                }
              }
            });
          } else {
            alert("আপনার বর্তমান অবস্থান কুষ্টিয়া শহরের বাইরে!");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "অবস্থান নির্ধারণে সমস্যা হয়েছে। অনুগ্রহ করে ম্যানুয়ালি ঠিকানা লিখুন।"
          );
        }
      );
    }
  };

  console.log(autocomplete);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) =>
            onChange({ address: e.target.value, lat: 0, lng: 0 })
          }
          placeholder={placeholder}
          className={className}
        />
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={handleGetCurrentLocation}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
