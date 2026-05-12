import { create } from 'zustand';
import { doctor, patients, appointments, notifications } from '../data/mockData';

export const useStore = create((set, get) => ({
  doctor,
  patients,
  appointments,
  notifications,
  isAuthenticated: false,
  activeConsultation: null,
  sidebarCollapsed: false,

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  setActiveConsultation: (appointmentId) => set({ activeConsultation: appointmentId }),

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  getPatient: (id) => get().patients.find((p) => p.id === id),
  getAppointment: (id) => get().appointments.find((a) => a.id === id),
  getPatientAppointments: (patientId) =>
    get().appointments.filter((a) => a.patientId === patientId),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  todayAppointments: () => {
    const today = "2025-05-12";
    return get().appointments.filter((a) => a.date === today);
  },

  highRiskPatients: () => get().patients.filter((p) => p.riskLevel === "high"),
}));
