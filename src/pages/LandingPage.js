import React from 'react';

export default function LandingPage() {
    return (
        <div style={{
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            color: '#fff',
            background: '#0a0a0a',
            minHeight: '100vh',
            paddingTop: 64,
        }}>
            <div className="hero" style={{
                color: 'white',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
            }}>
                {/* Animated blobs (simplified for React) */}
                <div className="optical-waves" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="blob" style={{
                            position: 'absolute',
                            width: 80, height: 80,
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '50%',
                            opacity: 0.2,
                            left: `${10 + i * 10}%`,
                            top: `${10 + (i % 4) * 15}%`,
                            filter: 'blur(1px)',
                            zIndex: 0,
                        }} />
                    ))}
                </div>
                <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 24, letterSpacing: '-2px', lineHeight: 1.1 }}>
                        AutoFlow AI
                    </h1>
                    <p style={{ fontSize: 22, color: '#b3b3b3', marginBottom: 40 }}>
                        Supercharge your e-commerce with AI-powered automation, analytics, and communication tools.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                        <a href="/login" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '16px 40px',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 18,
                            textDecoration: 'none',
                            boxShadow: '0 8px 24px rgba(102,126,234,0.2)',
                            transition: 'all 0.2s',
                        }}>Sign In</a>
                        <a href="/signup" style={{
                            background: 'linear-gradient(135deg, #00C2FF 0%, #D6336C 100%)',
                            color: 'white',
                            padding: '16px 40px',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 18,
                            textDecoration: 'none',
                            boxShadow: '0 8px 24px rgba(0,194,255,0.2)',
                            transition: 'all 0.2s',
                        }}>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
} 