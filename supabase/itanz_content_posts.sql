create table if not exists public.itanz_content_posts (
	id uuid primary key default gen_random_uuid(),
	type text not null check (type in ('blog', 'news', 'press_release', 'case_study')),
	status text not null default 'draft' check (status in ('draft', 'published')),
	title text not null,
	slug text not null,
	category text,
	excerpt text,
	content text,
	thumbnail_url text,
	banner_url text,
	meta_title text,
	meta_description text,
	published_at timestamptz,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint itanz_content_posts_type_slug_key unique (type, slug)
);

create index if not exists itanz_content_posts_public_idx
	on public.itanz_content_posts (status, type, published_at desc, created_at desc);

create or replace function public.itanz_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

drop trigger if exists itanz_content_posts_touch_updated_at on public.itanz_content_posts;

create trigger itanz_content_posts_touch_updated_at
	before update on public.itanz_content_posts
	for each row
	execute function public.itanz_touch_updated_at();

alter table public.itanz_content_posts enable row level security;

drop policy if exists "Public can read published iTANZ content" on public.itanz_content_posts;

create policy "Public can read published iTANZ content"
	on public.itanz_content_posts
	for select
	using (status = 'published');