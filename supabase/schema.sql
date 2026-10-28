-- Jalankan di Supabase: SQL Editor -> New query -> Run
create table if not exists public.berita (
  id text primary key,
  title text not null,
  date_iso date not null,
  category text not null,
  image text not null default '/sekolah.jpg',
  excerpt text not null,
  content text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

alter table public.berita enable row level security;

drop policy if exists "Publik membaca berita published" on public.berita;
create policy "Publik membaca berita published"
  on public.berita for select to anon
  using (status = 'published');

drop policy if exists "Admin mengelola berita" on public.berita;
create policy "Admin mengelola berita"
  on public.berita for all to authenticated
  using (true) with check (true);
