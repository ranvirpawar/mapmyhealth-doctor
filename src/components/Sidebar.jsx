import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard, CalendarDays, Users, FileText,
  Bell, Settings, LogOut, Stethoscope,
  ChevronLeft, Pill
} from 'lucide-react';

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/appointments', icon: CalendarDays, label: 'Appointments' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/prescriptions', icon: Pill, label: 'Prescriptions' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: true },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { doctor, sidebarCollapsed, toggleSidebar, logout, notifications } = useStore();
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <aside className="sidebar" style={{
      width: sidebarCollapsed ? '68px' : '240px',
      minWidth: sidebarCollapsed ? '68px' : '240px',
      height: '100vh',
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
      borderRight: '1px solid var(--border)',
    }}>
      {/* Logo */}
      <div className="sidebar-brand" style={{ padding: sidebarCollapsed ? '20px 16px' : '20px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', flexShrink: 0, justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
        {sidebarCollapsed ? (
          <button
            onClick={toggleSidebar}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            title="Expand sidebar"
          >
            {doctor.initials}
          </button>
        ) : (
          <>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Stethoscope size={17} color="white" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap' }}>Map My Health</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 400, whiteSpace: 'nowrap' }}>Doctor Portal</div>
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav" style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', overflowX: 'hidden' }}>
        {nav.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} className="sidebar-link" style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: sidebarCollapsed ? '10px 12px' : '9px 12px',
            borderRadius: 10,
            color: isActive ? '#0EA5E9' : 'var(--text-secondary)',
            background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: isActive ? 600 : 400,
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            position: 'relative',
          })}
            onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.background = 'var(--bg-page)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
            onMouseLeave={e => { if (!e.currentTarget.style.background?.includes('0.08')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Icon size={17} />
              {badge && unread > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, background: '#EF4444', borderRadius: '50%', fontSize: 8, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>
              )}
            </div>
            {!sidebarCollapsed && <span className="sidebar-link-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Doctor */}
      {!sidebarCollapsed && (
        <div className="sidebar-doctor" style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>
            {doctor.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: 'var(--text-primary)', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Internal Medicine</div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 6, transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <LogOut size={14} />
          </button>
        </div>
      )}

      {/* Toggle - Only show when expanded */}
      {!sidebarCollapsed && (
        <button className="sidebar-toggle" onClick={toggleSidebar} style={{
          position: 'absolute', top: 22, right: -2, width: 24, height: 24,
          background: '#FFFFFF', border: '1px solid var(--border)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)', zIndex: 10, transition: 'all 0.15s', boxShadow: 'var(--shadow-sm)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0EA5E9'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#0EA5E9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <ChevronLeft size={12} />
        </button>
      )}
    </aside>
  );
}
