import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildQS(params?: Record<string, string | number>): string {
  if (!params) return "";
  return "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString();
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers: customHeaders, ...rest } = options;

  const accessToken = token || Cookies.get("access_token");

  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  if (rest.body) headers["Content-Type"] = "application/json";

  Object.assign(headers, customHeaders as Record<string, string>);

  const res = await fetch(`${API_URL}${endpoint}`, { headers, ...rest });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(
      data?.detail || `Request failed with status ${res.status}`,
      res.status,
      data,
    );
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";

function persistTokens(data: TokenResponse): void {
  Cookies.set("access_token", data.access_token, { expires: 1, secure: isSecure, sameSite: "strict" });
  Cookies.set("refresh_token", data.refresh_token, { expires: 7, secure: isSecure, sameSite: "strict" });
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  const data = await request<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  persistTokens(data);
  return data;
}

export async function register(body: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<TokenResponse> {
  const data = await request<TokenResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  persistTokens(data);
  return data;
}

export async function refreshToken(): Promise<TokenResponse> {
  const rt = Cookies.get("refresh_token");
  if (!rt) throw new Error("No refresh token");
  const data = await request<TokenResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: rt }),
  });
  persistTokens(data);
  return data;
}

export async function logout() {
  const rt = Cookies.get("refresh_token");
  if (rt) {
    await request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: rt }),
    }).catch(() => {});
  }
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export interface User {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  skills: string[] | null;
  created_at: string;
}

export async function getMe(): Promise<User> {
  return request<User>("/users/me");
}

export async function getUser(id: number): Promise<User> {
  return request<User>(`/users/${id}`);
}

// ---------------------------------------------------------------------------
// Companies
// ---------------------------------------------------------------------------

export interface Company {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  logo_url: string | null;
  industry: string | null;
  size: string | null;
  location: string | null;
  website: string | null;
  verified: boolean;
  created_at: string;
}

export async function getMyCompanies(): Promise<Company[]> {
  return request<Company[]>("/companies/mine");
}

export interface CompanyStats {
  active_jobs: number;
  total_applicants: number;
  hired: number;
  pending_review: number;
}

export async function getCompanyStats(id: number): Promise<CompanyStats> {
  return request<CompanyStats>(`/companies/${id}/stats`);
}

export async function createCompany(body: Partial<Company>): Promise<Company> {
  return request<Company>("/companies", { method: "POST", body: JSON.stringify(body) });
}

export async function getCompany(id: number): Promise<Company> {
  return request<Company>(`/companies/${id}`);
}

export async function updateCompany(id: number, body: Partial<Company>): Promise<Company> {
  return request<Company>(`/companies/${id}`, { method: "PATCH", body: JSON.stringify(body) });
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export interface Job {
  id: number;
  company_id: number;
  posted_by: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  job_type: string;
  status: string;
  posted_at: string;
  expires_at: string | null;
  requirements?: string[];
  benefits?: string[];
  applications_count?: number;
  views?: number;
}

export interface JobListResponse {
  items: Job[];
  total: number;
  page: number;
  page_size: number;
}

export async function listJobs(params?: Record<string, string | number>): Promise<JobListResponse> {
  const qs = buildQS(params);
  return request<JobListResponse>(`/jobs${qs}`);
}

export async function getJob(id: number): Promise<Job> {
  return request<Job>(`/jobs/${id}`);
}

export type CreateJobInput = Pick<Job, "company_id" | "title" | "description" | "category" | "location" | "job_type"> &
  Partial<Pick<Job, "salary_min" | "salary_max" | "requirements" | "benefits" | "expires_at">>;

export type UpdateJobInput = Partial<Pick<Job, "title" | "description" | "category" | "location" | "salary_min" | "salary_max" | "job_type" | "status" | "requirements" | "benefits" | "expires_at">>;

export async function createJob(body: CreateJobInput): Promise<Job> {
  return request<Job>("/jobs", { method: "POST", body: JSON.stringify(body) });
}

export async function updateJob(id: number, body: UpdateJobInput): Promise<Job> {
  return request<Job>(`/jobs/${id}`, { method: "PATCH", body: JSON.stringify(body) });
}

export async function deleteJob(id: number): Promise<void> {
  return request<void>(`/jobs/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------

export interface Application {
  id: number;
  job_id: number;
  worker_id: number;
  status: string;
  notes: string | null;
  applied_at: string;
  updated_at: string;
}

export interface ApplicationListResponse {
  items: Application[];
  total: number;
}

export async function listJobApplications(
  jobId: number,
  params?: Record<string, string | number>,
): Promise<ApplicationListResponse> {
  const qs = buildQS(params);
  return request<ApplicationListResponse>(`/applications/jobs/${jobId}/applications${qs}`);
}

export async function updateApplicationStatus(id: number, status: string): Promise<Application> {
  return request<Application>(`/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function getCompanyJobs(
  companyId: number,
  params?: Record<string, string | number>,
): Promise<JobListResponse> {
  const qs = buildQS(params);
  return request<JobListResponse>(`/companies/${companyId}/jobs${qs}`);
}

// ---------------------------------------------------------------------------
// Gigs
// ---------------------------------------------------------------------------

export interface Gig {
  id: number;
  company_id: number;
  posted_by: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  shift: string;
  time_start: string;
  time_end: string;
  pay_per_shift: number;
  slots_total: number;
  slots_taken: number;
  urgency: string;
  status: string;
  temp_to_hire: boolean;
  instant_pay: boolean;
  verified: boolean;
  rating: number;
  created_at: string;
}

export interface GigListResponse {
  items: Gig[];
  total: number;
  page: number;
  page_size: number;
}

export async function listGigs(params?: Record<string, string | number>): Promise<GigListResponse> {
  const qs = buildQS(params);
  return request<GigListResponse>(`/gigs${qs}`);
}

export async function getGig(id: number): Promise<Gig> {
  return request<Gig>(`/gigs/${id}`);
}

export async function createGig(body: Partial<Gig>): Promise<Gig> {
  return request<Gig>("/gigs", { method: "POST", body: JSON.stringify(body) });
}

export async function updateGig(id: number, body: Partial<Gig>): Promise<Gig> {
  return request<Gig>(`/gigs/${id}`, { method: "PATCH", body: JSON.stringify(body) });
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export interface ReviewOut {
  id: number;
  company_id: number;
  worker_id: number;
  rating: number;
  pay_timeliness: number;
  work_environment: number;
  communication: number;
  safety_standards: number;
  comment: string | null;
  created_at: string;
}

export interface CompanyRating {
  overall: number;
  total_reviews: number;
  pay_timeliness: number;
  work_environment: number;
  communication: number;
  safety_standards: number;
}

export async function getCompanyRating(companyId: number): Promise<CompanyRating> {
  return request<CompanyRating>(`/reviews/company/${companyId}/rating`);
}

export async function listCompanyReviews(
  companyId: number,
  params?: Record<string, string | number>,
): Promise<ReviewOut[]> {
  const qs = buildQS(params);
  return request<ReviewOut[]>(`/reviews/company/${companyId}${qs}`);
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export interface PlatformStats {
  total_users: number;
  total_jobs: number;
  total_applications: number;
  total_companies: number;
  total_hires: number;
}

export async function getAdminStats(): Promise<PlatformStats> {
  return request<PlatformStats>("/admin/stats");
}

export interface AdminListResponse<T> {
  items: T[];
  total: number;
}

export async function adminListUsers(params?: Record<string, string | number>) {
  const qs = buildQS(params);
  return request<AdminListResponse<User>>(`/admin/users${qs}`);
}

export async function adminUpdateUserRole(userId: number, role: string) {
  return request<{ id: number; role: string }>(`/admin/users/${userId}/role?role=${role}`, { method: "PATCH" });
}

export async function adminListJobs(params?: Record<string, string | number>) {
  const qs = buildQS(params);
  return request<AdminListResponse<Job>>(`/admin/jobs${qs}`);
}

export async function adminModerateJob(jobId: number, status: string) {
  return request<{ id: number; status: string }>(`/admin/jobs/${jobId}/status?status=${status}`, { method: "PATCH" });
}

export async function adminListCompanies(params?: Record<string, string | number>) {
  const qs = buildQS(params);
  return request<AdminListResponse<Company>>(`/admin/companies${qs}`);
}

export async function adminVerifyCompany(companyId: number, verified: boolean) {
  return request<{ id: number; verified: boolean }>(`/admin/companies/${companyId}/verify?verified=${verified}`, { method: "PATCH" });
}

// ---------------------------------------------------------------------------
// Contact Submissions (Admin)
// ---------------------------------------------------------------------------

export interface ContactSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function adminListContacts(params?: Record<string, string | number>) {
  const qs = buildQS(params);
  return request<AdminListResponse<ContactSubmission>>(`/contact${qs}`);
}

export async function adminMarkContactRead(contactId: number, read: boolean = true) {
  return request<{ id: number; read: boolean }>(`/contact/${contactId}/read?read=${read}`, { method: "PATCH" });
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export interface Conversation {
  id: number;
  employer_id: number;
  worker_id: number;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
  created_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  read: boolean;
  created_at: string;
}

export async function listConversations(): Promise<Conversation[]> {
  return request<Conversation[]>("/messages/conversations");
}

export async function createConversation(workerId: number): Promise<Conversation> {
  return request<Conversation>("/messages/conversations", {
    method: "POST",
    body: JSON.stringify({ worker_id: workerId }),
  });
}

export async function listMessages(conversationId: number, params?: Record<string, string | number>): Promise<Message[]> {
  const qs = buildQS(params);
  return request<Message[]>(`/messages/conversations/${conversationId}/messages${qs}`);
}

export async function sendMessage(conversationId: number, content: string): Promise<Message> {
  return request<Message>(`/messages/conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function markConversationRead(conversationId: number): Promise<void> {
  return request<void>(`/messages/conversations/${conversationId}/read`, { method: "PATCH" });
}

// ---------------------------------------------------------------------------
// Performance
// ---------------------------------------------------------------------------

export interface Performance {
  id: number;
  worker_id: number;
  overall_score: number;
  level: string;
  total_shifts: number;
  completion_rate: number;
  on_time_rate: number;
  avg_rating: number;
  badges: string[] | null;
  updated_at: string;
}

export async function getWorkerPerformance(workerId: number): Promise<Performance> {
  return request<Performance>(`/performance/${workerId}`);
}

// ---------------------------------------------------------------------------
// KayaScore
// ---------------------------------------------------------------------------

export interface KayaScoreAssessment {
  id: number;
  user_id: number;
  status: string;
  domain_scores: Record<string, number> | null;
  overall_score: number | null;
  started_at: string;
  completed_at: string | null;
}

export interface KayaScoreQuestion {
  id: number;
  domain: string;
  trait: string;
  question_text: string;
  reverse_scored: boolean;
}

export interface KayaScoreBenchmark {
  id: number;
  job_category: string;
  trait: string;
  min_score: number;
  ideal_score: number;
}

export async function getKayaScoreQuestions(): Promise<KayaScoreQuestion[]> {
  return request<KayaScoreQuestion[]>("/kayascore/questions");
}

export async function getWorkerKayaScores(params?: Record<string, string | number>): Promise<KayaScoreAssessment[]> {
  const qs = buildQS(params);
  return request<KayaScoreAssessment[]>(`/kayascore/my-scores${qs}`);
}

export async function getKayaScoreAssessment(id: number): Promise<KayaScoreAssessment> {
  return request<KayaScoreAssessment>(`/kayascore/${id}`);
}

export async function getKayaScoreBenchmarks(category: string): Promise<KayaScoreBenchmark[]> {
  return request<KayaScoreBenchmark[]>(`/kayascore/benchmarks/${encodeURIComponent(category)}`);
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

export interface JobMatch {
  job: Job;
  score: number;
  breakdown: Record<string, number>;
}

export interface WorkerPreference {
  id: number;
  worker_id: number;
  preferred_categories: string[];
  min_salary: number | null;
}

export async function getMatchedWorkers(): Promise<JobMatch[]> {
  return request<JobMatch[]>("/matching/recommendations");
}

export async function getJobMatchScore(jobId: number): Promise<{ score: number; breakdown: Record<string, number> }> {
  return request<{ score: number; breakdown: Record<string, number> }>(`/matching/score/${jobId}`);
}

// ---------------------------------------------------------------------------
// Uploads
// ---------------------------------------------------------------------------

export interface FileUpload {
  id: number;
  user_id: number;
  file_url: string;
  file_name: string;
  file_type: string;
  uploaded_at: string;
}

export async function listMyUploads(): Promise<FileUpload[]> {
  return request<FileUpload[]>("/uploads/my-files");
}

export async function deleteUpload(fileId: number): Promise<void> {
  return request<void>(`/uploads/${fileId}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Missions
// ---------------------------------------------------------------------------

export interface Mission {
  id: number;
  title: string;
  description: string;
  mission_type: string;
  xp_reward: number;
  target_count: number;
  active: boolean;
}

export interface WorkerMission {
  id: number;
  mission_id: number;
  worker_id: number;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  mission: Mission;
}

export async function listMissions(params?: Record<string, string | number>): Promise<Mission[]> {
  const qs = buildQS(params);
  return request<Mission[]>(`/missions${qs}`);
}

// ---------------------------------------------------------------------------
// Learning (Admin)
// ---------------------------------------------------------------------------

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_hours: number;
  tesda_aligned: boolean;
  created_at: string;
}

export interface CourseModule {
  id: number;
  course_id: number;
  title: string;
  content: string;
  order: number;
}

export async function listCourses(params?: Record<string, string | number>): Promise<Course[]> {
  const qs = buildQS(params);
  return request<Course[]>(`/learning/courses${qs}`);
}

export async function getCourse(courseId: number): Promise<Course> {
  return request<Course>(`/learning/courses/${courseId}`);
}

export async function createCourse(body: Partial<Course>): Promise<Course> {
  return request<Course>("/learning/courses", { method: "POST", body: JSON.stringify(body) });
}

export async function getCourseModules(courseId: number): Promise<CourseModule[]> {
  return request<CourseModule[]>(`/learning/courses/${courseId}/modules`);
}

export async function addCourseModule(courseId: number, body: Partial<CourseModule>): Promise<CourseModule> {
  return request<CourseModule>(`/learning/courses/${courseId}/modules`, { method: "POST", body: JSON.stringify(body) });
}

// ---------------------------------------------------------------------------
// Wallet
// ---------------------------------------------------------------------------

export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
  currency: string;
  created_at: string;
}

export interface WalletTransaction {
  id: number;
  wallet_id: number;
  amount: number;
  transaction_type: string;
  description: string | null;
  balance_after: number;
  created_at: string;
}

export interface WalletBalance {
  wallet: Wallet;
  pending_ewa: number;
  active_loans: number;
}

export async function getWalletBalance(): Promise<WalletBalance> {
  return request<WalletBalance>("/wallet/balance");
}

export async function listWalletTransactions(params?: Record<string, string | number>): Promise<WalletTransaction[]> {
  const qs = buildQS(params);
  return request<WalletTransaction[]>(`/wallet/transactions${qs}`);
}

// ---------------------------------------------------------------------------
// Safety (Admin)
// ---------------------------------------------------------------------------

export interface ScamReport {
  id: number;
  reporter_id: number;
  reported_entity: string;
  entity_type: string;
  description: string;
  evidence_urls: string[] | null;
  status: string;
  created_at: string;
}

export interface Dispute {
  id: number;
  complainant_id: number;
  respondent_id: number;
  dispute_type: string;
  description: string;
  status: string;
  resolution: string | null;
  created_at: string;
}

export interface VerificationRequest {
  id: number;
  user_id: number;
  document_type: string;
  document_url: string;
  status: string;
  reviewer_notes: string | null;
  created_at: string;
}

export async function adminListReports(params?: Record<string, string | number>): Promise<ScamReport[]> {
  const qs = buildQS(params);
  return request<ScamReport[]>(`/safety/admin/reports${qs}`);
}

export async function adminUpdateReport(reportId: number, status: string): Promise<ScamReport> {
  return request<ScamReport>(`/safety/admin/reports/${reportId}`, { method: "PUT", body: JSON.stringify({ status }) });
}

export async function adminListDisputes(params?: Record<string, string | number>): Promise<Dispute[]> {
  const qs = buildQS(params);
  return request<Dispute[]>(`/safety/admin/disputes${qs}`);
}

export async function adminResolveDispute(disputeId: number, resolution: string): Promise<Dispute> {
  return request<Dispute>(`/safety/admin/disputes/${disputeId}/resolve`, { method: "PUT", body: JSON.stringify({ resolution }) });
}

export async function adminListVerifications(params?: Record<string, string | number>): Promise<VerificationRequest[]> {
  const qs = buildQS(params);
  return request<VerificationRequest[]>(`/safety/admin/verify${qs}`);
}

export async function adminUpdateVerification(requestId: number, status: string, notes?: string): Promise<VerificationRequest> {
  return request<VerificationRequest>(`/safety/admin/verify/${requestId}`, { method: "PUT", body: JSON.stringify({ status, reviewer_notes: notes }) });
}

export { ApiError };
