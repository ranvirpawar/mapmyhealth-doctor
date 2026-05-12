import { useStore } from '../store/useStore';
import AppLayout from '../layouts/AppLayout';

export default function Settings() {
  const doctor = useStore(s => s.doctor);
  return (
    <AppLayout title="Settings">
      <div className="card" style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Profile Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Full Name</label>
            <input className="input-field" defaultValue={doctor.name} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Specialty</label>
            <input className="input-field" defaultValue={doctor.specialty} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Hospital</label>
            <input className="input-field" defaultValue={doctor.hospital} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Email</label>
            <input className="input-field" type="email" defaultValue="dr.priya@mapmyhealth.in" />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
        </div>
      </div>
    </AppLayout>
  );
}