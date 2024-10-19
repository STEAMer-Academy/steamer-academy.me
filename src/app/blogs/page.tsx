import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const BlogList = dynamic(() => import('./BlogList'))

export const revalidate = 3600 // Revalidate every hour

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">STEAMer Academy Blogs</h1>
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogList />
      </Suspense>
    </div>
  )
}
