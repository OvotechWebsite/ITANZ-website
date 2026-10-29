-- iTANZ Neon PostgreSQL Database Schema
-- Run this script in the Neon SQL Editor on Vercel or Neon Console

-- 1. Contact Submissions Table (Contact Us, Consultation, Demo, Regional Offices, Investor Enquiries, Campaigns)
CREATE TABLE IF NOT EXISTS public.itanz_contact_submissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    region TEXT,
    solution TEXT,
    custom_solution TEXT,
    industry TEXT,
    enquiry_type TEXT,
    source_page TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS itanz_contact_submissions_created_at_idx
    ON public.itanz_contact_submissions (created_at DESC);

-- 2. Talent Submissions Table (Job Applications & Talent Network Profiles)
CREATE TABLE IF NOT EXISTS public.itanz_talent_submissions (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    country TEXT,
    linkedin_url TEXT,
    areas_of_interest TEXT[],
    experience_level TEXT,
    opportunity_type TEXT,
    preferred_locations TEXT[],
    portfolio_url TEXT,
    impact_statement TEXT,
    cv_file_url TEXT,
    source_page TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS itanz_talent_submissions_created_at_idx
    ON public.itanz_talent_submissions (created_at DESC);

