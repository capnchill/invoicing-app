import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

const supabaseURL = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

// upgrading to supabase/ssr
const supabase = createBrowserClient(supabaseURL, supabaseAnonKey);

export default supabase;
