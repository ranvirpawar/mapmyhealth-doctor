import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients } from '../data/mockData';
import AppLayout from '../layouts/AppLayout';
import { Search, Filter, Activity, ChevronRight, Heart, Droplets } from 'lucide-react';

const riskFilters = ['All', 'High', 'Medium', 'Low'];

export default function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  const filtered = patients.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.conditions.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchRisk = riskFilter === 'All' || p.riskLevel === riskFilter.toLowerCase();
    return matchSearch && matchRisk;
  });

  return (
    <AppLayout title="Patients">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Patient Registry</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{patients.length} total patients</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" style={{ paddingLeft: 30, height: 36, fontSize: 13 }} placeholder="Search by name or condition..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {riskFilters.map(f => (
            <button key={f} onClick={() => setRiskFilter(f)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: riskFilter === f ? 600 : 400,
              background: riskFilter === f ? (f === 'High' ? '#FEF2F2' : f === 'Medium' ? '#FFF7ED' : f === 'Low' ? '#F0FDF4' : 'var(--accent-blue)') : 'transparent',
              color: riskFilter === f ? (f === 'High' ? '#DC2626' : f === 'Medium' ? '#C2410C' : f === 'Low' ? '#16A34A' : 'white') : 'var(--text-muted)',
              border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s',
            }}>{f}</button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} results</span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="card animate-fade-up" style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.15s', animationDelay: `${i * 0.04}s` }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            onClick={() => navigate(`/patients/${p.id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div className="avatar" style={{ width: 44, height: 44, background: p.riskLevel === 'high' ? 'linear-gradient(135deg, #FCA5A5, #F87171)' : p.riskLevel === 'medium' ? 'linear-gradient(135deg, #FCD34D, #F59E0B)' : 'linear-gradient(135deg, #6EE7B7, #10B981)', fontSize: 14, color: 'white' }}>
                {p.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{p.name}</span>
                  <span className={`badge badge-${p.riskLevel}`}>{p.riskLevel}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {p.age}y · {p.gender} · {p.bloodGroup} · {p.city}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: p.riskLevel === 'high' ? '#FEF2F2' : p.riskLevel === 'medium' ? '#FFF7ED' : '#F0FDF4', borderRadius: 8 }}>
                <Activity size={11} color={p.riskLevel === 'high' ? '#DC2626' : p.riskLevel === 'medium' ? '#C2410C' : '#16A34A'} />
                <span style={{ fontSize: 12, fontWeight: 700, color: p.riskLevel === 'high' ? '#DC2626' : p.riskLevel === 'medium' ? '#C2410C' : '#16A34A' }}>{p.riskScore}</span>
              </div>
            </div>

            {/* Conditions */}
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
              {p.conditions.map(c => (
                <span key={c} style={{ fontSize: 11, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 7px', borderRadius: 6 }}>{c}</span>
              ))}
            </div>

            {/* Vitals mini */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
              <div style={{ padding: '6px 8px', background: 'var(--bg-page)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>BP</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.vitals.bp.status === 'high' ? '#DC2626' : 'var(--text-primary)' }}>
                  {p.vitals.bp.systolic}/{p.vitals.bp.diastolic}
                </div>
              </div>
              <div style={{ padding: '6px 8px', background: 'var(--bg-page)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>HbA1c</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.vitals.sugar.hba1c > 7 ? '#DC2626' : 'var(--text-primary)' }}>
                  {p.vitals.sugar.hba1c}%
                </div>
              </div>
              <div style={{ padding: '6px 8px', background: 'var(--bg-page)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>BMI</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{p.bmi}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last visit: {p.lastVisit}</span>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
