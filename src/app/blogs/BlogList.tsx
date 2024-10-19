'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Blog {
  name: string
  description: string
  rawUrl: string
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Record<string, Blog[]>>({})

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  return (
    <div>
      {Object.entries(blogs).map(([category, categoryBlogs]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category.replace('Mds', '')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBlogs.map((blog: Blog) => (
              <Link href={`/blogs/${encodeURIComponent(blog.name)}`} key={blog.name} className="block">
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{blog.name}</h3>
                  <p className="text-gray-600">{blog.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
