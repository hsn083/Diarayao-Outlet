import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// This icon route serves a custom icon to override Next.js default icon generation
// The actual Diarayao logo is at /favicon.png in the public folder
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom right, #F43F7E, #EC4899)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px',
        }}
      >
        D
      </div>
    ),
    {
      ...size,
    }
  )
}
