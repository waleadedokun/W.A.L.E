/*
  # Complete HopeHelps NGO Database Schema

  1. New Tables
    - `users` - Admin authentication
    - `daily_donations` - Daily meal assistance records
    - `monthly_empowerment` - Monthly empowerment program records
    - `form_links` - Dynamic form generation system
    - `success_stories` - Success story management
    - `transactions` - Financial transaction records
    - `paystack_statements` - Uploaded statement records
    - `nin_verifications` - QoreId verification records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Public read access for published content

  3. Indexes
    - Performance optimization for common queries
    - Full-text search capabilities
*/

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text DEFAULT 'admin',
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Daily donations records
CREATE TABLE IF NOT EXISTS daily_donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  amount decimal(10,2) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  platform text,
  post_link text,
  testimony text,
  image_url text,
  location text,
  admin_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Form links for monthly empowerment
CREATE TABLE IF NOT EXISTS form_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  expires_at timestamptz NOT NULL,
  max_submissions integer DEFAULT 1,
  current_submissions integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Monthly empowerment applications
CREATE TABLE IF NOT EXISTS monthly_empowerment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_link_id uuid REFERENCES form_links(id),
  recipient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  nin text NOT NULL,
  purpose text NOT NULL,
  business_plan text,
  requested_amount decimal(10,2) NOT NULL,
  approved_amount decimal(10,2),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected', 'paid')),
  nin_verified boolean DEFAULT false,
  verification_data jsonb,
  admin_notes text,
  payment_reference text,
  image_urls jsonb DEFAULT '[]',
  verified_at timestamptz,
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Success stories
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  images jsonb DEFAULT '[]',
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  author_name text,
  program_type text,
  impact_metrics jsonb DEFAULT '{}',
  slug text UNIQUE,
  meta_description text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Financial transactions
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('donation', 'distribution', 'expense')),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'NGN',
  payment_method text,
  reference text UNIQUE,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  paystack_data jsonb,
  crypto_data jsonb,
  donor_email text,
  donor_name text,
  related_record_id uuid,
  related_record_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Paystack statement uploads
CREATE TABLE IF NOT EXISTS paystack_statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_url text NOT NULL,
  upload_date date NOT NULL,
  parsed_data jsonb,
  total_amount decimal(10,2),
  transaction_count integer DEFAULT 0,
  status text DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'parsed', 'processed')),
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- NIN verification records
CREATE TABLE IF NOT EXISTS nin_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nin text NOT NULL,
  empowerment_id uuid REFERENCES monthly_empowerment(id),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  qoreid_response jsonb,
  verified_data jsonb,
  error_message text,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  admin_response text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_empowerment ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE paystack_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE nin_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin access
CREATE POLICY "Admin full access to users" ON users
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admin full access to daily_donations" ON daily_donations
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admin full access to form_links" ON form_links
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admin full access to monthly_empowerment" ON monthly_empowerment
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Public read published success_stories" ON success_stories
  FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admin full access to success_stories" ON success_stories
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Public read completed transactions" ON transactions
  FOR SELECT TO anon
  USING (status = 'completed' AND type = 'donation');

CREATE POLICY "Admin full access to transactions" ON transactions
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admin full access to paystack_statements" ON paystack_statements
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admin full access to nin_verifications" ON nin_verifications
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Admin read newsletter_subscriptions" ON newsletter_subscriptions
  FOR SELECT TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Admin full access to contact_submissions" ON contact_submissions
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Form link public access for submissions
CREATE POLICY "Public can read active form_links" ON form_links
  FOR SELECT TO anon
  USING (is_active = true AND expires_at > now());

CREATE POLICY "Public can submit to monthly_empowerment" ON monthly_empowerment
  FOR INSERT TO anon
  WITH CHECK (
    form_link_id IN (
      SELECT id FROM form_links 
      WHERE is_active = true 
      AND expires_at > now() 
      AND current_submissions < max_submissions
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_daily_donations_date ON daily_donations(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_donations_admin ON daily_donations(admin_id);
CREATE INDEX IF NOT EXISTS idx_monthly_empowerment_status ON monthly_empowerment(status);
CREATE INDEX IF NOT EXISTS idx_monthly_empowerment_form_link ON monthly_empowerment(form_link_id);
CREATE INDEX IF NOT EXISTS idx_success_stories_published ON success_stories(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_success_stories_slug ON success_stories(slug);
CREATE INDEX IF NOT EXISTS idx_transactions_type_status ON transactions(type, status);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_form_links_active ON form_links(is_active, expires_at);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_donations_updated_at BEFORE UPDATE ON daily_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_empowerment_updated_at BEFORE UPDATE ON monthly_empowerment
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_success_stories_updated_at BEFORE UPDATE ON success_stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update form submission count
CREATE OR REPLACE FUNCTION increment_form_submissions()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE form_links 
    SET current_submissions = current_submissions + 1
    WHERE id = NEW.form_link_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER increment_form_submissions_trigger
    AFTER INSERT ON monthly_empowerment
    FOR EACH ROW EXECUTE FUNCTION increment_form_submissions();