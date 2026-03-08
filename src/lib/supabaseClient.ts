import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client initializes the Supabase client using environment variables.
 * By exporting a single 'supabase' instance, we ensure the entire app shares
 * a single connection pool and maintains a consistent authentication state.
 * * Usage:
 * import { supabase } from "@/lib/supabaseClient";
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
