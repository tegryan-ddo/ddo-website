import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Digital DevOps - AI-Augmented AWS & DevOps Consulting'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617', // slate-950
          backgroundImage: 'radial-gradient(ellipse at top, rgba(30, 64, 175, 0.3), transparent 50%)',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.1)',
            filter: 'blur(80px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                marginRight: '20px',
              }}
            >
              {/* Layers icon representation */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              Digital DevOps
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 500,
              background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            AI-Augmented AWS & DevOps Consulting
          </div>

          {/* Value props */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#22d3ee' }}>70%</div>
              <div style={{ fontSize: '16px', color: '#94a3b8' }}>Faster Delivery</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#22d3ee' }}>$2,999</div>
              <div style={{ fontSize: '16px', color: '#94a3b8' }}>Starting Price</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#22d3ee' }}>10+ Years</div>
              <div style={{ fontSize: '16px', color: '#94a3b8' }}>AWS Experience</div>
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            digitaldevops.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
