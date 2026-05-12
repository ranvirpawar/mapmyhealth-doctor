import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { useStore } from '../store/useStore';
import { patients, appointments, weeklyStats, notifications } from '../data/mockData';
import AppLayout from '../layouts/AppLayout';
import {
  Users, CalendarCheck, AlertTriangle, TrendingUp,
  Clock, Video, MapPin, ChevronRight, Activity, Zap
} from 'lucide-react';

const riskColors = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' };

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="card animate-fade-up" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={color} />
        </div>
        {trend && (
          <span style={{ fontSize: 11, fontWeight: 600, color: trend > 0 ? '#10B981' : '#EF4444', background: trend > 0 ? '#F0FDF4' : '#FEF2F2', padding: '2px 7px', borderRadius: 99 }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function RiskBar({ label, value, total, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: 'var(--bg-page)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${(value / total) * 100}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', width: 20, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const today = "2025-05-12";
  const todayApts = appointments.filter(a => a.date === today);
  const highRisk = patients.filter(p => p.riskLevel === 'high');
  const alerts = notifications.filter(n => !n.read && n.type === 'alert');

  const riskDist = [
    { label: 'High', value: patients.filter(p => p.riskLevel === 'high').length, color: '#EF4444' },
    { label: 'Medium', value: patients.filter(p => p.riskLevel === 'medium').length, color: '#F59E0B' },
    { label: 'Low', value: patients.filter(p => p.riskLevel === 'low').length, color: '#10B981' },
  ];

  return (
    <AppLayout title="Dashboard">
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Good morning, Dr. Nair 👋
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
          You have <strong style={{ color: 'var(--accent-blue)' }}>{todayApts.length} appointments</strong> today · {highRisk.length} high-risk patients need attention
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon={CalendarCheck} label="Today's Appointments" value={todayApts.length} sub="5 in-clinic, 2 video" color="#0EA5E9" trend={12} />
        <StatCard icon={Users} label="Total Patients" value="1,847" sub="Active this month" color="#14B8A6" trend={8} />
        <StatCard icon={AlertTriangle} label="High-Risk Patients" value={highRisk.length} sub="Require attention" color="#EF4444" />
        <StatCard icon={TrendingUp} label="Consultations Done" value="284" sub="This month" color="#8B5CF6" trend={5} />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Today's Appointments */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Today's Appointments</h3>
            <button className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => navigate('/appointments')}>
              View all <ChevronRight size={12} />
            </button>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            {todayApts.map((apt, i) => {
              const patient = patients.find(p => p.id === apt.patientId);
              return (
                <div key={apt.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px',
                  borderBottom: i < todayApts.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                  animationDelay: `${i * 0.05}s`,
                }}
                  className="animate-fade-up"
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                  onClick={() => navigate(`/appointments/${apt.id}`)}
                >
                  <div className="avatar" style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 13, color: 'white', flexShrink: 0 }}>
                    {patient?.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{patient?.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                      {patient?.conditions.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: apt.mode === 'Video' ? '#EFF6FF' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {apt.mode === 'Video' ? <Video size={13} color="#1D4ED8" /> : <MapPin size={13} color="#16A34A" />}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{apt.time}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{apt.duration}min</div>
                    </div>
                  </div>
                  <span className={`badge badge-${apt.priority}`}>{apt.priority}</span>
                  <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 11 }}
                    onClick={e => { e.stopPropagation(); navigate(`/consultation/${apt.id}`); }}>
                    <Zap size={11} /> Start
                  </button>
                </div>
              );
            })}
          </div>

          {/* Weekly chart */}
          <div className="card" style={{ padding: '20px', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Weekly Consultations</h3>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-page)', padding: '3px 8px', borderRadius: 6 }}>This week</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={weeklyStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, boxShadow: 'var(--shadow-md)' }} />
                <Area type="monotone" dataKey="consultations" stroke="#0EA5E9" strokeWidth={2} fill="url(#colorC)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Alerts */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <AlertTriangle size={14} color="#EF4444" />
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Active Alerts</h3>
              <span className="badge badge-high" style={{ marginLeft: 'auto' }}>{alerts.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notifications.filter(n => n.type === 'alert').slice(0, 3).map(n => {
                const p = patients.find(pt => pt.id === n.patientId);
                return (
                  <div key={n.id} onClick={() => navigate(`/patients/${n.patientId}`)}
                    style={{ padding: '10px 12px', borderRadius: 10, background: n.read ? '#F8FAFC' : '#FFF1F1', border: `1px solid ${n.read ? 'var(--border)' : '#FECACA'}`, cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: n.read ? '#94A3B8' : '#EF4444', marginTop: 5, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{n.message}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Patient Risk Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {riskDist.map(r => (
                <RiskBar key={r.label} label={r.label} value={r.value} total={patients.length} color={r.color} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444' }}>{riskDist[0].value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>High Risk</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#F59E0B' }}>{riskDist[1].value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Medium</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10B981' }}>{riskDist[2].value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Low Risk</div>
              </div>
            </div>
          </div>

          {/* High-risk patients quick view */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>High-Risk Patients</h3>
              <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 11 }} onClick={() => navigate('/patients')}>View all</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {patients.filter(p => p.riskLevel === 'high').map(p => (
                <div key={p.id} onClick={() => navigate(`/patients/${p.id}`)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '8px', borderRadius: 8, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-page)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="avatar" style={{ width: 34, height: 34, background: '#FEF2F2', color: '#DC2626', fontSize: 11 }}>{p.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.conditions[0]}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Activity size={11} color="#EF4444" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#EF4444' }}>{p.riskScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
