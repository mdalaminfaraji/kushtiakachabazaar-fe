"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PhoneInputForm({
  onSubmit,
}: {
  onSubmit: (phone: string) => void;
}) {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">আপনার মোবাইল নাম্বার</h2>
      <Input
        type="tel"
        placeholder="আপনার মোবাইল নাম্বার"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        onClick={() => onSubmit(phone)}
      >
        এগিয়ে যান
      </Button>
      <p className="text-sm text-gray-500 mt-2">
        এই নাম্বারে একটি ভেরিফিকেশন কোড পাঠানো হবে
      </p>
    </div>
  );
}
