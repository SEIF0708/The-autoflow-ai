import React, { useState } from 'react';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Sign up failed');
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            fontFamily: 'Poppins, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            backgroundSize: '400% 400%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            animation: 'gradientShift 15s ease infinite',
        }}>
            <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .signup-container { animation: slideUp 0.6s ease-out; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
            <div className="signup-container" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 24,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                padding: 40,
                width: '100%',
                maxWidth: 440,
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10,
            }}>
                <div className="logo-section" style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div className="logo-icon" style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #00C2FF 0%, #D6336C 100%)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 20 }}>
                            <span role="img" aria-label="logo">🚀</span>
                        </div>
                        <span className="logo-text" style={{ fontSize: 28, fontWeight: 700, color: '#2D3748' }}>AutoFlow</span>
                    </div>
                    <div className="tagline" style={{ color: '#718096', fontSize: 16, fontWeight: 400 }}>
                        Create your account to get started.
                    </div>
                </div>
                <div className="form-title" style={{ fontSize: 24, fontWeight: 600, color: '#2D3748', textAlign: 'center', marginBottom: 32 }}>
                    Sign Up
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group" style={{ marginBottom: 24 }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: 8, color: '#4A5568', fontWeight: 500, fontSize: 14 }}>Name</label>
                        <input
                            className="form-input"
                            style={{ width: '100%', padding: '16px 20px', border: '2px solid #E2E8F0', borderRadius: 16, fontSize: 16, fontFamily: 'Poppins, sans-serif', background: '#FAFAFA', transition: 'all 0.3s ease', outline: 'none' }}
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 24 }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: 8, color: '#4A5568', fontWeight: 500, fontSize: 14 }}>Email</label>
                        <input
                            className="form-input"
                            style={{ width: '100%', padding: '16px 20px', border: '2px solid #E2E8F0', borderRadius: 16, fontSize: 16, fontFamily: 'Poppins, sans-serif', background: '#FAFAFA', transition: 'all 0.3s ease', outline: 'none' }}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 24 }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: 8, color: '#4A5568', fontWeight: 500, fontSize: 14 }}>Password</label>
                        <input
                            className="form-input"
                            style={{ width: '100%', padding: '16px 20px', border: '2px solid #E2E8F0', borderRadius: 16, fontSize: 16, fontFamily: 'Poppins, sans-serif', background: '#FAFAFA', transition: 'all 0.3s ease', outline: 'none' }}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                        />
                        <div className="password-requirements" style={{ fontSize: 12, color: '#718096', marginTop: 6, opacity: 1 }}>
                            At least 6 characters.
                        </div>
                    </div>
                    {error && <div className="error-message show" style={{ color: '#E53E3E', fontSize: 12, marginTop: 6, marginBottom: 12 }}>{error}</div>}
                    <button className="submit-btn" type="submit" style={{ width: '100%', padding: 18, background: 'linear-gradient(135deg, #00C2FF 0%, #D6336C 100%)', color: 'white', border: 'none', borderRadius: 50, fontSize: 16, fontWeight: 600, fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(0,194,255,0.3)', marginBottom: 24 }} disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="login-link" style={{ textAlign: 'center', color: '#718096', fontSize: 14 }}>
                    Already have an account? <a href="/login" style={{ color: '#00C2FF', fontWeight: 500, textDecoration: 'none' }}>Sign In</a>
                </div>
            </div>
        </div>
    );
} 