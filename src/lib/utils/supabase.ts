import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yaemvqemoreifmulquld.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZW12cWVtb3JlaWZtdWxxdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NzA3OTAsImV4cCI6MjAzMTI0Njc5MH0._CJPopJX0bk1VAvFFSF7xwfrWDFSiHexAyqdA_DchHQ';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
