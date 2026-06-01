import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appointments, patients, consultationHistory, labTests, medicines } from '../data/mockData';
import { Mic, MicOff, Video, VideoOff, Phone, Plus, Trash2, FileText, FlaskConical, Clock, CheckCircle2, User, Pill } from 'lucide-react';

const tabs = [
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'prescription', label: 'Prescription', icon: Pill },
  { id: 'labs', label: 'Lab Orders', icon: FlaskConical },
  { id: 'history', label: 'History', icon: Clock },
];

export default function Consultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apt = appointments.find(a => a.id === id);
  const patient = apt ? patients.find(p => p.id === apt.patientId) : null;

  const [activeTab, setActiveTab] = useState('notes');
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [notes, setNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medicine: '', dosage: '', frequency: '', duration: '', note: '' }
  ]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!apt || !patient) return null;
  const history = consultationHistory[patient.id] || [];

  const addMedicine = () => setPrescriptions(p => [...p, { id: Date.now(), medicine: '', dosage: '', frequency: '', duration: '', note: '' }]);
  const removeMedicine = (id) => setPrescriptions(p => p.filter(m => m.id !== id));
  const updateMedicine = (id, field, value) => setPrescriptions(p => p.map(m => m.id === id ? { ...m, [field]: value } : m));

  const toggleLab = (test) => setSelectedLabs(l => l.includes(test) ? l.filter(x => x !== test) : [...l, test]);

  const handleEnd = () => { setShowSuccess(true); setTimeout(() => navigate('/dashboard'), 2000); };

  return (
    <div className="consultation-shell" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)', fontFamily: 'var(--font)', overflow: 'hidden' }}>
      {/* Top Bar */}
      <div className="consultation-topbar" style={{ height: 52, background: '#0D1B2A', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, flexShrink: 0 }}>
        <div className="consultation-patient-strip" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 10, color: 'white' }}>{patient.initials}</div>
          <div>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{patient.name}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 8 }}>{apt.type}</span>
          </div>
          <span className={`badge badge-${patient.riskLevel}`}>{patient.riskLevel} risk</span>
        </div>

        <div style={{ flex: 1 }} />

        <div className="consultation-live" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Live · {apt.time}</span>
        </div>

        <div className="consultation-controls" style={{ display: 'flex', gap: 6 }}>
          {[
            { icon: micOn ? Mic : MicOff, active: micOn, toggle: () => setMicOn(!micOn) },
            { icon: videoOn ? Video : VideoOff, active: videoOn, toggle: () => setVideoOn(!videoOn) },
          ].map(({ icon: Icon, active, toggle }, i) => (
            <button key={i} onClick={toggle} style={{ width: 32, height: 32, borderRadius: '50%', background: active ? 'rgba(14,165,233,0.2)' : 'rgba(239,68,68,0.2)', border: `1px solid ${active ? 'rgba(14,165,233,0.3)' : 'rgba(239,68,68,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: active ? '#38BDF8' : '#EF4444' }}>
              <Icon size={14} />
            </button>
          ))}
          <button onClick={handleEnd} style={{ height: 32, padding: '0 14px', borderRadius: 8, background: '#DC2626', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Phone size={12} /> End
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="consultation-body" style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr 380px', overflow: 'hidden' }}>

        {/* LEFT — Patient Summary */}
        <div className="consultation-summary" style={{ background: 'white', borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <User size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Patient Summary</span>
          </div>

          <div style={{ textAlign: 'center', padding: '12px 0', marginBottom: 14 }}>
            <div className="avatar" style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 18, color: 'white', margin: '0 auto 10px' }}>{patient.initials}</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{patient.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{patient.age}y · {patient.gender} · {patient.bloodGroup}</div>
            <div style={{ marginTop: 8 }}>
              <span className={`badge badge-${patient.riskLevel}`}>
                Risk Score: {patient.riskScore}/100
              </span>
            </div>
          </div>

          {/* Vitals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'BP', value: `${patient.vitals.bp.systolic}/${patient.vitals.bp.diastolic}`, unit: 'mmHg', status: patient.vitals.bp.status, color: '#EF4444' },
              { label: 'HbA1c', value: patient.vitals.sugar.hba1c, unit: '%', status: patient.vitals.sugar.status, color: '#F59E0B' },
              { label: 'HR', value: patient.vitals.heartRate, unit: 'bpm', status: 'normal', color: '#0EA5E9' },
              { label: 'SpO2', value: `${patient.vitals.spo2}%`, unit: '', status: 'normal', color: '#14B8A6' },
            ].map(v => (
              <div key={v.label} style={{ padding: '8px', background: 'var(--bg-page)', borderRadius: 8, border: `1px solid ${v.status === 'high' ? '#FECACA' : 'var(--border)'}` }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{v.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: v.status === 'high' ? '#DC2626' : 'var(--text-primary)' }}>{v.value}</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{v.unit}</div>
              </div>
            ))}
          </div>

          {/* BMI */}
          <div style={{ padding: '10px 12px', background: '#F5F3FF', borderRadius: 10, border: '1px solid #DDD6FE', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: '#6D28D9', fontWeight: 600 }}>BMI: {patient.bmi}</div>
            <div style={{ fontSize: 10, color: '#7C3AED' }}>{patient.weight}kg · {patient.height}cm</div>
          </div>

          {/* Allergies */}
          {patient.allergies.length > 0 && (
            <div style={{ padding: '10px 12px', background: '#FEF2F2', borderRadius: 10, border: '1px solid #FECACA', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', marginBottom: 6 }}>⚠ ALLERGIES</div>
              {patient.allergies.map(a => <div key={a} style={{ fontSize: 11, color: '#991B1B' }}>• {a}</div>)}
            </div>
          )}

          {/* Conditions */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Conditions</div>
            {patient.conditions.map(c => (
              <div key={c} style={{ fontSize: 12, background: '#EFF6FF', color: '#1D4ED8', padding: '4px 8px', borderRadius: 6, marginBottom: 4 }}>{c}</div>
            ))}
          </div>

          {/* Meds */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Medications</div>
            {patient.currentMedications.map(m => (
              <div key={m.name} style={{ fontSize: 11, padding: '6px 8px', background: 'var(--bg-page)', borderRadius: 6, marginBottom: 4 }}>
                <div style={{ fontWeight: 600 }}>{m.name}</div>
                <div style={{ color: 'var(--text-muted)', marginTop: 1 }}>{m.frequency}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — Video + Symptoms */}
        <div className="consultation-stage" style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: 14, overflowY: 'auto' }}>
          {/* Video area */}
          <div style={{ background: '#0D1B2A', borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="avatar" style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', fontSize: 28, color: 'white', margin: '0 auto 12px' }}>{patient.initials}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{patient.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4 }}>Video Connected</div>
              </div>
            </div>
            {/* Doctor pip */}
            <div className="doctor-pip" style={{ position: 'absolute', bottom: 12, right: 12, width: 120, height: 80, background: '#1E3A5F', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(56,189,248,0.3)' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="avatar" style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', fontSize: 11, color: 'white', margin: '0 auto 4px' }}>PN</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>Dr. Nair</div>
              </div>
            </div>
            {/* Live badge */}
            <div style={{ position: 'absolute', top: 12, left: 12, background: '#EF4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'white' }} />
              LIVE
            </div>
          </div>

          {/* Symptoms */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chief Complaints</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {apt.symptoms.map(s => (
                <span key={s} style={{ background: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD', padding: '4px 10px', borderRadius: 99, fontSize: 12 }}>{s}</span>
              ))}
            </div>
            {apt.notes && (
              <div style={{ marginTop: 12, padding: '10px 12px', background: '#FFFBEB', borderRadius: 8, fontSize: 12, color: '#78350F', border: '1px solid #FDE68A' }}>{apt.notes}</div>
            )}
          </div>
        </div>

        {/* RIGHT — Clinical Workspace */}
        <div className="consultation-workspace" style={{ background: 'white', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 4px', flexShrink: 0 }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                flex: 1, padding: '12px 4px', fontSize: 11, fontWeight: activeTab === id ? 700 : 400,
                color: activeTab === id ? 'var(--accent-blue)' : 'var(--text-muted)',
                background: 'none', border: 'none', borderBottom: activeTab === id ? '2px solid var(--accent-blue)' : '2px solid transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, transition: 'all 0.15s',
              }}>
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {/* NOTES */}
            {activeTab === 'notes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Diagnosis / Assessment</label>
                  <input className="input-field" placeholder="e.g. Uncontrolled Type 2 DM, HTN Stage 2" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Consultation Notes</label>
                  <textarea className="input-field" rows={7} placeholder="Clinical observations, patient history, examination findings..." value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Advice & Recommendations</label>
                  <textarea className="input-field" rows={3} placeholder="Diet, lifestyle, follow-up instructions..." style={{ resize: 'none' }} />
                </div>
                <div style={{ padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0', fontSize: 12, color: '#15803D' }}>
                  💡 Smart Insight: BP has increased 14% compared to last visit. Consider dose escalation.
                </div>
              </div>
            )}

            {/* PRESCRIPTION */}
            {activeTab === 'prescription' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{prescriptions.length} medication(s)</span>
                  <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 11 }} onClick={addMedicine}>
                    <Plus size={11} /> Add
                  </button>
                </div>
                {prescriptions.map((med, i) => (
                  <div key={med.id} style={{ background: 'var(--bg-page)', borderRadius: 10, padding: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>Rx {i + 1}</span>
                      {prescriptions.length > 1 && (
                        <button onClick={() => removeMedicine(med.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex' }}>
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <select className="input-field" style={{ fontSize: 12 }} value={med.medicine} onChange={e => updateMedicine(med.id, 'medicine', e.target.value)}>
                        <option value="">Select medicine...</option>
                        {medicines.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <select className="input-field" style={{ fontSize: 12 }} value={med.dosage} onChange={e => updateMedicine(med.id, 'dosage', e.target.value)}>
                          <option value="">Dosage</option>
                          {['250mg', '500mg', '750mg', '1000mg', '5mg', '10mg', '20mg', '25mg', '40mg', '50mg', '75mg', '100mg', '5 units', '10 units', '20 units'].map(d => <option key={d}>{d}</option>)}
                        </select>
                        <select className="input-field" style={{ fontSize: 12 }} value={med.frequency} onChange={e => updateMedicine(med.id, 'frequency', e.target.value)}>
                          <option value="">Frequency</option>
                          {['Once daily', 'Twice daily', 'Thrice daily', 'At bedtime', 'Before meals', 'After meals', 'Weekly', 'SOS'].map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <select className="input-field" style={{ fontSize: 12 }} value={med.duration} onChange={e => updateMedicine(med.id, 'duration', e.target.value)}>
                        <option value="">Duration</option>
                        {['7 days', '14 days', '1 month', '2 months', '3 months', '6 months', 'Continue'].map(d => <option key={d}>{d}</option>)}
                      </select>
                      <input className="input-field" style={{ fontSize: 12 }} placeholder="Notes (e.g. take with food)" value={med.note} onChange={e => updateMedicine(med.id, 'note', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => navigate('/prescriptions')}>
                  <CheckCircle2 size={14} /> Preview & Send Prescription
                </button>
              </div>
            )}

            {/* LAB ORDERS */}
            {activeTab === 'labs' && (
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Select investigations to order:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {labTests.map(t => (
                    <div key={t} onClick={() => toggleLab(t)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: `1px solid ${selectedLabs.includes(t) ? 'var(--accent-blue)' : 'var(--border)'}`, background: selectedLabs.includes(t) ? '#EFF6FF' : 'var(--bg-page)', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${selectedLabs.includes(t) ? 'var(--accent-blue)' : 'var(--border-hover)'}`, background: selectedLabs.includes(t) ? 'var(--accent-blue)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {selectedLabs.includes(t) && <CheckCircle2 size={10} color="white" />}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: selectedLabs.includes(t) ? 600 : 400, color: selectedLabs.includes(t) ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{t}</span>
                    </div>
                  ))}
                </div>
                {selectedLabs.length > 0 && (
                  <div style={{ marginTop: 14, padding: '12px', background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1D4ED8', marginBottom: 6 }}>{selectedLabs.length} TESTS ORDERED</div>
                    {selectedLabs.map(t => <div key={t} style={{ fontSize: 11, color: '#1D4ED8' }}>• {t}</div>)}
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10, fontSize: 12 }}>Confirm Lab Order</button>
                  </div>
                )}
              </div>
            )}

            {/* HISTORY */}
            {activeTab === 'history' && (
              <div>
                {history.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginTop: 24 }}>No consultation history</p>
                ) : history.map((h, i) => (
                  <div key={i} style={{ position: 'relative', paddingLeft: 20, marginBottom: 20 }}>
                    <div style={{ position: 'absolute', left: 0, top: 4, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)', border: '2px solid white', boxShadow: '0 0 0 2px var(--accent-blue)' }} />
                    {i < history.length - 1 && <div style={{ position: 'absolute', left: 3, top: 14, bottom: -12, width: 1, background: 'var(--border)' }} />}
                    <div style={{ background: 'var(--bg-page)', borderRadius: 10, padding: '12px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{h.date}</div>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{h.doctor}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{h.diagnosis}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>{h.notes}</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {h.prescriptions.map(rx => (
                          <span key={rx} style={{ background: '#F5F3FF', color: '#6D28D9', padding: '2px 7px', borderRadius: 99, fontSize: 10 }}>{rx}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '40px', textAlign: 'center', maxWidth: 360 }}>
            <div style={{ width: 64, height: 64, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} color="#16A34A" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Consultation Complete</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Prescription & notes saved. Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
