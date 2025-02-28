"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Users, Award, Clock } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "/images/logo/logo.png",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/images/logo/logo.png",
  },
  {
    name: "Emily Johnson",
    role: "COO",
    image: "/images/logo/logo.png",
  },
];

const stats = [
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    value: "১০০০+",
    label: "প্রোডাক্ট",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "৫০০০+",
    label: "সন্তুষ্ট গ্রাহক",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "৫",
    label: "বছরের অভিজ্ঞতা",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: "২৪/৭",
    label: "গ্রাহক সেবা",
  },
];

export default function AboutPage() {
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
              আমাদের সম্পর্কে
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              আপনার বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card text-card-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center text-primary mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card text-card-foreground rounded-xl shadow-lg p-8 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              আমাদের লক্ষ্য
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              আমাদের লক্ষ্য হল সেরা দামে সেরা পণ্য সরবরাহ করা, গ্রাহক সন্তুষ্টি
              এবং নির্বিঘ্ন কেনাকাটার অভিজ্ঞতা নিশ্চিত করা।
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            আমাদের দল
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card text-card-foreground p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            গ্রাহক মতামত
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                  &quot;
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Customer A
                  </h4>
                  <p className="text-muted-foreground">নিয়মিত গ্রাহক</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                &quot;এই প্ল্যাটফর্মটি আমার কেনাকাটার অভিজ্ঞতাকে রূপান্তরিত
                করেছে। গুণমান এবং পরিষেবা অতুলনীয়!&quot;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                  &quot;
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Customer B
                  </h4>
                  <p className="text-muted-foreground">নিয়মিত গ্রাহক</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                &quot;একটি দুর্দান্ত পণ্যের পরিসর এবং অসাধারণ গ্রাহক সহায়তা।
                অত্যন্ত সুপারিশ করছি!&quot;
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-primary text-primary-foreground py-16 px-4 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">আমাদের সাথে যুক্ত হোন</h2>
          <p className="text-lg mb-8 opacity-90">
            আমাদের যাত্রার অংশ হন এবং আমাদের বৈচিত্র্যময় পণ্যের পরিসর অন্বেষণ
            করুন।
          </p>
          <button className="bg-background text-primary font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            এখনই কেনাকাটা শুরু করুন
          </button>
        </motion.div>
      </div>
    </div>
  );
}
