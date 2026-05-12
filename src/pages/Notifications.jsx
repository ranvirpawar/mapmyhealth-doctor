import { useStore } from '../store/useStore';
import AppLayout from '../layouts/AppLayout';
import { Bell, AlertTriangle, Calendar, FileText } from 'lucide-react';

export default function Notifications() {
  const { notifications, markNotificationRead } = useStore();

  const getIcon = (type) => {
    if (type === 'alert') return <AlertTriangle size={16} color="#EF4444" />;
    if (type === 'reminder') return <Calendar size={16} color="#0EA5E9" />;
    return <FileText size={16} color="#8B5CF6" />;
  };

  return (
    <AppLayout title="Notifications">
      <div className="card" style={{ overflow: 'hidden' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            <Bell size={32} opacity={0.3} />
            <div>No notifications</div>
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} onClick={() => markNotificationRead(n.id)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16,
              borderBottom: '1px solid var(--border)',
              background: n.read ? 'white' : '#F0F9FF',
              cursor: 'pointer',
              transition: 'background 0.1s'
            }}>
              <div>{getIcon(n.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{n.message}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0EA5E9' }} />}
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}