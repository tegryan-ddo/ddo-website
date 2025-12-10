import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Digital DevOps - AI-Augmented AWS & DevOps Consulting'
export const size = {
  width: 1200,
  height: 600, // Twitter prefers 2:1 aspect ratio
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
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.1)',
            filter: 'blur(60px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70px',
                height: '70px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                marginRight: '18px',
              }}
            >
              {/* Layers icon representation */}
              <svg
                width="42"
                height="42"
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
                fontSize: '42px',
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
              fontSize: '28px',
              fontWeight: 500,
              background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '25px',
              textAlign: 'center',
            }}
          >
            AI-Augmented AWS & DevOps Consulting
          </div>

          {/* Value props */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#22d3ee' }}>70% Faster</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>AI-Powered Delivery</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#22d3ee' }}>Fixed Pricing</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Starting at $2,999</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#22d3ee' }}>Senior Only</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>10+ Years AWS</div>
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              fontSize: '18px',
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
