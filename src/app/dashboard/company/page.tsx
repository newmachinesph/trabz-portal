"use client";

import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  getMyCompanies,
  createCompany,
  updateCompany,
  getCompanyRating,
  listCompanyReviews,
  type Company,
  type CompanyRating,
  type ReviewOut,
  ApiError,
} from "@/lib/api";

const INDUSTRIES = [
  "Construction",
  "Food & Beverage",
  "Retail",
  "Logistics",
  "Domestic Services",
  "Manufacturing",
  "Agriculture",
  "Other",
];

const SIZES = ["1-10", "10-50", "50-200", "200-500", "500-1000", "1000+"];

export default function CompanyPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [rating, setRating] = useState<CompanyRating | null>(null);
  const [reviews, setReviews] = useState<ReviewOut[]>([]);

  useEffect(() => {
    getMyCompanies()
      .then((companies) => {
        if (companies.length > 0) {
          const c = companies[0];
          setCompany(c);
          setName(c.name);
          setDescription(c.description || "");
          setIndustry(c.industry || "");
          setSize(c.size || "");
          setLocation(c.location || "");
          setWebsite(c.website || "");

          // Fetch rating and reviews for this company
          getCompanyRating(c.id).then(setRating).catch((err) => console.error("Failed to load company rating:", err));
          listCompanyReviews(c.id, { page_size: 4 }).then(setReviews).catch((err) => console.error("Failed to load company reviews:", err));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const body = { name, description, industry, size, location, website };
      if (company) {
        const updated = await updateCompany(company.id, body);
        setCompany(updated);
        setSuccess("Company profile updated!");
      } else {
        const created = await createCompany(body);
        setCompany(created);
        setSuccess("Company profile created!");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const categories = rating
    ? [
        { label: "Pay Timeliness", score: rating.pay_timeliness },
        { label: "Work Environment", score: rating.work_environment },
        { label: "Communication", score: rating.communication },
        { label: "Safety Standards", score: rating.safety_standards },
      ]
    : [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle>{company ? company.name : "Create Your Company"}</CardTitle>
            {company?.verified && (
              <Badge variant="success" className="mt-1">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            {success && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">{success}</div>}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Company Inc." required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell workers about your company..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Industry</label>
                <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Size</label>
                <Select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">Select size</option>
                  {SIZES.map((s) => <option key={s} value={s}>{s} employees</option>)}
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Manila, Philippines" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourcompany.ph" />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : company ? "Update Profile" : "Create Company"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Employer Rating */}
      {company && rating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              Worker Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Overall */}
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-gray-900">{rating.overall.toFixed(1)}</div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-5 w-5 ${s <= Math.round(rating.overall) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">{rating.total_reviews} reviews from workers</p>
              </div>
            </div>

            {/* Category Bars */}
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{cat.label}</span>
                    <span className="font-medium text-gray-900">{cat.score.toFixed(1)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${(cat.score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Recent Worker Reviews</h3>
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Worker #{r.worker_id}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                      </div>
                      {r.comment && <p className="mt-1 text-sm text-gray-600">{r.comment}</p>}
                      <p className="mt-1 text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
