/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { auth } from "@/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  strapiToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setStrapiToken: (token: string | null) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      strapiToken: null,
      loading: false,
      error: null,

      setStrapiToken: (token) => set({ strapiToken: token }),
      setError: (error) => set({ error }),

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseToken = await userCredential.user.getIdToken();

          // Exchange Firebase token for Strapi token
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/firebase-exchange`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firebaseToken }),
            }
          );

          if (!response.ok) throw new Error("Failed to get Strapi token");

          const data = await response.json();
          set({
            user: userCredential.user,
            strapiToken: data.jwt,
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      register: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseToken = await userCredential.user.getIdToken();

          // Exchange Firebase token for Strapi token
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/firebase-exchange`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firebaseToken }),
            }
          );

          if (!response.ok) throw new Error("Failed to get Strapi token");

          const data = await response.json();
          set({
            user: userCredential.user,
            strapiToken: data.jwt,
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        try {
          set({ loading: true, error: null });
          const provider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, provider);
          const firebaseToken = await userCredential.user.getIdToken();

          // Exchange Firebase token for Strapi token
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/firebase-exchange`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firebaseToken }),
            }
          );

          if (!response.ok) throw new Error("Failed to get Strapi token");

          const data = await response.json();
          set({
            user: userCredential.user,
            strapiToken: data.jwt,
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, strapiToken: null, error: null });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
