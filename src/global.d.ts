/* eslint-disable @typescript-eslint/no-explicit-any */
// src/global.d.ts
declare global {
  interface Window {
    recaptchaVerifier: any; // You can specify a more precise type if needed
  }
}

export {};
