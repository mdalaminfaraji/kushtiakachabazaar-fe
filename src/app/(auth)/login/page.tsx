/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import PhoneInputForm from "@/components/auth-component/PhoneInputForm";
// import OtpVerificationForm from "@/components/auth-component/OtpVerificationForm";
// import {
//   auth,
//   setupRecaptcha,
//   googleProvider,
//   facebookProvider,
// } from "../../../firebase";
// import {
//   signInWithPhoneNumber,
//   signInWithPopup,
//   PhoneAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";

// export default function LoginPage() {
//   const [step, setStep] = useState<"phone" | "otp" | "login">("login");
//   const [phone, setPhone] = useState("");
//   const [verificationId, setVerificationId] = useState("");

//   const handlePhoneSubmit = async (phoneNumber: string) => {
//     // Validate Bangladeshi phone number (must start with 01 and be 11 digits)
//     const phoneRegex = /^01[3-9]\d{8}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       toast.error("দয়া করে সঠিক মোবাইল নাম্বার দিন");
//       return;
//     }

//     try {
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         `+88${phoneNumber}`
//       );
//       setVerificationId(confirmationResult.verificationId);
//       setPhone(phoneNumber);
//       setStep("otp");
//       toast.success("ভেরিফিকেশন কোড পাঠানো হয়েছে");
//     } catch (error) {
//       console.error("Error during phone number sign-in:", error);
//       toast.error("একটি সমস্যা হয়েছে, আবার চেষ্টা করুন");
//     }
//   };

//   const handleOtpVerify = async (otp: string) => {
//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       toast.success("সফলভাবে লগইন হয়েছে");
//       // Redirect or update authentication state here
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       toast.error("ভুল ভেরিফিকেশন কোড");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       console.log("Google User: ", user);
//       // Proceed to phone verification if needed
//       setStep("phone");
//     } catch (error) {
//       console.error("Google login error: ", error);
//       toast.error("Google login failed");
//     }
//   };

//   const handleFacebookLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       const user = result.user;
//       console.log("Facebook User: ", user);
//       // Proceed to phone verification if needed
//       setStep("phone");
//     } catch (error) {
//       console.error("Facebook login error: ", error);
//       toast.error("Facebook login failed");
//     }
//   };

//   useEffect(() => {
//     if (step === "phone" && typeof window !== "undefined") {
//       setTimeout(() => {
//         setupRecaptcha("recaptcha-container");
//       }, 500); // 500ms delay
//     }
//   }, [step]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
//       <div id="recaptcha-container" className="bg-red-100 w-4 h-4"></div>
//       {step === "phone" ? (
//         <PhoneInputForm onSubmit={handlePhoneSubmit} />
//       ) : step === "otp" ? (
//         <OtpVerificationForm phone={phone} onVerify={handleOtpVerify} />
//       ) : (
//         <div className="flex flex-col space-y-4">
//           <Button
//             className="bg-blue-600 text-white"
//             onClick={handleGoogleLogin}
//           >
//             Login with Google
//           </Button>
//           <Button
//             className="bg-blue-800 text-white"
//             onClick={handleFacebookLogin}
//           >
//             Login with Facebook
//           </Button>
//           <Button
//             className="bg-green-600 text-white"
//             onClick={() => setStep("phone")}
//           >
//             Login with Phone Number
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../../firebase.config";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const sendOTP = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      console.log("Confirmation Result:", confirmation);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      if (confirmationResult) {
        const result = await confirmationResult.confirm(otp);
        const user = result.user;
        console.log("User verified:", user);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Phone Authentication</h2>
      <input
        type="text"
        placeholder="+8801234567890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={sendOTP}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2 rounded mt-2"
      />
      <button
        onClick={verifyOTP}
        className="bg-green-500 text-white px-4 py-2 rounded ml-2"
      >
        Verify OTP
      </button>

      <div id="recaptcha-container"></div>
    </div>
  );
}
