// Supabase client config (replace with your project values)
const SUPABASE_URL = "https://calgpiqhhzsewmztuymc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0u-WhxMQPghMGrXKnQdm-w_Pq5th2I2";

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const isSupabaseConfigured =
  Boolean(supabaseClient) &&
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.startsWith("sb_publishable_");

// Expose to other scripts
window.supabaseClient = supabaseClient;
window.isSupabaseConfigured = isSupabaseConfigured;
