import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseURL = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, supabaseAnonKey);

export default supabase;
