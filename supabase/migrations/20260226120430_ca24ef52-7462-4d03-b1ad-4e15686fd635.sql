
-- Create OTP codes table for email/phone verification
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '10 minutes'),
  verified BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and reads (no auth required for lead form OTP)
CREATE POLICY "Anyone can insert OTP codes" ON public.otp_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read OTP codes" ON public.otp_codes FOR SELECT USING (true);
CREATE POLICY "Anyone can update OTP codes" ON public.otp_codes FOR UPDATE USING (true);

-- Index for faster lookups
CREATE INDEX idx_otp_codes_email_code ON public.otp_codes (email, code);

-- Auto-cleanup old codes (optional trigger)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.otp_codes WHERE expires_at < now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER cleanup_otps_on_insert
AFTER INSERT ON public.otp_codes
FOR EACH STATEMENT
EXECUTE FUNCTION public.cleanup_expired_otps();
