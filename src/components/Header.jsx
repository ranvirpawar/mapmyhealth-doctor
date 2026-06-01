import { Bell, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header({ title }) {
  const doctor = useStore(s => s.doctor);
  const unreadCount = useStore(s => s.unreadCount());

  return (
    <header className="app-header" style={{
      height: 60,
      padding: '0 24px',
      background: 'white',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div className="app-header-title">
        <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h1>
      </div>

      <div className="app-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Search - placeholder */}
        <div className="header-search" style={{ position: 'relative', width: 240 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search patients..."
            style={{ paddingLeft: 32, height: 36, fontSize: 13, width: '100%' }}
            className="input-field"
          />
        </div>

        {/* Notifications icon */}
        <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}>
          <Bell size={18} color="var(--text-muted)" />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -2, width: 16, height: 16,
              background: '#EF4444', borderRadius: '50%', fontSize: 10, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Doctor avatar */}
        <div className="header-doctor" style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid var(--border)' }}>
          <div className="avatar" style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 12, color: 'white' }}>
            {doctor.initials}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{doctor.name.split(' ')[0]}</div>
        </div>
      </div>
    </header>
  );
}
