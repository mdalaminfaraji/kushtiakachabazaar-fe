"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OtpVerificationForm({
  phone,
  onVerify,
}: {
  phone: string;
  onVerify: (otp: string) => void;
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">
        মোবাইল নাম্বার ভেরিফাই করুন
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        {phone} নাম্বরে ভেরিফিকেশন কোড পাঠানো হয়েছে
      </p>

      <div className="flex space-x-2">
        {otp.map((num, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border rounded-md"
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>

      <Button
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        onClick={() => onVerify(otp.join(""))}
      >
        সাবমিট করুন
      </Button>

      <p className="text-sm text-gray-500 mt-2">পুনরায় কোড {19} সেকেন্ড</p>
    </div>
  );
}
