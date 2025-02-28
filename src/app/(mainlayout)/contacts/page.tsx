"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const kushtiaLocation = {
  lat: 23.9088,
  lng: 89.122,
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "ফোন",
    info: "+880 1234-567890",
    description: "সোম - শনি, সকাল ৯টা - রাত ৯টা",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "ইমেইল",
    info: "info@kushtiakachabazaar.com",
    description: "যেকোনো সময় মেইল করুন",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "ঠিকানা",
    info: "কুষ্টিয়া, বাংলাদেশ",
    description: "আমাদের শোরুম দেখতে আসুন",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "কার্যক্রমের সময়",
    info: "সকাল ৯টা - রাত ৯টা",
    description: "সপ্তাহে ৭ দিন খোলা",
  },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Handle form submission here
      console.log(values);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              যোগাযোগ করুন
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              আপনার যেকোনো প্রয়োজনে আমরা আছি আপনার পাশে
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card text-card-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.info}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card text-card-foreground p-4 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              মেসেজ পাঠান
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>নাম</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="আপনার নাম"
                            className="focus:ring-2 focus:ring-primary/20 bg-background text-foreground border-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ইমেইল</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="আপনার ইমেইল"
                            className="focus:ring-2 focus:ring-primary/20 bg-background text-foreground border-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>বিষয়</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="মেসেজের বিষয়"
                          className="focus:ring-2 focus:ring-primary/20 bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>মেসেজ</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="আপনার মেসেজ লিখুন"
                          className="min-h-[100px] focus:ring-2 focus:ring-primary/20 bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "পাঠানো হচ্ছে..."
                  ) : (
                    <span className="flex items-center justify-center">
                      পাঠান
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center"
                  >
                    আপনার মেসেজ সফলভাবে পাঠানো হয়েছে!
                  </motion.p>
                )}
              </form>
            </Form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-card text-card-foreground p-4 rounded-xl shadow-lg">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={kushtiaLocation}
                options={{
                  styles: [
                    {
                      featureType: "all",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#7c93a3" }],
                    },
                    {
                      featureType: "administrative",
                      elementType: "geometry",
                      stylers: [{ visibility: "on" }],
                    },
                    {
                      featureType: "water",
                      elementType: "geometry.fill",
                      stylers: [{ color: "#e1e9ef" }],
                    },
                  ],
                }}
              >
                <MarkerF position={kushtiaLocation} />
              </GoogleMap>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
