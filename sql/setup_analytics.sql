-- Create page_visits table for simple analytics
create table if not exists page_visits (
  id uuid default gen_random_uuid() primary key,
  page_path text not null,
  referrer text,
  browser text,
  device text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table page_visits enable row level security;

-- Policy: Everyone can insert (log their visit)
create policy "Anyone can insert page visits"
  on page_visits for insert
  with check (true);

-- Policy: Only admin can read
create policy "Admins can read page visits"
  on page_visits for select
  using (auth.role() = 'authenticated');
