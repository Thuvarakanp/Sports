-- Sports Meet — Supabase (PostgreSQL) schema
--
-- How to use:
--   1. Open your Supabase project → SQL Editor → New query
--   2. Paste this whole file and run it.
--   3. Copy the Project URL and the "service_role" key into your env vars
--      (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).
--
-- All database access goes through the Express API using the service_role key,
-- so Row Level Security is left disabled (the default for tables created here).

-- Admin users
create table if not exists admins (
    id          bigint generated always as identity primary key,
    username    varchar(50)  not null unique,
    password    varchar(255) not null,
    created_at  timestamptz  default now()
);

-- Age categories
create table if not exists age_categories (
    id          bigint generated always as identity primary key,
    name        varchar(100) not null,
    min_age     int,
    max_age     int,
    created_at  timestamptz  default now()
);

-- Sports
create table if not exists sports (
    id               bigint generated always as identity primary key,
    name             varchar(100) not null,
    age_category_id  bigint not null references age_categories(id) on delete cascade,
    gender           varchar(10) not null check (gender in ('Male', 'Female')),
    created_at       timestamptz default now()
);

-- Results
create table if not exists results (
    id            bigint generated always as identity primary key,
    sport_id      bigint not null references sports(id) on delete cascade,
    gold_winner   varchar(255),
    silver_winner varchar(255),
    bronze_winner varchar(255),
    created_at    timestamptz default now()
);

-- Default admin (username: admin / password: admin123 — change this in production!)
insert into admins (username, password)
values ('admin', '$2a$10$FIei9oo0SQc9JpAYbYytj.sMaKpyvNhdHG/skZXL1bSFHkoGsRjhq')
on conflict (username) do nothing;

-- Sample age categories
insert into age_categories (name, min_age, max_age) values
    ('Under 10', 0, 10),
    ('Under 14', 11, 14),
    ('Under 17', 15, 17),
    ('Under 20', 18, 20),
    ('Open', 0, 99);
