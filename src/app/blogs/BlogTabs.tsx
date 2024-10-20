'use client'

import { useState } from 'react'
import { BlogData, BlogCategory } from '@/lib/redis'
import BlogList from './BlogList'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BlogTabs({ blogs }: { blogs: BlogData }) {
  const categories: BlogCategory[] = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'technologyMds']
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(categories[0])

  return (
    <div>
      {/* Mobile view: Dropdown */}
      <div className="md:hidden mb-6">
        <Select onValueChange={(value: string) => setSelectedCategory(value as BlogCategory)} defaultValue={selectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {capitalizeFirstLetter(category.replace('Mds', ''))}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop view: Tabs */}
      <div className="hidden md:block">
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as BlogCategory)}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category.replace('Mds', '')}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6">
        <BlogList blogs={blogs[selectedCategory]} category={selectedCategory} />
      </div>
    </div>
  )
}
