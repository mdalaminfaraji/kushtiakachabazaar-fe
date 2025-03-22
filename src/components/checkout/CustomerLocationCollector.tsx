"use client";

import React, { useState } from "react";
import LocationPicker from "@/components/map/LocationPicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Check } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface CustomerLocationCollectorProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
  className?: string;
}

const CustomerLocationCollector: React.FC<CustomerLocationCollectorProps> = ({
  onLocationSelect,
  initialLocation,
  className
}) => {
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [savedLocation, setSavedLocation] = useState<Location | undefined>(initialLocation);

  const handleLocationSave = (location: Location) => {
    setSavedLocation(location);
    onLocationSelect(location);
    setIsPickingLocation(false);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle className="text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          ডেলিভারি ঠিকানা
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {!isPickingLocation ? (
          <div>
            {savedLocation ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-50 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">আপনার সংরক্ষিত ঠিকানা</h4>
                    <p className="text-sm text-gray-600 mt-1">{savedLocation.address}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      অক্ষাংশ: {savedLocation.lat.toFixed(6)}, দ্রাঘিমাংশ: {savedLocation.lng.toFixed(6)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPickingLocation(true)}
                    className="flex-1"
                  >
                    ঠিকানা পরিবর্তন করুন
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 border border-dashed rounded-md bg-gray-50 text-center">
                  <MapPin className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">আপনার ডেলিভারি ঠিকানা সেট করুন</p>
                  <p className="text-xs text-gray-500 mt-1">
                    সঠিক ডেলিভারির জন্য আপনার সঠিক অবস্থান দেওয়া গুরুত্বপূর্ণ
                  </p>
                </div>
                <Button
                  onClick={() => setIsPickingLocation(true)}
                  className="w-full"
                >
                  ঠিকানা যোগ করুন
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPickingLocation(false)}
                className="text-sm"
              >
                ফিরে যান
              </Button>
              <div className="flex-1 text-center text-sm font-medium">
                আপনার অবস্থান নির্বাচন করুন
              </div>
            </div>
            <LocationPicker
              onSaveLocation={handleLocationSave}
              initialLocation={savedLocation}
              buttonLabel="এই ঠিকানা ব্যবহার করুন"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerLocationCollector;
