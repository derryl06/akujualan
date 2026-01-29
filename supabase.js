// Supabase client config (replace with your project values)
const config = window.SUPABASE_CONFIG || null;
const supabaseUrl = config ? config.URL : null;
const supabaseKey = config ? config.KEY : null;

console.log("[Supabase Config] URL:", supabaseUrl);
console.log("[Supabase Config] Key is set:", Boolean(supabaseKey));

let client = null;

if (window.supabase && supabaseUrl && supabaseKey) {
  try {
    // Ensure URL is a valid string
    if (typeof supabaseUrl !== "string" || !supabaseUrl.trim()) {
      throw new Error("Supabase URL must be a non-empty string");
    }
    client = window.supabase.createClient(supabaseUrl, supabaseKey);
    console.log("[Supabase Client] Initialized successfully");
  } catch (err) {
    console.error("[Supabase Client] Initialization failed:", err);
  }
} else {
  if (!window.supabase) console.warn("[Supabase Client] Library not loaded");
  if (!supabaseUrl) console.warn("[Supabase Client] URL missing in config");
  if (!supabaseKey) console.warn("[Supabase Client] Key missing in config");
}

const supabaseClient = client;

const isSupabaseConfigured =
  Boolean(supabaseClient) &&
  typeof supabaseUrl === "string" &&
  supabaseUrl.startsWith("https://") &&
  typeof supabaseKey === "string" &&
  supabaseKey.startsWith("sb_publishable_");

// Expose to other scripts
window.supabaseClient = supabaseClient;
window.isSupabaseConfigured = isSupabaseConfigured;

if (!isSupabaseConfigured) {
  console.warn("Supabase is not configured. Check config.js and ensure SUPABASE_URL is set.");
}
