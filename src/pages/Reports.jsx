import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { reports as mockReports, patients } from '../data/mockData';
import { Eye } from 'lucide-react';

export default function Reports() {
  const [selected, setSelected] = useState(null);
  const reportsWithPatient = mockReports.map(r => ({
    ...r,
    patientName: patients.find(p => p.id === r.patientId)?.name || 'Unknown'
  }));

  return (
    <AppLayout title="Reports">
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12 }}>Report Name</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12 }}>Patient</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12 }}>Date</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12 }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12 }}>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reportsWithPatient.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.patientName}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`badge ${r.status === 'Abnormal' ? 'badge-high' : r.status === 'Borderline' ? 'badge-medium' : 'badge-low'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.value}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => setSelected(r)} className="btn btn-ghost" style={{ padding: '4px 8px' }}>
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelected(null)}>
          <div className="card" style={{ maxWidth: 500, width: '90%', padding: 24 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>{selected.name}</h3>
            <p style={{ marginTop: 8 }}>Patient: {selected.patientName}</p>
            <p>Date: {selected.date}</p>
            <p>Result: {selected.value}</p>
            <p style={{ marginTop: 12 }}>
              <span className={`badge ${selected.status === 'Abnormal' ? 'badge-high' : 'badge-medium'}`}>{selected.status}</span>
            </p>
            <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
