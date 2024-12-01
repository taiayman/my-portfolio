'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const profiles = [
  {
    id: 1,
    name: "Ayman Tai",
    role: "Full Stack Developer",
    image: "/profile2.jpg",
    bio: "Passionate full-stack developer with expertise in web and mobile development. Specialized in creating scalable applications using modern technologies.",
    skills: [
      "React/Next.js",
      "Node.js",
      "Flutter",
      "Firebase",
      "MongoDB",
      "TypeScript",
      "TailwindCSS",
      "Git"
    ],
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Happy Clients", value: "30+" }
    ]
  },
  {
    id: 2,
    name: "Ayman T.",
    role: "UI/UX Designer",
    image: "/profile1.jpg",
    bio: "Creative UI/UX designer focused on creating beautiful and functional user experiences. Combining aesthetics with usability to deliver exceptional digital products.",
    skills: [
      "Figma",
      "Adobe XD",
      "UI Design",
      "UX Research",
      "Prototyping",
      "Wireframing",
      "Design Systems",
      "User Testing"
    ],
    stats: [
      { label: "UI/UX Projects", value: "40+" },
      { label: "Design Systems", value: "15+" },
      { label: "Client Reviews", value: "4.9/5" }
    ]
  }
];

export default function AboutPage() {
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <section id="about" className="min-h-screen bg-[#faf5f0]">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-[#1a1a1a]">About Me</h2>
          <p className="text-xl text-[#1a1a1a]/70 max-w-2xl mx-auto">
            Passionate about creating innovative digital solutions and beautiful user experiences.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-16">
          {profiles.map((profile, index) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(index)}
              className={`px-6 py-2 rounded-full font-medium border transition-colors duration-300 ${
                activeProfile === index
                  ? 'bg-[#1a1a1a] text-[#faf5f0] border-[#1a1a1a]'
                  : 'bg-[#faf5f0] text-[#1a1a1a] border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'
              }`}
            >
              {profile.role}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square w-full max-w-md mx-auto"
              >
                <div className="relative h-full w-full rounded-full overflow-hidden border border-[#1a1a1a]/10">
                  <Image
                    src={profiles[activeProfile].image}
                    alt={profiles[activeProfile].name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              key={activeProfile}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 text-[#1a1a1a]">{profiles[activeProfile].name}</h3>
                <p className="text-[#1a1a1a]/70 text-lg">{profiles[activeProfile].role}</p>
              </div>

              <p className="text-[#1a1a1a]/70">{profiles[activeProfile].bio}</p>

              <div className="grid grid-cols-3 gap-6">
                {profiles[activeProfile].stats.map((stat) => (
                  <div key={stat.label} className="border border-[#1a1a1a]/10 p-4">
                    <div className="text-2xl font-bold mb-1 text-[#1a1a1a]">{stat.value}</div>
                    <div className="text-sm text-[#1a1a1a]/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-[#1a1a1a]">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {profiles[activeProfile].skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[#1a1a1a]/10 text-[#1a1a1a]/70 px-4 py-2 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 