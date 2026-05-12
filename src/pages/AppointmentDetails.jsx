import { useParams, useNavigate } from 'react-router-dom';
import { appointments, patients } from '../data/mockData';
import AppLayout from '../layouts/AppLayout';
import { Video, MapPin, Calendar, Clock, User, AlertTriangle, ChevronRight, FlaskConical, Pill, Activity } from 'lucide-react';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apt = appointments.find(a => a.id === id);
  const patient = apt ? patients.find(p => p.id === apt.patientId) : null;

  if (!apt || !patient) return <div className="card" style={{ padding: 40, textAlign: 'center' }}>Appointment not found</div>;

  return (
    <AppLayout title="Appointment Details">
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>{patient.name}</h2>
                <span className={`badge badge-${apt.priority}`}>{apt.priority}</span>
                <span className="badge" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>{apt.type}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>
                <span><Calendar size={13} style={{ display: 'inline', marginRight: 4 }} /> {apt.date}</span>
                <span><Clock size={13} style={{ display: 'inline', marginRight: 4 }} /> {apt.time} ({apt.duration} min)</span>
                <span>{apt.mode === 'Video' ? <Video size={13} /> : <MapPin size={13} />} {apt.mode}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate(`/consultation/${apt.id}`)}>
              Start Consultation <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Patient summary card */}
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Patient Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Demographics</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{patient.age} y/o · {patient.gender} · {patient.bloodGroup}</div>
              <div style={{ fontSize: 14 }}>{patient.city}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vitals (latest)</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <span>BP: {patient.vitals.bp.systolic}/{patient.vitals.bp.diastolic}</span>
                <span>HbA1c: {patient.vitals.sugar.hba1c}%</span>
                <span>BMI: {patient.bmi}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: patient.riskLevel === 'high' ? '#DC2626' : patient.riskLevel === 'medium' ? '#C2410C' : '#16A34A' }}>{patient.riskScore}</span>
                <span className={`badge badge-${patient.riskLevel}`}>{patient.riskLevel} risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms & Notes */}
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Chief Complaints & History</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {apt.symptoms.map(s => (
              <span key={s} className="badge" style={{ background: '#F0F9FF', color: '#0369A1' }}>{s}</span>
            ))}
          </div>
          {apt.notes && (
            <div style={{ padding: 12, background: '#FFFBEB', borderRadius: 8, fontSize: 13, color: '#78350F' }}>
              <strong>Doctor's note:</strong> {apt.notes}
            </div>
          )}
        </div>

        {/* Condition & Meds preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Active Conditions</h3>
            {patient.conditions.map(c => (
              <div key={c} style={{ padding: '6px 0', fontSize: 13 }}>• {c}</div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Current Medications</h3>
            {patient.currentMedications.map(m => (
              <div key={m.name} style={{ fontSize: 13, padding: '6px 0' }}>
                <strong>{m.name}</strong> – {m.frequency}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => navigate(`/consultation/${apt.id}`)}>
            Begin Consultation
          </button>
        </div>
      </div>
    </AppLayout>
  );
}