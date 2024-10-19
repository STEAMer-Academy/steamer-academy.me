import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-4 text-4xl font-bold align-center leading-normal">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-3 text-3xl font-semibold leading-normal">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 text-2xl font-semibold leading-relaxed">{children}</h3>,
    p: ({ children }) => <p className="mb-4 align-left leading-loose">{children}</p>,
    a: ({ children }) => <a className="text-blue-600 hover:underline">{children}</a>,
    img: ({ alt, src, width, height }) => <img className="rounded-lg shadow-md align-center container hover:shadow-md" alt={alt} src={src} width={width} height={height} />,
    Image: (props: ImageProps) => <Image className="rounded-lg shadow-md align-center container hover:shadow-md" {...props} />,
    ...components,
  }
}
