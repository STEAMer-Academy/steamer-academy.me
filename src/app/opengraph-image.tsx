import { ImageResponse } from 'next/og'
import Image from 'next/image'

export const runtime = 'edge'

export const alt = 'OpenGraph Image'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function ImageGen({ params }: { params: { slug: string } }) {
  const imageData = await fetch(new URL('../../public/Chemical Nord.webp', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )
  const faviconImageData = await fetch(new URL('../../public/favicon.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1e2530',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px',
        }}
      >
        <Image
          src={`data:image/webp;base64,${Buffer.from(imageData).toString('base64')}`}
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <Image
            src={`data:image/png;base64,${Buffer.from(faviconImageData).toString('base64')}`}
            alt="Favicon"
            style={{
              width: '80px',
              height: '80px',
              marginRight: '-40px',
              zIndex: 2,
            }}
          />
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              padding: '20px 20px 20px 60px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '20px',
            }}
          >
            Your Site Name
          </div>
        </div>
        <div
          style={{
            fontSize: '32px',
            color: 'white',
            maxWidth: '50%',
            textAlign: 'right',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          {params.slug ? `Page: ${params.slug}` : 'Where Innovation Meets Creativity'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
