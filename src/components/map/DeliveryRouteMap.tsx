/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Navigation } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface DeliveryRouteMapProps {
  sellerLocation: Location;
  customerLocation: Location;
  onStartDelivery?: () => void;
  onCompleteDelivery?: () => void;
  deliveryStatus?: "pending" | "in_progress" | "completed";
}

// Transportation modes
const transportModes = [
  { value: "DRIVING", label: "গাড়ি" },
  { value: "WALKING", label: "হেঁটে" },
  { value: "BICYCLING", label: "সাইকেল" },
  { value: "TRANSIT", label: "গণপরিবহন" },
];

// Libraries to load
const libraries: Libraries = ["places"];

const DeliveryRouteMap: React.FC<DeliveryRouteMapProps> = ({
  sellerLocation,
  customerLocation,
  onStartDelivery,
  onCompleteDelivery,
  deliveryStatus = "pending",
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [travelMode, setTravelMode] = useState<string>("DRIVING");
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState({
    lat: (sellerLocation.lat + customerLocation.lat) / 2,
    lng: (sellerLocation.lng + customerLocation.lng) / 2,
  });

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  // Get travel mode based on string
  const getTravelMode = useCallback(
    (modeString: string): google.maps.TravelMode => {
      if (!isLoaded) return google.maps.TravelMode.DRIVING;

      switch (modeString) {
        case "WALKING":
          return google.maps.TravelMode.WALKING;
        case "BICYCLING":
          return google.maps.TravelMode.BICYCLING;
        case "TRANSIT":
          return google.maps.TravelMode.TRANSIT;
        default:
          return google.maps.TravelMode.DRIVING;
      }
    },
    [isLoaded]
  );

  // Calculate route between seller and customer
  const calculateRoute = useCallback(
    async (modeString: string) => {
      if (!isLoaded) return;

      setIsLoading(true);
      setError(null);

      const mode = getTravelMode(modeString);
      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await directionsService.route({
          origin: { lat: sellerLocation.lat, lng: sellerLocation.lng },
          destination: { lat: customerLocation.lat, lng: customerLocation.lng },
          travelMode: mode,
        });

        // Set directions result
        setDirections(result);

        // Extract and format distance and duration
        if (result.routes[0]?.legs[0]) {
          setDistance(result.routes[0].legs[0].distance?.text || null);
          setDuration(result.routes[0].legs[0].duration?.text || null);
        }

        // // Adjust map center to fit the route
        // const bounds = new google.maps.LatLngBounds();
        // bounds.extend({ lat: sellerLocation.lat, lng: sellerLocation.lng });
        // bounds.extend({ lat: customerLocation.lat, lng: customerLocation.lng });

        // Calculate center of the bounds
        setCenter({
          lat: (sellerLocation.lat + customerLocation.lat) / 2,
          lng: (sellerLocation.lng + customerLocation.lng) / 2,
        });
      } catch (err: any) {
        console.error("Error calculating route:", err);
        setError("রুট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, sellerLocation, customerLocation, getTravelMode]
  );

  // Calculate initial route when component loads
  useEffect(() => {
    if (isLoaded) {
      // Use a timeout to ensure Google Maps API is fully loaded
      const timer = setTimeout(() => {
        calculateRoute(travelMode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, calculateRoute, travelMode]);

  // Handle travel mode change
  const handleTravelModeChange = (value: string) => {
    setTravelMode(value);
    calculateRoute(value);
  };

  // Get current user location (seller's location)
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Here you could update seller location if needed
          console.log("Current location:", userLocation);
          // For now, just recenter the map
          setCenter(userLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <Card className="p-4 w-full">
      {/* Header with info */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">ডেলিভারি রুট</h3>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium">বিক্রেতার অবস্থান:</p>
            <p className="text-sm text-gray-600 truncate">
              {sellerLocation.address}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">ক্রেতার অবস্থান:</p>
            <p className="text-sm text-gray-600 truncate">
              {customerLocation.address}
            </p>
          </div>
        </div>

        {distance && duration && (
          <div className="bg-primary/10 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">
                  দূরত্ব: <span className="text-primary">{distance}</span>
                </p>
                <p className="text-sm font-medium">
                  সময়: <span className="text-primary">{duration}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Select
                  defaultValue="DRIVING"
                  onValueChange={handleTravelModeChange}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="যানবাহন" />
                  </SelectTrigger>
                  <SelectContent>
                    {transportModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={getCurrentLocation}
                  title="আমার অবস্থান"
                >
                  <Navigation />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="h-[400px] w-full border rounded-md mb-4 relative">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={13}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Seller Marker */}
          <Marker
            position={{ lat: sellerLocation.lat, lng: sellerLocation.lng }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
          />

          {/* Customer Marker */}
          <Marker
            position={{ lat: customerLocation.lat, lng: customerLocation.lng }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#ef4444",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
          />

          {/* Directions */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#3b82f6",
                  strokeWeight: 5,
                  strokeOpacity: 0.7,
                },
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>রুট লোড হচ্ছে...</span>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {deliveryStatus === "pending" && onStartDelivery && (
          <Button onClick={onStartDelivery} className="flex-1">
            ডেলিভারি শুরু করুন
          </Button>
        )}

        {deliveryStatus === "in_progress" && onCompleteDelivery && (
          <Button onClick={onCompleteDelivery} className="flex-1">
            ডেলিভারি সম্পন্ন করুন
          </Button>
        )}

        {deliveryStatus === "completed" && (
          <Button disabled className="flex-1 bg-green-600 hover:bg-green-700">
            ডেলিভারি সম্পন্ন হয়েছে
          </Button>
        )}
      </div>
    </Card>
  );
};

export default DeliveryRouteMap;
