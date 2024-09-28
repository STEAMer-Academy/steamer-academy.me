import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from '../components/Image'
import { motion } from 'framer-motion'
import '../styles/globals.css'
import React from 'react'

export default function About() {
  const teamMembers = [
    { name: "H. Mondal", role: "CEO & Founder", image: "/HmondalDiscordpfp.webp?height=200&width=200" },
    { name: "Muntasir Mahmud", role: "Chief Technology Officer", image: "/MuntasirDiscordpfp.webp?height=200&width=200" },
    { name: "Ayman", role: "Chief Education Officer", image: "/AymanDiscordpfp.webp?height=200&width=200" },
  ]

  return (
    <div className="space-y-16">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-8">About STEAMer Academy</h1>
          <p className="mb-4">At STEAMer, we&aposre passionate about igniting a love for Science, Technology, Engineering, Arts, and Math (STEAM) in young minds. Our mission is to create a dynamic learning environment that fosters creativity, critical thinking, and innovation.</p>
          <p className="mb-4">Through our engaging and interactive programs, STEAMer empowers young learners to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Discover the wonders of STEAM and make science exciting, engaging, and relevant.</li>
            <li>Develop critical thinking skills, be curious, and ask questions.</li>
            <li>Engage in hands-on learning experiences that encourage exploration and discovery.</li>
            <li>Foster collaboration and innovation: Teamwork is at the heart of our programs, where students learn to work together to solve problems.</li>
            <li>Build confidence and a sense of accomplishment through project-based learning.</li>
          </ul>
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto" />
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
