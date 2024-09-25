import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from '../components/Image'
import { motion } from 'framer-motion'
import React from 'react'
import '../styles/globals.css'

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative h-[600px]">
        <Image src="/placeholder.svg?height=600&width=1200" alt="A world of possibilities" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">A world of possibilities</h1>
            <p className="text-xl mb-8">STEAMer Academy is here to guide you on your learning journey</p>
            <Button size="lg">Get started</Button>
          </motion.div>
        </div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Learn with STEAMer</h2>
          <p className="mb-8">STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics. Our innovative approach combines hands-on learning with cutting-edge technology to prepare students for the challenges of tomorrow.</p>
          <Button variant="outline">Learn more</Button>
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">New arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Course Title {i}</CardTitle>
                  <CardDescription>Brief description of the course</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/placeholder.svg?height=200&width=300" alt={`Course ${i}`} width={300} height={200} className="rounded-lg" />
                </CardContent>
                <CardFooter>
                  <Button>Learn more</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Create anything</h2>
          <p className="mb-8">Join us on this exciting journey! Explore our website, contact us today to learn more, and let STEAMer become the launchpad for your child&aposs exploration and innovation!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold">150</h3>
              <p>Students enrolled</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">Eco</h3>
              <p>Friendly approach</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">10</h3>
              <p>Expert teachers</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Get new content delivered directly to your inbox</h2>
          <form className="flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit">Subscribe</Button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
