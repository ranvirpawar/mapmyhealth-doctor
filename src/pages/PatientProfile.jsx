import { useParams } from 'react-router-dom';
import { patients, generateBpHistory, generateSugarHistory, generateWeightHistory, consultationHistory } from '../data/mockData';
import AppLayout from '../layouts/AppLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Heart, Droplets, Calendar } from 'lucide-react';

export default function PatientProfile() {
  const { id } = useParams();
  const patient = patients.find(p => p.id === id);
  if (!patient) return <div className="card" style={{ padding: 40 }}>Patient not found</div>;

  const bpHistory = generateBpHistory(patient.vitals.bp.systolic, patient.vitals.bp.diastolic);
  const sugarHistory = generateSugarHistory(patient.vitals.sugar.fasting);
  const weightHistory = generateWeightHistory(patient.weight);
  const history = consultationHistory[patient.id] || [];

  return (
    <AppLayout title={`${patient.name} – Health Profile`}>
      {/* Header section with risk badge */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div className="avatar" style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${patient.riskLevel === 'high' ? '#F87171' : patient.riskLevel === 'medium' ? '#FBBF24' : '#34D399'}, #0EA5E9)`, fontSize: 28, color: 'white' }}>
            {patient.initials}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>{patient.name}</h2>
              <span className={`badge badge-${patient.riskLevel}`}>RISK: {patient.riskLevel}</span>
              <span className="badge" style={{ background: '#F3E8FF', color: '#6B21A5' }}>Risk Score {patient.riskScore}</span>
            </div>
            <div style={{ color: 'var(--text-muted)', marginTop: 6 }}>
              {patient.age} yrs · {patient.gender} · {patient.bloodGroup} · {patient.city}
            </div>
          </div>
        </div>
      </div>

      {/* Vitals Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={16} color="#EF4444" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Blood Pressure</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{patient.vitals.bp.systolic}/{patient.vitals.bp.diastolic}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>mmHg · {patient.vitals.bp.status}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Droplets size={16} color="#F59E0B" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>HbA1c</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{patient.vitals.sugar.hba1c}%</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{patient.vitals.sugar.status}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Heart size={16} color="#0EA5E9" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Heart Rate</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{patient.vitals.heartRate}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>bpm</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={16} color="#14B8A6" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>SpO₂</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{patient.vitals.spo2}%</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Normal</div>
        </div>
      </div>

      {/* Trend Charts */}
      <div className="chart-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px,1fr))', gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Blood Pressure Trend (Last 12 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bpHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="systolic" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="diastolic" stroke="#0EA5E9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Glucose (Fasting) – Last 12 weeks</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sugarHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="fasting" stroke="#F59E0B" fill="#FEF3C7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Weight Progression</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#14B8A6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conditions & Meds & Timeline */}
      <div className="two-column-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Medical History</h3>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-muted)' }}>Conditions</div>
            {patient.conditions.map(c => <div key={c} style={{ padding: '4px 0' }}>• {c}</div>)}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-muted)' }}>Allergies</div>
            {patient.allergies.length ? patient.allergies.map(a => <div key={a} style={{ padding: '4px 0' }}>⚠ {a}</div>) : <div style={{ padding: '4px 0' }}>None reported</div>}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Current Medications</h3>
          {patient.currentMedications.map(m => (
            <div key={m.name} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 500 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.frequency} · since {m.since}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Timeline */}
      <div className="card" style={{ padding: 20, marginTop: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Past Consultations</h3>
        {history.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>No previous consultations</div>
        ) : (
          history.map((h, idx) => (
            <div key={idx} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: idx !== history.length-1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Calendar size={12} color="var(--text-muted)" />
                <span style={{ fontWeight: 600 }}>{h.date}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{h.doctor}</span>
              </div>
              <div style={{ fontWeight: 500 }}>{h.diagnosis}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{h.notes}</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {h.prescriptions.map(rx => <span key={rx} className="badge badge-info">{rx}</span>)}
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
