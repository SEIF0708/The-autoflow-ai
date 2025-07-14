import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            localStorage.setItem('token', data.token);
            // Redirect to dashboard (adjust path as needed)
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
            overflowX: 'hidden',
        }}>
            {/* Animated background shapes */}
            <div className="bg-shapes" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}>
                <div className="shape" style={{ position: 'absolute', opacity: 0.1, top: '10%', left: '10%', width: 80, height: 80, background: 'white', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }} />
                <div className="shape" style={{ position: 'absolute', opacity: 0.1, top: '20%', right: '10%', width: 60, height: 60, background: 'white', borderRadius: 12, animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }} />
                <div className="shape" style={{ position: 'absolute', opacity: 0.1, bottom: '20%', left: '20%', width: 100, height: 100, background: 'white', borderRadius: '50%', animation: 'float 6s ease-in-out infinite', animationDelay: '4s' }} />
                <div className="shape" style={{ position: 'absolute', opacity: 0.1, bottom: '30%', right: '20%', width: 40, height: 40, background: 'white', borderRadius: 8, animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }} />
            </div>
            <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .login-container { animation: slideUp 0.8s ease-out; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
            <div className="login-container" style={{
                background: 'white',
                borderRadius: 24,
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                padding: '3rem 2.5rem',
                width: '100%',
                maxWidth: 420,
                position: 'relative',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
            }}>
                <div className="logo-section" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div className="logo-icon" style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', boxShadow: '0 8px 20px rgba(102,126,234,0.3)' }}>
                            <span role="img" aria-label="logo">🚀</span>
                        </div>
                        <span className="logo-text" style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>AutoFlow</span>
                    </div>
                    <div className="welcome-text" style={{ color: '#64748b', fontSize: '1rem', fontWeight: 400 }}>
                        Welcome back! Please sign in to your account.
                    </div>
                </div>
                <form className="form-section" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            className="form-input"
                            style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: 12, fontSize: '1rem', fontWeight: 400, color: '#374151', background: '#f9fafb', transition: 'all 0.3s ease' }}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            className="form-input"
                            style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: 12, fontSize: '1rem', fontWeight: 400, color: '#374151', background: '#f9fafb', transition: 'all 0.3s ease' }}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="forgot-password" style={{ textAlign: 'right', marginBottom: '2rem' }}>
                        <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Forgot password?</a>
                    </div>
                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                    <button className="login-button" type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '1rem', borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(102,126,234,0.3)', marginBottom: '1.5rem' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem' }}>
                    Don&apos;t have an account? <a href="/signup" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>Sign Up</a>
                </div>
            </div>
        </div>
    );
} 