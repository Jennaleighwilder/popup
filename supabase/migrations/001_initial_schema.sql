-- Popup Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- Design by Jenna Leigh West · The Forgotten Code

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles: extends auth.users with app-specific data
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  stripe_connect_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events: the core entity
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT 'atelier',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'completed')),
  content JSONB DEFAULT '{}',
  hero_image TEXT,
  venue TEXT,
  address TEXT,
  city TEXT,
  date_start DATE,
  date_end DATE,
  time TEXT,
  capacity INTEGER,
  published_at TIMESTAMPTZ,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket tiers
CREATE TABLE ticket_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  quantity_limit INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendees: people who bought/RSVP'd
CREATE TABLE attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  ticket_tier_id UUID REFERENCES ticket_tiers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'free', 'refunded')),
  check_in_code TEXT,
  checked_in_at TIMESTAMPTZ,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist: for sold-out events
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, email)
);

-- Indexes for performance
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_attendees_event_id ON attendees(event_id);
CREATE INDEX idx_waitlist_event_id ON waitlist(event_id);

-- Trigger: create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Events: users can CRUD their own; public can read published
CREATE POLICY "Users can manage own events" ON events
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (status = 'published');

-- Ticket tiers: follow event access
CREATE POLICY "Users can manage tiers for own events" ON ticket_tiers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = ticket_tiers.event_id AND events.user_id = auth.uid())
  );

CREATE POLICY "Public can view tiers for published events" ON ticket_tiers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = ticket_tiers.event_id AND events.status = 'published')
  );

-- Attendees: event owners can manage; attendees can view own
CREATE POLICY "Event owners can manage attendees" ON attendees
  FOR ALL USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = attendees.event_id AND events.user_id = auth.uid())
  );

CREATE POLICY "Attendees can view own" ON attendees
  FOR SELECT USING (email = auth.jwt()->>'email');

-- Waitlist: event owners can manage
CREATE POLICY "Event owners can manage waitlist" ON waitlist
  FOR ALL USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = waitlist.event_id AND events.user_id = auth.uid())
  );

CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);
