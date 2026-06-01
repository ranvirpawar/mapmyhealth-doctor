# 🏥 Map My Health – Doctor Portal

Designed to showcase an elegant, efficient, and clinically intelligent workspace for managing patients, appointments, prescriptions, and health analytics.

---
- live url 

 https://ranvirpawar.github.io/mapmyhealth-doctor/




## 📌 Project Overview

This project simulates a complete **doctor portal** experience with realistic healthcare data. It focuses on:

- **Clinical efficiency** – instant access to patient history, vitals, and risk scores.
- **Modern UX** – clean, calm, and premium interface (inspired by Linear and Notion).
- **End‑to‑end workflow** – from login → appointments → consultation → prescription → history.

It is a **static frontend prototype** (no backend) that uses mock JSON data to demonstrate the product vision for stakeholders, investors, or clinical users.

---

## ✨ Core Features

### 🔐 Authentication 
- Split‑screen login with branding and demo credentials.
- Protected routes after authentication.

### 📊 Dashboard
- Key metrics: today’s appointments, total patients, high‑risk alerts, monthly consultations.
- Today’s appointments list with priority badges and direct “Start Consultation” button.
- Weekly consultations chart (area chart).
- Active alerts (critical BP, missed follow‑ups).
- Patient risk distribution (High / Medium / Low).

### 📅 Appointments
- List view with tabs: Today, Upcoming, Completed.
- Search by patient name.
- Detailed appointment view showing symptoms, vitals snapshot, and medical summary.
- One‑click entry to the consultation workspace.

### 👨‍⚕️ Patient Health Profile
- Complete clinical dashboard with:
  - Vitals cards (BP, HbA1c, HR, SpO₂).
  - Trend charts: blood pressure (12 months), fasting glucose (12 weeks), weight progression (6 months).
  - Conditions, allergies, current medications.
  - Past consultations timeline.
- Risk badge and risk score prominently displayed.

### 💬 Consultation Workspace (Core)
The most important screen – everything a doctor needs during a patient visit.

- **Left panel** – Patient snapshot: vitals, allergies, conditions, current medications.
- **Center panel** – Video call placeholder (static mock) with live indicator and doctor’s mini preview.
- **Right panel** – Tabbed clinical workspace:
  - **Notes** – Diagnosis, consultation notes, advice.
  - **Prescription** – Dynamic form to add/remove medicines with dosage, frequency, duration, and notes.
  - **Lab Orders** – Multi‑select list of common lab tests.
  - **History** – Timeline of previous consultations with diagnosis and prescribed medicines.

### 📄 Prescription Preview
- After creating prescriptions, a “Preview & Send” button shows a printable prescription layout.
- (UI ready for future PDF generation.)

### 📁 Reports Viewer
- Table of all patient reports (CBC, HbA1c, Lipid Profile, ECG, etc.).
- Status badges: Normal / Borderline / Abnormal.
- Click to preview report details in a modal.

### 🔔 Notifications Center
- List of all notifications (alerts, reminders, report availability).
- Read/unread status with visual indicators.
- Click to mark as read.


