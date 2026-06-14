import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0E0F12',
          color: '#F0EBE0',
          padding: '72px',
        }}
      >
        <div
          style={{
            color: '#C85D4E',
            fontSize: 28,
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          Book Summaries
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 34,
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 0.95,
          }}
        >
          <span>My</span>
          <span style={{ color: '#E8B85C', fontStyle: 'italic', fontWeight: 400 }}>
            Library
          </span>
        </div>
        <div
          style={{
            marginTop: 54,
            maxWidth: 760,
            color: 'rgba(240,235,224,0.72)',
            fontSize: 34,
            lineHeight: 1.35,
          }}
        >
          Practical ideas from the books that shaped how I work.
        </div>
      </div>
    ),
    size
  )
}
