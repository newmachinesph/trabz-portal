// =============================================================================
// Trabz Portal — Shared Mock Data (Filipino realistic data)
// =============================================================================

// ─── Workers ──────────────────────────────────────────────────────────────────

export interface MockWorker {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  initials: string;
  avatar_color: string;
}

export const MOCK_WORKERS: MockWorker[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@gmail.com", phone: "+63 917 123 4567", location: "Quezon City", skills: ["carpentry", "painting"], initials: "JC", avatar_color: "bg-blue-500" },
  { id: 2, name: "Maria Santos", email: "maria@gmail.com", phone: "+63 918 234 5678", location: "Makati", skills: ["cooking", "food prep"], initials: "MS", avatar_color: "bg-pink-500" },
  { id: 3, name: "Pedro Garcia", email: "pedro@gmail.com", phone: "+63 919 345 6789", location: "Taguig", skills: ["driving", "logistics"], initials: "PG", avatar_color: "bg-green-500" },
  { id: 4, name: "Ana Reyes", email: "ana@gmail.com", phone: "+63 920 456 7890", location: "Pasig", skills: ["customer service", "sales"], initials: "AR", avatar_color: "bg-purple-500" },
  { id: 5, name: "Roberto Mendoza", email: "roberto@gmail.com", phone: "+63 921 567 8901", location: "Mandaluyong", skills: ["welding", "machine operation"], initials: "RM", avatar_color: "bg-amber-500" },
  { id: 6, name: "Carmen Villanueva", email: "carmen@gmail.com", phone: "+63 922 678 9012", location: "Paranaque", skills: ["sewing", "inventory"], initials: "CV", avatar_color: "bg-teal-500" },
  { id: 7, name: "Miguel Torres", email: "miguel@gmail.com", phone: "+63 923 789 0123", location: "Cebu City", skills: ["masonry", "plumbing"], initials: "MT", avatar_color: "bg-indigo-500" },
  { id: 8, name: "Rosario Lim", email: "rosario@gmail.com", phone: "+63 924 890 1234", location: "Davao City", skills: ["cleaning", "housekeeping"], initials: "RL", avatar_color: "bg-rose-500" },
  { id: 9, name: "Fernando Aquino", email: "fernando@gmail.com", phone: "+63 925 901 2345", location: "Las Pinas", skills: ["electrical", "plumbing"], initials: "FA", avatar_color: "bg-cyan-500" },
  { id: 10, name: "Lourdes Bautista", email: "lourdes@gmail.com", phone: "+63 926 012 3456", location: "Caloocan", skills: ["cooking", "customer service"], initials: "LB", avatar_color: "bg-orange-500" },
  { id: 11, name: "Ricardo Navarro", email: "ricardo@gmail.com", phone: "+63 927 123 4560", location: "Marikina", skills: ["carpentry", "painting", "masonry"], initials: "RN", avatar_color: "bg-emerald-500" },
  { id: 12, name: "Elena Flores", email: "elena@gmail.com", phone: "+63 928 234 5671", location: "Valenzuela", skills: ["warehouse", "logistics", "inventory"], initials: "EF", avatar_color: "bg-violet-500" },
];

// ─── KayaScore ────────────────────────────────────────────────────────────────

export interface KayaDomain {
  name: string;
  score: number;
}

export interface KayaAssessment {
  worker_id: number;
  worker_name: string;
  initials: string;
  avatar_color: string;
  overall_score: number;
  domains: KayaDomain[];
  top_traits: string[];
  dark_traits: string[];
  risk_level: "low" | "medium" | "high";
  assessed_at: string;
  conflict_notes: string;
}

export const MOCK_KAYA_ASSESSMENTS: KayaAssessment[] = [
  { worker_id: 1, worker_name: "Juan dela Cruz", initials: "JC", avatar_color: "bg-blue-500", overall_score: 82, domains: [{ name: "Work Ethic", score: 90 }, { name: "Teamwork", score: 78 }, { name: "Stress Tolerance", score: 85 }, { name: "Integrity", score: 80 }, { name: "Adaptability", score: 77 }], top_traits: ["Punctual", "Reliable", "Hardworking"], dark_traits: [], risk_level: "low", assessed_at: "2025-12-15", conflict_notes: "None identified." },
  { worker_id: 2, worker_name: "Maria Santos", initials: "MS", avatar_color: "bg-pink-500", overall_score: 91, domains: [{ name: "Work Ethic", score: 95 }, { name: "Teamwork", score: 92 }, { name: "Stress Tolerance", score: 88 }, { name: "Integrity", score: 90 }, { name: "Adaptability", score: 90 }], top_traits: ["Leader", "Empathetic", "Detail-oriented"], dark_traits: [], risk_level: "low", assessed_at: "2025-12-18", conflict_notes: "None identified." },
  { worker_id: 3, worker_name: "Pedro Garcia", initials: "PG", avatar_color: "bg-green-500", overall_score: 68, domains: [{ name: "Work Ethic", score: 72 }, { name: "Teamwork", score: 60 }, { name: "Stress Tolerance", score: 65 }, { name: "Integrity", score: 75 }, { name: "Adaptability", score: 68 }], top_traits: ["Independent", "Fast learner"], dark_traits: ["Impatient"], risk_level: "medium", assessed_at: "2025-12-20", conflict_notes: "Mild friction with team leads under tight deadlines." },
  { worker_id: 4, worker_name: "Ana Reyes", initials: "AR", avatar_color: "bg-purple-500", overall_score: 88, domains: [{ name: "Work Ethic", score: 85 }, { name: "Teamwork", score: 92 }, { name: "Stress Tolerance", score: 90 }, { name: "Integrity", score: 88 }, { name: "Adaptability", score: 85 }], top_traits: ["Communicator", "Team player", "Calm"], dark_traits: [], risk_level: "low", assessed_at: "2025-12-22", conflict_notes: "None identified." },
  { worker_id: 5, worker_name: "Roberto Mendoza", initials: "RM", avatar_color: "bg-amber-500", overall_score: 45, domains: [{ name: "Work Ethic", score: 55 }, { name: "Teamwork", score: 35 }, { name: "Stress Tolerance", score: 40 }, { name: "Integrity", score: 50 }, { name: "Adaptability", score: 45 }], top_traits: ["Skilled welder"], dark_traits: ["Confrontational", "Authority-resistant"], risk_level: "high", assessed_at: "2025-12-25", conflict_notes: "History of disagreements with supervisors. Recommend structured feedback." },
  { worker_id: 6, worker_name: "Carmen Villanueva", initials: "CV", avatar_color: "bg-teal-500", overall_score: 76, domains: [{ name: "Work Ethic", score: 80 }, { name: "Teamwork", score: 75 }, { name: "Stress Tolerance", score: 70 }, { name: "Integrity", score: 82 }, { name: "Adaptability", score: 73 }], top_traits: ["Meticulous", "Organized"], dark_traits: [], risk_level: "low", assessed_at: "2026-01-02", conflict_notes: "None identified." },
  { worker_id: 7, worker_name: "Miguel Torres", initials: "MT", avatar_color: "bg-indigo-500", overall_score: 71, domains: [{ name: "Work Ethic", score: 78 }, { name: "Teamwork", score: 68 }, { name: "Stress Tolerance", score: 65 }, { name: "Integrity", score: 72 }, { name: "Adaptability", score: 72 }], top_traits: ["Strong", "Dependable"], dark_traits: ["Stubborn"], risk_level: "medium", assessed_at: "2026-01-05", conflict_notes: "Prefers own methods. May resist new processes." },
  { worker_id: 8, worker_name: "Rosario Lim", initials: "RL", avatar_color: "bg-rose-500", overall_score: 85, domains: [{ name: "Work Ethic", score: 88 }, { name: "Teamwork", score: 85 }, { name: "Stress Tolerance", score: 82 }, { name: "Integrity", score: 87 }, { name: "Adaptability", score: 83 }], top_traits: ["Caring", "Thorough", "Cheerful"], dark_traits: [], risk_level: "low", assessed_at: "2026-01-08", conflict_notes: "None identified." },
];

// ─── Messages ─────────────────────────────────────────────────────────────────

export interface MockMessage {
  id: number;
  sender: "employer" | "worker";
  text: string;
  time: string;
}

export interface MockConversation {
  id: number;
  worker: MockWorker;
  messages: MockMessage[];
  unread: boolean;
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 1, worker: MOCK_WORKERS[0], unread: true,
    messages: [
      { id: 1, sender: "worker", text: "Magandang umaga po! Interested po ako sa carpenter position.", time: "9:15 AM" },
      { id: 2, sender: "employer", text: "Hi Juan! Salamat sa interest. May experience ka na ba sa commercial projects?", time: "9:30 AM" },
      { id: 3, sender: "worker", text: "Opo, 5 years po sa residential at commercial. May portfolio po ako.", time: "9:45 AM" },
      { id: 4, sender: "employer", text: "Great! Pwede ka ba mag-interview this Friday, 2PM sa Makati office namin?", time: "10:00 AM" },
      { id: 5, sender: "worker", text: "Opo, noted po! Salamat po!", time: "10:05 AM" },
    ],
  },
  {
    id: 2, worker: MOCK_WORKERS[1], unread: true,
    messages: [
      { id: 1, sender: "employer", text: "Hi Maria, congratulations! You passed the screening.", time: "2:00 PM" },
      { id: 2, sender: "worker", text: "Salamat po! Kailan po ang next step?", time: "2:15 PM" },
      { id: 3, sender: "employer", text: "We'd like you to come in for a cooking demo this Wednesday. Can you make it?", time: "2:20 PM" },
    ],
  },
  {
    id: 3, worker: MOCK_WORKERS[2], unread: false,
    messages: [
      { id: 1, sender: "worker", text: "Good day po. Tanong ko lang about the delivery driver position.", time: "11:00 AM" },
      { id: 2, sender: "employer", text: "Hello Pedro! What would you like to know?", time: "11:30 AM" },
      { id: 3, sender: "worker", text: "Required po ba professional driver's license?", time: "11:35 AM" },
      { id: 4, sender: "employer", text: "Yes, professional license is required. Non-pro will not be accepted.", time: "11:40 AM" },
      { id: 5, sender: "worker", text: "Okay po, meron naman po ako. Thank you!", time: "11:45 AM" },
    ],
  },
  {
    id: 4, worker: MOCK_WORKERS[3], unread: false,
    messages: [
      { id: 1, sender: "employer", text: "Hi Ana, your application for sales associate is under review.", time: "3:00 PM" },
      { id: 2, sender: "worker", text: "Thank you po for the update! Excited po ako.", time: "3:30 PM" },
    ],
  },
  {
    id: 5, worker: MOCK_WORKERS[6], unread: false,
    messages: [
      { id: 1, sender: "worker", text: "Ser, kumusta po yung application ko for mason?", time: "8:00 AM" },
      { id: 2, sender: "employer", text: "Hi Miguel, still under review. We'll get back to you by Friday.", time: "8:30 AM" },
      { id: 3, sender: "worker", text: "Sige po, salamat!", time: "8:35 AM" },
    ],
  },
  {
    id: 6, worker: MOCK_WORKERS[7], unread: true,
    messages: [
      { id: 1, sender: "employer", text: "Hi Rosario! We'd like to offer you the housekeeping position.", time: "4:00 PM" },
      { id: 2, sender: "worker", text: "Talaga po?! Maraming salamat po! Kailan po start?", time: "4:10 PM" },
      { id: 3, sender: "employer", text: "You can start next Monday. Please bring your IDs and medical certificate.", time: "4:15 PM" },
      { id: 4, sender: "worker", text: "Yes po! Dala ko po lahat. God bless po!", time: "4:20 PM" },
    ],
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export interface MockNotification {
  id: number;
  type: "application" | "message" | "system" | "status";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { id: 1, type: "application", title: "New Application", description: "Juan dela Cruz applied for Carpenter - Residential Projects", time: "5 min ago", read: false },
  { id: 2, type: "message", title: "New Message", description: "Rosario Lim sent you a message about the housekeeping position", time: "15 min ago", read: false },
  { id: 3, type: "application", title: "New Application", description: "Elena Flores applied for Warehouse Supervisor", time: "1 hour ago", read: false },
  { id: 4, type: "status", title: "Application Updated", description: "Maria Santos moved to Interview stage for Head Cook", time: "2 hours ago", read: true },
  { id: 5, type: "system", title: "Job Expiring Soon", description: "Delivery Driver - Metro Manila expires in 3 days", time: "3 hours ago", read: true },
  { id: 6, type: "application", title: "New Application", description: "Fernando Aquino applied for Electrician - Commercial", time: "5 hours ago", read: true },
  { id: 7, type: "message", title: "New Message", description: "Juan dela Cruz confirmed interview for Friday", time: "6 hours ago", read: true },
  { id: 8, type: "status", title: "Offer Accepted", description: "Rosario Lim accepted offer for Housekeeping Staff", time: "1 day ago", read: true },
  { id: 9, type: "system", title: "Subscription Renewed", description: "Professional Plan renewed - next billing Feb 15, 2026", time: "1 day ago", read: true },
  { id: 10, type: "application", title: "New Application", description: "Ricardo Navarro applied for Painter - Interior", time: "2 days ago", read: true },
  { id: 11, type: "status", title: "Application Rejected", description: "Miguel Torres withdrew application for Mason", time: "2 days ago", read: true },
  { id: 12, type: "system", title: "New Feature", description: "KayaScore assessments are now available for all applicants", time: "3 days ago", read: true },
  { id: 13, type: "application", title: "New Application", description: "Carmen Villanueva applied for Quality Inspector", time: "4 days ago", read: true },
  { id: 14, type: "message", title: "New Message", description: "Pedro Garcia asked about driver's license requirements", time: "5 days ago", read: true },
  { id: 15, type: "system", title: "DOLE Advisory", description: "New minimum wage order effective Jan 2026 for NCR", time: "1 week ago", read: true },
];

// ─── Shifts ───────────────────────────────────────────────────────────────────

export type ShiftType = "morning" | "afternoon" | "night" | null;

export interface MockShiftRow {
  worker: MockWorker;
  shifts: ShiftType[]; // Mon-Sun (7 days)
}

export const MOCK_SHIFTS: MockShiftRow[] = [
  { worker: MOCK_WORKERS[0], shifts: ["morning", "morning", null, "morning", "morning", "morning", null] },
  { worker: MOCK_WORKERS[1], shifts: ["morning", "morning", "morning", null, "morning", null, "morning"] },
  { worker: MOCK_WORKERS[2], shifts: ["afternoon", "afternoon", "afternoon", "afternoon", null, null, "afternoon"] },
  { worker: MOCK_WORKERS[4], shifts: ["morning", null, "morning", "morning", "morning", "morning", null] },
  { worker: MOCK_WORKERS[7], shifts: ["morning", "morning", "morning", "morning", "morning", null, null] },
  { worker: MOCK_WORKERS[8], shifts: [null, "night", "night", "night", "night", null, null] },
];

// ─── Documents ────────────────────────────────────────────────────────────────

export interface MockDocument {
  id: number;
  file_name: string;
  worker_name: string;
  type: "resume" | "id" | "certificate" | "contract";
  uploaded_at: string;
  status: "verified" | "pending" | "rejected";
}

export const MOCK_DOCUMENTS: MockDocument[] = [
  { id: 1, file_name: "Juan_dela_Cruz_Resume.pdf", worker_name: "Juan dela Cruz", type: "resume", uploaded_at: "2026-01-15", status: "verified" },
  { id: 2, file_name: "Maria_Santos_NBI_Clearance.pdf", worker_name: "Maria Santos", type: "id", uploaded_at: "2026-01-16", status: "verified" },
  { id: 3, file_name: "Pedro_Garcia_Prof_License.pdf", worker_name: "Pedro Garcia", type: "certificate", uploaded_at: "2026-01-18", status: "pending" },
  { id: 4, file_name: "Ana_Reyes_Resume.pdf", worker_name: "Ana Reyes", type: "resume", uploaded_at: "2026-01-20", status: "verified" },
  { id: 5, file_name: "Roberto_Mendoza_TESDA_Cert.pdf", worker_name: "Roberto Mendoza", type: "certificate", uploaded_at: "2026-01-22", status: "rejected" },
  { id: 6, file_name: "Rosario_Lim_Employment_Contract.pdf", worker_name: "Rosario Lim", type: "contract", uploaded_at: "2026-01-25", status: "verified" },
  { id: 7, file_name: "Fernando_Aquino_PhilID.pdf", worker_name: "Fernando Aquino", type: "id", uploaded_at: "2026-01-28", status: "pending" },
  { id: 8, file_name: "Carmen_Villanueva_SSS.pdf", worker_name: "Carmen Villanueva", type: "id", uploaded_at: "2026-01-30", status: "verified" },
];

// ─── Billing / Invoices ──────────────────────────────────────────────────────

export interface MockInvoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

export const MOCK_INVOICES: MockInvoice[] = [
  { id: "INV-2026-006", date: "2026-02-01", description: "Professional Plan - February 2026", amount: 2999, status: "pending" },
  { id: "INV-2026-005", date: "2026-01-01", description: "Professional Plan - January 2026", amount: 2999, status: "paid" },
  { id: "INV-2025-004", date: "2025-12-01", description: "Professional Plan - December 2025", amount: 2999, status: "paid" },
  { id: "INV-2025-003", date: "2025-11-01", description: "Professional Plan - November 2025", amount: 2999, status: "paid" },
  { id: "INV-2025-002", date: "2025-10-01", description: "Starter Plan - October 2025", amount: 999, status: "paid" },
  { id: "INV-2025-001", date: "2025-09-01", description: "Starter Plan - September 2025", amount: 999, status: "paid" },
];

// ─── Analytics ────────────────────────────────────────────────────────────────

export const MOCK_ANALYTICS = {
  stats: {
    time_to_hire: 8,
    cost_per_hire: 2400,
    open_positions: 12,
    offer_acceptance: 78,
  },
  funnel: [
    { stage: "Applied", count: 245 },
    { stage: "Screened", count: 156 },
    { stage: "Interviewed", count: 89 },
    { stage: "Offered", count: 42 },
    { stage: "Hired", count: 33 },
  ],
  monthly_apps: [
    { month: "Sep", count: 28 },
    { month: "Oct", count: 42 },
    { month: "Nov", count: 55 },
    { month: "Dec", count: 48 },
    { month: "Jan", count: 67 },
    { month: "Feb", count: 38 },
  ],
  top_categories: [
    { category: "Construction", applications: 78, hire_rate: 18 },
    { category: "Food & Beverage", applications: 65, hire_rate: 22 },
    { category: "Logistics", applications: 42, hire_rate: 15 },
    { category: "Retail", applications: 35, hire_rate: 25 },
    { category: "Domestic", applications: 25, hire_rate: 30 },
  ],
  recent_hires: [
    { name: "Rosario Lim", position: "Housekeeping Staff", date: "2026-01-28" },
    { name: "Maria Santos", position: "Head Cook", date: "2026-01-20" },
    { name: "Ana Reyes", position: "Sales Associate", date: "2026-01-15" },
    { name: "Juan dela Cruz", position: "Carpenter - Residential", date: "2026-01-10" },
    { name: "Carmen Villanueva", position: "Quality Inspector", date: "2025-12-28" },
  ],
};

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface MockTeamMember {
  worker: MockWorker;
  role: string;
  department: string;
  hired_at: string;
  kaya_score: number;
  attendance: number;
  performance: "excellent" | "good" | "average" | "needs_improvement";
  notes: string;
}

export const MOCK_TEAM: MockTeamMember[] = [
  { worker: MOCK_WORKERS[0], role: "Senior Carpenter", department: "Construction", hired_at: "2025-06-15", kaya_score: 82, attendance: 96, performance: "excellent", notes: "Team leader material. Consistently delivers quality work." },
  { worker: MOCK_WORKERS[1], role: "Head Cook", department: "Food & Beverage", hired_at: "2025-08-01", kaya_score: 91, attendance: 98, performance: "excellent", notes: "Top performer. Mentors junior staff effectively." },
  { worker: MOCK_WORKERS[3], role: "Sales Associate", department: "Retail", hired_at: "2025-09-10", kaya_score: 88, attendance: 94, performance: "good", notes: "Great with customers. Hit sales targets consistently." },
  { worker: MOCK_WORKERS[5], role: "Quality Inspector", department: "Manufacturing", hired_at: "2025-10-20", kaya_score: 76, attendance: 92, performance: "good", notes: "Very detail-oriented. Good eye for defects." },
  { worker: MOCK_WORKERS[7], role: "Housekeeping Lead", department: "Domestic", hired_at: "2026-01-28", kaya_score: 85, attendance: 100, performance: "excellent", notes: "New hire but already showing strong initiative." },
  { worker: MOCK_WORKERS[8], role: "Electrician", department: "Maintenance", hired_at: "2025-07-05", kaya_score: 71, attendance: 88, performance: "average", notes: "Solid technical skills. Could improve on communication." },
];

// ─── Gig Postings ─────────────────────────────────────────────────────────────

export interface MockGig {
  id: number;
  title: string;
  location: string;
  date: string;
  shift: "morning" | "afternoon" | "night";
  pay: number;
  slots: number;
  filled: number;
  urgency: "urgent" | "today" | "flexible";
  category: string;
  status: "open" | "filled" | "completed";
  tempToHire: boolean;
  instantPay: boolean;
  rating: number;
  verified: boolean;
}

export const MOCK_GIGS: MockGig[] = [
  { id: 1, title: "Event Setup Crew", location: "BGC, Taguig", date: "2026-02-08", shift: "morning", pay: 800, slots: 5, filled: 3, urgency: "urgent", category: "logistics", status: "open", tempToHire: false, instantPay: true, rating: 4.5, verified: true },
  { id: 2, title: "Kitchen Helper (Catering)", location: "Makati Ave, Makati", date: "2026-02-08", shift: "morning", pay: 650, slots: 3, filled: 3, urgency: "today", category: "food-beverage", status: "filled", tempToHire: true, instantPay: false, rating: 4.8, verified: true },
  { id: 3, title: "Warehouse Packer", location: "Novaliches, QC", date: "2026-02-09", shift: "afternoon", pay: 700, slots: 8, filled: 2, urgency: "flexible", category: "logistics", status: "open", tempToHire: true, instantPay: true, rating: 4.2, verified: true },
  { id: 4, title: "Construction Laborer", location: "Ortigas, Pasig", date: "2026-02-08", shift: "morning", pay: 750, slots: 10, filled: 7, urgency: "urgent", category: "construction", status: "open", tempToHire: false, instantPay: false, rating: 4.0, verified: false },
  { id: 5, title: "Dishwasher (Restaurant)", location: "Eastwood, QC", date: "2026-02-09", shift: "night", pay: 600, slots: 2, filled: 0, urgency: "flexible", category: "food-beverage", status: "open", tempToHire: false, instantPay: true, rating: 3.9, verified: true },
  { id: 6, title: "Cleaning Crew", location: "Mall of Asia, Pasay", date: "2026-02-08", shift: "night", pay: 650, slots: 4, filled: 4, urgency: "today", category: "domestic", status: "filled", tempToHire: true, instantPay: false, rating: 4.6, verified: true },
  { id: 7, title: "Delivery Rider (Same-Day)", location: "Metro Manila", date: "2026-02-08", shift: "afternoon", pay: 900, slots: 6, filled: 1, urgency: "urgent", category: "logistics", status: "open", tempToHire: false, instantPay: true, rating: 4.3, verified: true },
  { id: 8, title: "Retail Merchandiser", location: "SM North EDSA, QC", date: "2026-02-10", shift: "morning", pay: 600, slots: 3, filled: 0, urgency: "flexible", category: "retail", status: "open", tempToHire: true, instantPay: false, rating: 4.1, verified: false },
];

// ─── Attendance Records ───────────────────────────────────────────────────────

export interface MockAttendanceRecord {
  worker: MockWorker;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: "present" | "late" | "absent" | "leave";
  hours: number;
  location_verified: boolean;
}

export const MOCK_ATTENDANCE: MockAttendanceRecord[] = [
  { worker: MOCK_WORKERS[0], date: "2026-02-07", check_in: "7:55 AM", check_out: "5:02 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[1], date: "2026-02-07", check_in: "7:50 AM", check_out: "5:00 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[2], date: "2026-02-07", check_in: null, check_out: null, status: "absent", hours: 0, location_verified: false },
  { worker: MOCK_WORKERS[3], date: "2026-02-07", check_in: "8:20 AM", check_out: "5:15 PM", status: "late", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[4], date: "2026-02-07", check_in: "7:58 AM", check_out: "5:00 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[5], date: "2026-02-07", check_in: null, check_out: null, status: "leave", hours: 0, location_verified: false },
  { worker: MOCK_WORKERS[0], date: "2026-02-06", check_in: "7:52 AM", check_out: "5:05 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[1], date: "2026-02-06", check_in: "7:48 AM", check_out: "5:00 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[2], date: "2026-02-06", check_in: "8:30 AM", check_out: "5:10 PM", status: "late", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[3], date: "2026-02-06", check_in: "7:59 AM", check_out: "5:00 PM", status: "present", hours: 8, location_verified: true },
  { worker: MOCK_WORKERS[4], date: "2026-02-06", check_in: "7:55 AM", check_out: "6:00 PM", status: "present", hours: 9, location_verified: true },
  { worker: MOCK_WORKERS[5], date: "2026-02-06", check_in: "8:00 AM", check_out: "5:00 PM", status: "present", hours: 8, location_verified: true },
];

// ─── Performance Reviews ──────────────────────────────────────────────────────

export interface MockReview {
  worker: MockWorker;
  period: string;
  quality: number;
  productivity: number;
  reliability: number;
  teamwork: number;
  overall: number;
  reviewer: string;
  comments: string;
  date: string;
}

export const MOCK_REVIEWS: MockReview[] = [
  { worker: MOCK_WORKERS[0], period: "Q4 2025", quality: 90, productivity: 88, reliability: 95, teamwork: 82, overall: 89, reviewer: "Engr. Santos", comments: "Consistently delivers quality carpentry work. Excellent attendance.", date: "2026-01-10" },
  { worker: MOCK_WORKERS[1], period: "Q4 2025", quality: 95, productivity: 92, reliability: 98, teamwork: 94, overall: 95, reviewer: "Chef Reyes", comments: "Outstanding performance. Leading kitchen team very well.", date: "2026-01-10" },
  { worker: MOCK_WORKERS[3], period: "Q4 2025", quality: 85, productivity: 82, reliability: 88, teamwork: 90, overall: 86, reviewer: "Ms. Cruz", comments: "Great customer interactions. Exceeded sales quota by 15%.", date: "2026-01-12" },
  { worker: MOCK_WORKERS[5], period: "Q4 2025", quality: 88, productivity: 80, reliability: 85, teamwork: 78, overall: 83, reviewer: "Engr. Navarro", comments: "Very detail-oriented inspection work. Could be more proactive.", date: "2026-01-12" },
  { worker: MOCK_WORKERS[7], period: "Q4 2025", quality: 92, productivity: 90, reliability: 100, teamwork: 88, overall: 93, reviewer: "Mrs. Lim", comments: "Exceptional first quarter. Already handling supervisory tasks.", date: "2026-01-15" },
  { worker: MOCK_WORKERS[8], period: "Q4 2025", quality: 78, productivity: 75, reliability: 82, teamwork: 65, overall: 75, reviewer: "Engr. Santos", comments: "Good technical work but needs improvement in team communication.", date: "2026-01-15" },
];

// ─── Payroll ──────────────────────────────────────────────────────────────────

export interface MockPayrollEntry {
  worker: MockWorker;
  period: string;
  days_worked: number;
  daily_rate: number;
  gross_pay: number;
  sss: number;
  philhealth: number;
  pagibig: number;
  tax: number;
  net_pay: number;
  status: "paid" | "processing" | "pending";
}

export const MOCK_PAYROLL: MockPayrollEntry[] = [
  { worker: MOCK_WORKERS[0], period: "Jan 16-31, 2026", days_worked: 12, daily_rate: 700, gross_pay: 8400, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 7700, status: "paid" },
  { worker: MOCK_WORKERS[1], period: "Jan 16-31, 2026", days_worked: 12, daily_rate: 750, gross_pay: 9000, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 8300, status: "paid" },
  { worker: MOCK_WORKERS[3], period: "Jan 16-31, 2026", days_worked: 11, daily_rate: 600, gross_pay: 6600, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 5900, status: "paid" },
  { worker: MOCK_WORKERS[5], period: "Jan 16-31, 2026", days_worked: 12, daily_rate: 650, gross_pay: 7800, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 7100, status: "paid" },
  { worker: MOCK_WORKERS[7], period: "Jan 16-31, 2026", days_worked: 10, daily_rate: 600, gross_pay: 6000, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 5300, status: "processing" },
  { worker: MOCK_WORKERS[8], period: "Jan 16-31, 2026", days_worked: 12, daily_rate: 700, gross_pay: 8400, sss: 400, philhealth: 200, pagibig: 100, tax: 0, net_pay: 7700, status: "pending" },
];

// ─── DOLE Compliance ──────────────────────────────────────────────────────────

export interface MockComplianceItem {
  id: number;
  requirement: string;
  category: "labor" | "safety" | "benefits" | "records";
  status: "compliant" | "action_needed" | "overdue";
  deadline: string | null;
  notes: string;
}

export const MOCK_COMPLIANCE: MockComplianceItem[] = [
  { id: 1, requirement: "Minimum Wage Compliance (NCR - ₱645/day)", category: "labor", status: "compliant", deadline: null, notes: "All workers meet minimum wage. Last audit: Jan 2026." },
  { id: 2, requirement: "SSS Registration & Remittance", category: "benefits", status: "compliant", deadline: "2026-02-15", notes: "Monthly remittance up to date." },
  { id: 3, requirement: "PhilHealth Contributions", category: "benefits", status: "compliant", deadline: "2026-02-15", notes: "All workers enrolled and contributions current." },
  { id: 4, requirement: "Pag-IBIG Fund Contributions", category: "benefits", status: "compliant", deadline: "2026-02-15", notes: "Monthly contributions filed." },
  { id: 5, requirement: "DOLE Rule 1020 - Occupational Safety", category: "safety", status: "action_needed", deadline: "2026-03-01", notes: "Safety officer certification needs renewal. Training scheduled Feb 20." },
  { id: 6, requirement: "Fire Safety Certificate", category: "safety", status: "compliant", deadline: "2026-12-31", notes: "Valid until Dec 2026." },
  { id: 7, requirement: "Employee 201 Files", category: "records", status: "action_needed", deadline: "2026-02-28", notes: "2 new hires missing complete documentation (Rosario, Fernando)." },
  { id: 8, requirement: "13th Month Pay Computation", category: "labor", status: "compliant", deadline: "2026-12-24", notes: "Distributed Dec 2025. Next: Dec 2026." },
  { id: 9, requirement: "Workplace Accident Report Filing", category: "safety", status: "compliant", deadline: null, notes: "Zero incidents since Oct 2025." },
  { id: 10, requirement: "Employment Contract Standards (DO 174)", category: "labor", status: "overdue", deadline: "2026-01-31", notes: "2 contracts need updating to latest DOLE template. Priority." },
];

// ─── Admin Impersonation ──────────────────────────────────────────────────────

export interface MockEmployer {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: "active" | "suspended" | "trial";
}

export const MOCK_EMPLOYERS: MockEmployer[] = [
  { id: 10, name: "Maria Santos", email: "maria@jollibuild.ph", company: "JolliBuild Construction", plan: "Professional", status: "active" },
  { id: 11, name: "Jose Reyes", email: "jose@metrofresh.ph", company: "MetroFresh F&B", plan: "Starter", status: "active" },
  { id: 12, name: "Anna Cruz", email: "anna@luzonlogistics.ph", company: "Luzon Logistics", plan: "Professional", status: "active" },
  { id: 13, name: "Ramon Tan", email: "ramon@ceburetail.ph", company: "Cebu Retail Group", plan: "Enterprise", status: "active" },
  { id: 14, name: "Grace Lim", email: "grace@davaodomestic.ph", company: "Davao Domestic Services", plan: "Starter", status: "trial" },
  { id: 15, name: "Carlos Mendoza", email: "carlos@manilamfg.ph", company: "Manila Manufacturing Co.", plan: "Professional", status: "suspended" },
];

// ─── Employer Rating ─────────────────────────────────────────────────────────

export interface MockEmployerRating {
  overall: number;
  totalReviews: number;
  categories: { label: string; score: number }[];
  recentReviews: { worker: string; rating: number; comment: string; date: string }[];
}

export const MOCK_EMPLOYER_RATING: MockEmployerRating = {
  overall: 4.4,
  totalReviews: 28,
  categories: [
    { label: "Pay Timeliness", score: 4.7 },
    { label: "Work Environment", score: 4.3 },
    { label: "Communication", score: 4.2 },
    { label: "Safety Standards", score: 4.5 },
  ],
  recentReviews: [
    { worker: "Juan dela Cruz", rating: 5, comment: "Bayad on time palagi. Maganda working conditions.", date: "2026-01-28" },
    { worker: "Maria Santos", rating: 4, comment: "Good employer, clear instructions. Medyo strict sa time pero fair naman.", date: "2026-01-20" },
    { worker: "Ana Reyes", rating: 5, comment: "Best employer so far! Very supportive management.", date: "2026-01-15" },
    { worker: "Carmen Villanueva", rating: 4, comment: "Ok naman. Sana mas maaga ibigay ang schedule.", date: "2026-01-10" },
  ],
};

// ─── Smart Matched Workers ──────────────────────────────────────────────────

export interface MockSmartMatch {
  worker: MockWorker;
  matchScore: number;
  matchReasons: string[];
  jobTitle: string;
  availability: "available" | "busy" | "on-leave";
}

export const MOCK_SMART_MATCHES: MockSmartMatch[] = [
  { worker: MOCK_WORKERS[0], matchScore: 95, matchReasons: ["5yr carpentry experience", "High KayaScore (82)", "96% attendance"], jobTitle: "Senior Carpenter", availability: "available" },
  { worker: MOCK_WORKERS[1], matchScore: 92, matchReasons: ["Cooking & food prep skills", "Top performer (91)", "Team leader"], jobTitle: "Head Cook", availability: "available" },
  { worker: MOCK_WORKERS[3], matchScore: 88, matchReasons: ["Customer service expert", "Sales quota +15%", "Great communicator"], jobTitle: "Sales Associate", availability: "available" },
  { worker: MOCK_WORKERS[10], matchScore: 82, matchReasons: ["Multi-skill: carpentry, painting, masonry", "Marikina-based", "Flexible schedule"], jobTitle: "General Contractor", availability: "available" },
  { worker: MOCK_WORKERS[7], matchScore: 78, matchReasons: ["100% attendance record", "Quick learner", "Already supervisory"], jobTitle: "Housekeeping Lead", availability: "busy" },
];

// ─── Companies ────────────────────────────────────────────────────────────────

export interface MockCompany {
  id: number;
  name: string;
  industry: string;
  size: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  logo_url: string;
  verified: boolean;
  created_at: string;
  active_jobs: number;
  total_hires: number;
  rating: number;
  plan: "starter" | "professional" | "enterprise";
}

export const MOCK_COMPANIES: MockCompany[] = [
  { id: 1, name: "JolliBuild Construction", industry: "Construction", size: "50-100", location: "Quezon City", email: "hr@jollibuild.ph", phone: "+63 2 8123 4567", website: "www.jollibuild.ph", logo_url: "/company-logo.png", verified: true, created_at: "2025-01-15", active_jobs: 8, total_hires: 145, rating: 4.4, plan: "professional" },
  { id: 2, name: "MetroFresh F&B", industry: "Food & Beverage", size: "20-50", location: "Makati", email: "careers@metrofresh.ph", phone: "+63 2 8234 5678", website: "www.metrofresh.ph", logo_url: "/company-logo.png", verified: true, created_at: "2025-03-20", active_jobs: 5, total_hires: 78, rating: 4.7, plan: "starter" },
  { id: 3, name: "Luzon Logistics", industry: "Logistics", size: "100-200", location: "Taguig", email: "jobs@luzonlogistics.ph", phone: "+63 2 8345 6789", website: "www.luzonlogistics.ph", logo_url: "/company-logo.png", verified: true, created_at: "2024-11-10", active_jobs: 12, total_hires: 210, rating: 4.2, plan: "professional" },
  { id: 4, name: "Cebu Retail Group", industry: "Retail", size: "200+", location: "Cebu City", email: "hiring@ceburetail.ph", phone: "+63 32 234 5678", website: "www.ceburetail.ph", logo_url: "/company-logo.png", verified: true, created_at: "2024-08-05", active_jobs: 15, total_hires: 340, rating: 4.5, plan: "enterprise" },
  { id: 5, name: "Davao Domestic Services", industry: "Domestic Services", size: "10-20", location: "Davao City", email: "admin@davaodomestic.ph", phone: "+63 82 345 6789", website: "www.davaodomestic.ph", logo_url: "/company-logo.png", verified: false, created_at: "2025-12-01", active_jobs: 3, total_hires: 22, rating: 4.0, plan: "starter" },
  { id: 6, name: "Manila Manufacturing Co.", industry: "Manufacturing", size: "100-200", location: "Valenzuela", email: "hr@manilamfg.ph", phone: "+63 2 8456 7890", website: "www.manilamfg.ph", logo_url: "/company-logo.png", verified: true, created_at: "2024-06-15", active_jobs: 0, total_hires: 156, rating: 3.9, plan: "professional" },
];

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export interface MockJob {
  id: number;
  title: string;
  company_id: number;
  company_name: string;
  category: string;
  type: "full-time" | "part-time" | "contract" | "gig";
  location: string;
  salary_min: number;
  salary_max: number;
  description: string;
  requirements: string[];
  benefits: string[];
  status: "active" | "closed" | "filled" | "draft";
  posted_at: string;
  expires_at: string;
  applications_count: number;
  views: number;
}

export const MOCK_JOBS: MockJob[] = [
  { id: 1, title: "Carpenter - Residential Projects", company_id: 1, company_name: "JolliBuild Construction", category: "construction", type: "full-time", location: "Quezon City", salary_min: 18000, salary_max: 25000, description: "We're looking for experienced carpenters for residential construction projects. Must have at least 3 years of experience in finishing work, cabinet installation, and general carpentry.", requirements: ["At least 3 years carpentry experience", "Knowledgeable in reading blueprints", "Own basic hand tools", "Can work in Quezon City area"], benefits: ["SSS, PhilHealth, Pag-IBIG", "13th month pay", "OT pay", "Tool allowance"], status: "active", posted_at: "2026-01-20", expires_at: "2026-02-20", applications_count: 24, views: 156 },
  { id: 2, title: "Head Cook", company_id: 2, company_name: "MetroFresh F&B", category: "food-beverage", type: "full-time", location: "Makati", salary_min: 20000, salary_max: 28000, description: "Lead our kitchen team in preparing high-quality Filipino and international cuisine. Manage inventory, train junior cooks, and maintain food safety standards.", requirements: ["5+ years cooking experience", "Experience in restaurant/catering", "Food safety certification", "Can lead a team of 5-8 people"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Meal allowance", "Service incentive leave", "Training opportunities"], status: "active", posted_at: "2026-01-18", expires_at: "2026-02-18", applications_count: 18, views: 89 },
  { id: 3, title: "Delivery Driver - Metro Manila", company_id: 3, company_name: "Luzon Logistics", category: "logistics", type: "full-time", location: "Metro Manila", salary_min: 16000, salary_max: 20000, description: "Deliver packages and goods across Metro Manila. Must have professional driver's license and clean driving record. Fuel and vehicle provided.", requirements: ["Professional driver's license", "At least 2 years driving experience", "Good knowledge of Metro Manila roads", "Clean NBI clearance"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Fuel allowance", "Mobile load allowance", "Overtime pay"], status: "active", posted_at: "2026-01-22", expires_at: "2026-02-22", applications_count: 31, views: 203 },
  { id: 4, title: "Sales Associate - Retail", company_id: 4, company_name: "Cebu Retail Group", category: "retail", type: "full-time", location: "Cebu City", salary_min: 15000, salary_max: 19000, description: "Assist customers, manage inventory, and achieve sales targets. Great opportunity for growth in a fast-paced retail environment.", requirements: ["High school graduate", "Good communication skills", "Customer service oriented", "Can work on weekends"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Sales commission", "Employee discount", "Career advancement"], status: "active", posted_at: "2026-01-25", expires_at: "2026-02-25", applications_count: 42, views: 178 },
  { id: 5, title: "Housekeeping Staff", company_id: 5, company_name: "Davao Domestic Services", category: "domestic", type: "part-time", location: "Davao City", salary_min: 500, salary_max: 700, description: "Part-time housekeeping for residential clients. Flexible schedule, daily or weekly arrangements available.", requirements: ["Experience in cleaning/housekeeping", "Trustworthy and reliable", "Can provide references", "Lives in Davao City area"], benefits: ["Flexible schedule", "Transportation allowance", "Regular clients available"], status: "active", posted_at: "2026-01-28", expires_at: "2026-02-28", applications_count: 15, views: 67 },
  { id: 6, title: "Warehouse Supervisor", company_id: 3, company_name: "Luzon Logistics", category: "logistics", type: "full-time", location: "Taguig", salary_min: 22000, salary_max: 30000, description: "Supervise warehouse operations including receiving, storage, and dispatch. Manage team of 10-15 warehouse staff.", requirements: ["3+ years warehouse experience", "Leadership experience", "Computer literate (Excel, inventory systems)", "Can work shifting schedule"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Night differential", "Performance bonus", "HMO after 6 months"], status: "active", posted_at: "2026-01-15", expires_at: "2026-02-15", applications_count: 19, views: 134 },
  { id: 7, title: "Quality Inspector - Manufacturing", company_id: 6, company_name: "Manila Manufacturing Co.", category: "manufacturing", type: "full-time", location: "Valenzuela", salary_min: 18000, salary_max: 24000, description: "Inspect finished products for quality compliance. Document defects and work with production team to maintain standards.", requirements: ["Technical/vocational graduate", "Experience in quality control", "Detail-oriented", "Can read technical drawings"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Perfect attendance bonus", "Uniform provided", "Free meals"], status: "filled", posted_at: "2025-12-20", expires_at: "2026-01-20", applications_count: 28, views: 145 },
  { id: 8, title: "Electrician - Commercial", company_id: 1, company_name: "JolliBuild Construction", category: "construction", type: "contract", location: "Makati", salary_min: 700, salary_max: 900, description: "3-month contract for commercial building fit-out. Install electrical wiring, fixtures, and systems.", requirements: ["TESDA NC2 Electrical Installation", "5+ years commercial experience", "Can read electrical plans", "Own tools"], benefits: ["High daily rate", "Project completion bonus", "Possible regularization"], status: "active", posted_at: "2026-02-01", expires_at: "2026-02-15", applications_count: 12, views: 78 },
  { id: 9, title: "Kitchen Helper", company_id: 2, company_name: "MetroFresh F&B", category: "food-beverage", type: "full-time", location: "Makati", salary_min: 14000, salary_max: 16000, description: "Assist cooks with food preparation, maintain cleanliness, and handle basic cooking tasks.", requirements: ["At least high school level", "Willing to learn", "Can work under pressure", "Physically fit"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Free meals", "Service charge share", "Training provided"], status: "active", posted_at: "2026-01-30", expires_at: "2026-03-01", applications_count: 35, views: 189 },
  { id: 10, title: "Painter - Interior/Exterior", company_id: 1, company_name: "JolliBuild Construction", category: "construction", type: "full-time", location: "Quezon City", salary_min: 17000, salary_max: 23000, description: "Paint residential and commercial buildings. Must have experience in both interior and exterior painting.", requirements: ["3+ years painting experience", "Knowledge of paint types and application", "Can work at heights", "Own basic painting tools"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Tools allowance", "Project bonuses", "Transportation support"], status: "active", posted_at: "2026-02-03", expires_at: "2026-03-03", applications_count: 16, views: 92 },
  { id: 11, title: "Customer Service Representative", company_id: 4, company_name: "Cebu Retail Group", category: "retail", type: "full-time", location: "Cebu City", salary_min: 16000, salary_max: 20000, description: "Handle customer inquiries, process orders, and resolve complaints via phone and in-person.", requirements: ["College level or graduate", "Excellent communication skills", "Customer service experience preferred", "Computer literate"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Performance incentives", "Career growth", "Training programs"], status: "active", posted_at: "2026-02-05", expires_at: "2026-03-05", applications_count: 27, views: 142 },
  { id: 12, title: "Mason - Foundation & Structural", company_id: 1, company_name: "JolliBuild Construction", category: "construction", type: "full-time", location: "Paranaque", salary_min: 19000, salary_max: 26000, description: "Experienced mason for foundation work, plastering, and structural masonry on residential projects.", requirements: ["5+ years masonry experience", "Foundation and structural work", "Can read plans", "Physically fit"], benefits: ["SSS, PhilHealth, Pag-IBIG", "13th month", "Project completion bonus", "Tool support"], status: "active", posted_at: "2026-01-12", expires_at: "2026-02-12", applications_count: 21, views: 118 },
  { id: 13, title: "Cashier", company_id: 2, company_name: "MetroFresh F&B", category: "food-beverage", type: "part-time", location: "Makati", salary_min: 400, salary_max: 500, description: "Part-time cashier for busy restaurant. Handle cash and card transactions, customer orders.", requirements: ["High school graduate", "Basic math skills", "Honest and trustworthy", "Can work weekends"], benefits: ["Free meals during shift", "Service charge share", "Flexible hours"], status: "active", posted_at: "2026-02-06", expires_at: "2026-03-06", applications_count: 38, views: 167 },
  { id: 14, title: "Warehouse Packer", company_id: 3, company_name: "Luzon Logistics", category: "logistics", type: "full-time", location: "Novaliches, QC", salary_min: 15000, salary_max: 17000, description: "Pack and prepare orders for shipment. Maintain accurate inventory records.", requirements: ["Physically fit", "Can work fast-paced environment", "Attention to detail", "Team player"], benefits: ["SSS, PhilHealth, Pag-IBIG", "OT pay", "13th month", "Safe work environment"], status: "active", posted_at: "2026-02-04", expires_at: "2026-03-04", applications_count: 29, views: 156 },
  { id: 15, title: "Welder - Structural", company_id: 6, company_name: "Manila Manufacturing Co.", category: "manufacturing", type: "full-time", location: "Valenzuela", salary_min: 20000, salary_max: 28000, description: "Structural welding for manufacturing facility. SMAW and GMAW processes.", requirements: ["TESDA NC2 Welding", "5+ years welding experience", "Can read welding symbols", "Willing to work OT"], benefits: ["SSS, PhilHealth, Pag-IBIG", "High OT rates", "Welding gear provided", "Safety equipment"], status: "closed", posted_at: "2026-01-05", expires_at: "2026-02-05", applications_count: 22, views: 134 },
  { id: 16, title: "Plumber - Commercial Projects", company_id: 1, company_name: "JolliBuild Construction", category: "construction", type: "contract", location: "Ortigas, Pasig", salary_min: 750, salary_max: 950, description: "2-month contract for office building plumbing installation. Water supply and drainage systems.", requirements: ["TESDA NC2 Plumbing", "Commercial plumbing experience", "Can read plumbing plans", "Own tools"], benefits: ["Daily rate ₱750-950", "Contract completion bonus", "Possible extension"], status: "active", posted_at: "2026-02-07", expires_at: "2026-02-21", applications_count: 9, views: 65 },
  { id: 17, title: "Security Guard - Night Shift", company_id: 4, company_name: "Cebu Retail Group", category: "security", type: "full-time", location: "Cebu City", salary_min: 16000, salary_max: 18000, description: "Night shift security for retail stores. Monitor premises, conduct patrols, maintain safety.", requirements: ["Security license", "At least 2 years experience", "Physically fit", "Can work night shift"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Night differential", "Uniform provided", "13th month"], status: "active", posted_at: "2026-02-02", expires_at: "2026-03-02", applications_count: 14, views: 88 },
  { id: 18, title: "Sewing Machine Operator", company_id: 6, company_name: "Manila Manufacturing Co.", category: "manufacturing", type: "full-time", location: "Valenzuela", salary_min: 15000, salary_max: 19000, description: "Operate industrial sewing machines for garment production. Meet daily quotas.", requirements: ["Sewing machine experience", "Can work fast and accurate", "Team player", "Willing to work OT"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Production bonus", "Free meals", "Transportation allowance"], status: "active", posted_at: "2026-01-29", expires_at: "2026-02-28", applications_count: 25, views: 123 },
  { id: 19, title: "Forklift Operator", company_id: 3, company_name: "Luzon Logistics", category: "logistics", type: "full-time", location: "Taguig", salary_min: 18000, salary_max: 22000, description: "Operate forklift for warehouse operations. Load/unload trucks, move pallets safely.", requirements: ["Valid forklift license/training", "2+ years experience", "Safety conscious", "Can work shifts"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Shift differential", "Safety incentive", "HMO"], status: "active", posted_at: "2026-01-26", expires_at: "2026-02-26", applications_count: 11, views: 94 },
  { id: 20, title: "Janitor/Utility Worker", company_id: 5, company_name: "Davao Domestic Services", category: "domestic", type: "full-time", location: "Davao City", salary_min: 14000, salary_max: 16000, description: "General cleaning and maintenance for commercial buildings. Day shift.", requirements: ["Experience in janitorial work", "Physically fit", "Trustworthy", "Can work independently"], benefits: ["SSS, PhilHealth, Pag-IBIG", "Cleaning supplies provided", "Uniform", "13th month"], status: "active", posted_at: "2026-02-08", expires_at: "2026-03-08", applications_count: 18, views: 102 },
];

// ─── Applications ─────────────────────────────────────────────────────────────

export interface MockApplication {
  id: number;
  job_id: number;
  job_title: string;
  worker_id: number;
  worker_name: string;
  worker_email: string;
  worker_phone: string;
  worker_location: string;
  applied_at: string;
  status: "applied" | "screening" | "interview" | "offered" | "rejected" | "hired";
  kaya_score: number | null;
  notes: string;
  resume_url: string;
}

export const MOCK_APPLICATIONS: MockApplication[] = [
  { id: 1, job_id: 1, job_title: "Carpenter - Residential Projects", worker_id: 1, worker_name: "Juan dela Cruz", worker_email: "juan@gmail.com", worker_phone: "+63 917 123 4567", worker_location: "Quezon City", applied_at: "2026-02-01 09:15:00", status: "interview", kaya_score: 82, notes: "Strong portfolio. Interview scheduled Feb 12.", resume_url: "/resumes/juan.pdf" },
  { id: 2, job_id: 2, job_title: "Head Cook", worker_id: 2, worker_name: "Maria Santos", worker_email: "maria@gmail.com", worker_phone: "+63 918 234 5678", worker_location: "Makati", applied_at: "2026-01-28 14:30:00", status: "offered", kaya_score: 91, notes: "Excellent cooking demo. Offer sent Feb 8.", resume_url: "/resumes/maria.pdf" },
  { id: 3, job_id: 3, job_title: "Delivery Driver - Metro Manila", worker_id: 3, worker_name: "Pedro Garcia", worker_email: "pedro@gmail.com", worker_phone: "+63 919 345 6789", worker_location: "Taguig", applied_at: "2026-02-02 11:00:00", status: "screening", kaya_score: 68, notes: "Has professional license. Checking references.", resume_url: "/resumes/pedro.pdf" },
  { id: 4, job_id: 4, job_title: "Sales Associate - Retail", worker_id: 4, worker_name: "Ana Reyes", worker_email: "ana@gmail.com", worker_phone: "+63 920 456 7890", worker_location: "Pasig", applied_at: "2026-02-03 15:45:00", status: "hired", kaya_score: 88, notes: "Started Feb 10. Performing well.", resume_url: "/resumes/ana.pdf" },
  { id: 5, job_id: 1, job_title: "Carpenter - Residential Projects", worker_id: 11, worker_name: "Ricardo Navarro", worker_email: "ricardo@gmail.com", worker_phone: "+63 927 123 4560", worker_location: "Marikina", applied_at: "2026-02-04 08:20:00", status: "applied", kaya_score: null, notes: "New application. Needs review.", resume_url: "/resumes/ricardo.pdf" },
  { id: 6, job_id: 5, job_title: "Housekeeping Staff", worker_id: 8, worker_name: "Rosario Lim", worker_email: "rosario@gmail.com", worker_phone: "+63 924 890 1234", worker_location: "Davao City", applied_at: "2026-02-05 16:10:00", status: "hired", kaya_score: 85, notes: "Started Feb 9. Perfect fit.", resume_url: "/resumes/rosario.pdf" },
  { id: 7, job_id: 6, job_title: "Warehouse Supervisor", worker_id: 12, worker_name: "Elena Flores", worker_email: "elena@gmail.com", worker_phone: "+63 928 234 5671", worker_location: "Valenzuela", applied_at: "2026-01-25 10:30:00", status: "interview", kaya_score: null, notes: "Second interview scheduled Feb 14.", resume_url: "/resumes/elena.pdf" },
  { id: 8, job_id: 8, job_title: "Electrician - Commercial", worker_id: 9, worker_name: "Fernando Aquino", worker_email: "fernando@gmail.com", worker_phone: "+63 925 901 2345", worker_location: "Las Pinas", applied_at: "2026-02-06 13:00:00", status: "screening", kaya_score: null, notes: "Verifying TESDA certification.", resume_url: "/resumes/fernando.pdf" },
  { id: 9, job_id: 7, job_title: "Quality Inspector - Manufacturing", worker_id: 6, worker_name: "Carmen Villanueva", worker_email: "carmen@gmail.com", worker_phone: "+63 922 678 9012", worker_location: "Paranaque", applied_at: "2026-01-10 09:40:00", status: "hired", kaya_score: 76, notes: "Hired Jan 20. Position filled.", resume_url: "/resumes/carmen.pdf" },
  { id: 10, job_id: 12, job_title: "Mason - Foundation & Structural", worker_id: 7, worker_name: "Miguel Torres", worker_email: "miguel@gmail.com", worker_phone: "+63 923 789 0123", worker_location: "Cebu City", applied_at: "2026-01-18 11:15:00", status: "rejected", kaya_score: 71, notes: "Withdrew application.", resume_url: "/resumes/miguel.pdf" },
  { id: 11, job_id: 9, job_title: "Kitchen Helper", worker_id: 10, worker_name: "Lourdes Bautista", worker_email: "lourdes@gmail.com", worker_phone: "+63 926 012 3456", worker_location: "Caloocan", applied_at: "2026-02-07 14:25:00", status: "applied", kaya_score: null, notes: "Just applied. Pending review.", resume_url: "/resumes/lourdes.pdf" },
  { id: 12, job_id: 1, job_title: "Carpenter - Residential Projects", worker_id: 5, worker_name: "Roberto Mendoza", worker_email: "roberto@gmail.com", worker_phone: "+63 921 567 8901", worker_location: "Mandaluyong", applied_at: "2026-02-01 12:00:00", status: "rejected", kaya_score: 45, notes: "Low KayaScore. Not a good fit.", resume_url: "/resumes/roberto.pdf" },
];

// ─── Platform Stats (for Admin) ───────────────────────────────────────────────

export interface MockPlatformStats {
  total_users: number;
  total_companies: number;
  total_workers: number;
  total_jobs: number;
  active_jobs: number;
  total_applications: number;
  total_hires: number;
  revenue_monthly: number;
  growth_rate: number;
}

export const MOCK_PLATFORM_STATS: MockPlatformStats = {
  total_users: 1847,
  total_companies: 156,
  total_workers: 1691,
  total_jobs: 342,
  active_jobs: 187,
  total_applications: 4521,
  total_hires: 892,
  revenue_monthly: 427500,
  growth_rate: 23.5,
};
