import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente para el browser (respeta RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente para el servidor (bypasea RLS, solo usar en server)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
