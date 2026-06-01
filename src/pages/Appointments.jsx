import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointments, patients } from '../data/mockData';
import AppLayout from '../layouts/AppLayout';
import { Video, MapPin, Zap, Calendar, Clock, Search } from 'lucide-react';

const tabs = ['All', 'Today', 'Upcoming', 'Completed'];

export default function Appointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Today');
  const [search, setSearch] = useState('');

  const today = "2025-05-12";
  const filtered = appointments.filter(a => {
    const patient = patients.find(p => p.id === a.patientId);
    const matchSearch = !search || patient?.name.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeTab === 'Today') return a.date === today;
    if (activeTab === 'Upcoming') return a.date >= today;
    if (activeTab === 'Completed') return a.status === 'completed';
    return true;
  });

  return (
    <AppLayout title="Appointments">
      <div className="page-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Appointments</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{appointments.length} total · {appointments.filter(a => a.date === today).length} today</p>
        </div>
        <button className="btn btn-primary">
          <Calendar size={14} /> New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="card filters-bar" style={{ padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="segmented-control" style={{ display: 'flex', gap: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: activeTab === t ? 600 : 400,
              background: activeTab === t ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === t ? 'white' : 'var(--text-muted)',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div className="filter-search" style={{ position: 'relative', width: 220 }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" style={{ paddingLeft: 28, height: 34, fontSize: 12 }} placeholder="Search patient..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* List */}
      <div className="card responsive-list-card" style={{ overflow: 'hidden' }}>
        {/* Header */}
        <div className="table-header appointment-list-header" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px', gap: 12, padding: '10px 18px', background: 'var(--bg-page)', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span>Patient</span><span>Date & Time</span><span>Type</span><span>Mode</span><span>Priority</span><span>Action</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Calendar size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div>No appointments found</div>
          </div>
        ) : filtered.map((apt, i) => {
          const patient = patients.find(p => p.id === apt.patientId);
          return (
            <div key={apt.id}
              className="appointment-list-row animate-fade-up"
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px', gap: 12, padding: '14px 18px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s', animationDelay: `${i * 0.04}s` }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
              onClick={() => navigate(`/appointments/${apt.id}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 12, color: 'white' }}>{patient?.initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{patient?.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{patient?.age}y · {patient?.conditions[0]}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={11} color="var(--text-muted)" /> {apt.time}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{apt.date}</div>
              </div>

              <div>
                <span style={{ fontSize: 12, background: '#F5F3FF', color: '#6D28D9', padding: '2px 8px', borderRadius: 6, fontWeight: 500 }}>{apt.type}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {apt.mode === 'Video' ? <Video size={13} color="#1D4ED8" /> : <MapPin size={13} color="#16A34A" />}
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{apt.mode}</span>
              </div>

              <span className={`badge badge-${apt.priority}`}>{apt.priority}</span>

              <div className="row-actions" style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: 11 }} onClick={e => { e.stopPropagation(); navigate(`/appointments/${apt.id}`); }}>Details</button>
                <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 11 }} onClick={e => { e.stopPropagation(); navigate(`/consultation/${apt.id}`); }}>
                  <Zap size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
