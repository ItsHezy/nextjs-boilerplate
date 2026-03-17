create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 80),
  email text not null check (char_length(trim(email)) between 5 and 254),
  message text not null check (char_length(trim(message)) between 20 and 4000),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.contact_messages enable row level security;

revoke all on public.contact_messages from anon, authenticated;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
