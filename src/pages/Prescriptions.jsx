import AppLayout from '../layouts/AppLayout';
import { Download } from 'lucide-react';

export default function Prescriptions() {
  // Mock data: prescriptions would normally be taken from consultation store
  const prescriptions = [
    { id: 1, patient: "Rajan Mehta", date: "2025-05-12", medicines: ["Metformin 500mg", "Amlodipine 5mg"] },
    { id: 2, patient: "Sunita Sharma", date: "2025-05-10", medicines: ["Levothyroxine 50mcg"] },
  ];

  return (
    <AppLayout title="Prescriptions">
      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Recent Prescriptions</h2>
        {prescriptions.map(p => (
          <div key={p.id} className="prescription-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{p.patient}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.date} · {p.medicines.join(', ')}</div>
            </div>
            <button className="btn btn-ghost" style={{ padding: '5px 10px' }}>
              <Download size={12} /> PDF
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
