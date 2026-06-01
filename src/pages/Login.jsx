import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Stethoscope, Eye, EyeOff, ArrowRight, Shield, Activity, Heart } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('dr.priya@mapmyhealth.in');
  const [password, setPassword] = useState('••••••••');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const login = useStore(s => s.login);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 900);
  };

  return (
    <div className="login-shell" style={{ display: 'flex', height: '100vh', fontFamily: 'var(--font)' }}>
      {/* Left Panel */}
      <div className="login-hero" style={{
        flex: 1,
        background: 'linear-gradient(145deg, #0D1B2A 0%, #0F2D4A 50%, #0D1B2A 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(14,165,233,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: 300, height: 300, background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '100px', right: '-60px', width: 260, height: 260, background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stethoscope size={20} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Map My Health</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>by Lifenity International</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#38BDF8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Doctor Portal</div>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: 'white', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 16 }}>
            The future of<br />
            <span style={{ background: 'linear-gradient(135deg, #38BDF8, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              clinical intelligence
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>
            Your complete consultation workspace — patient insights, prescriptions, and health analytics in one seamless experience.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
            {[
              { icon: Activity, text: 'Real-time vitals & trend analytics' },
              { icon: Shield, text: 'Intelligent patient risk scoring' },
              { icon: Heart, text: 'Seamless prescription workflow' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color="#38BDF8" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat cards */}
        <div className="login-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, position: 'relative', zIndex: 1 }}>
          {[
            { n: '1,847', label: 'Active Patients' },
            { n: '14 yrs', label: 'Experience' },
            { n: '4.9★', label: 'Patient Rating' },
          ].map(({ n, label }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="login-form-panel" style={{ width: 460, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', background: 'white' }}>
        <div style={{ width: '100%', maxWidth: 360, animation: 'fadeUp 0.4s ease' }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>Welcome back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Sign in to your doctor portal</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.02em' }}>EMAIL ADDRESS</label>
              <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ height: 44 }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>PASSWORD</label>
                <button style={{ fontSize: 12, color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</button>
              </div>
              <div style={{ position: 'relative' }}>
                <input className="input-field" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ height: 44, paddingRight: 40 }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 15, height: 15, accentColor: 'var(--accent-blue)', cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Remember me for 30 days</label>
            </div>

            <button className="btn btn-primary" onClick={handleLogin} disabled={loading}
              style={{ height: 46, width: '100%', justifyContent: 'center', fontSize: 14, fontWeight: 600, marginTop: 4, position: 'relative', letterSpacing: '0.01em' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M 8 2 A 6 6 0 0 1 14 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Sign In <ArrowRight size={16} /></span>
              )}
            </button>
          </div>

          {/* Demo hint */}
          <div style={{ marginTop: 28, padding: '14px 16px', background: '#F0F9FF', borderRadius: 10, border: '1px solid #BAE6FD' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#0369A1', marginBottom: 4 }}>DEMO CREDENTIALS</div>
            <div style={{ fontSize: 12, color: '#0369A1' }}>Email: dr.priya@mapmyhealth.in<br />Any password works</div>
          </div>

          <p style={{ marginTop: 24, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            By signing in, you agree to our{' '}
            <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Terms of Service</span>{' '}
            and{' '}
            <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
